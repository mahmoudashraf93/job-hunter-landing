#!/usr/bin/env python3
"""Bounded, read-only Gum Search Console export. Prints a plan unless --execute.

Gum's current catalog takes flat searchanalytics arguments, not args.body.
Raw Search Console responses must remain outside the repository.
"""
from __future__ import annotations
import argparse
from datetime import date, datetime, timedelta
import hashlib
import json
import os
from pathlib import Path
import subprocess
import time
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

OP = 'searchconsole.searchanalytics.query'
REPO = Path(__file__).resolve().parents[2]


def site(value: str) -> str:
    if value == 'sc-domain:appjobhunter.com':
        return value
    parsed = urlparse(value)
    if (parsed.scheme in ('https', 'http') and parsed.netloc in
            ('appjobhunter.com', 'www.appjobhunter.com') and parsed.path == '/'
            and not parsed.query and not parsed.fragment):
        return value
    raise argparse.ArgumentTypeError('Use the exact verified JobHunter property from gum sites.list.')


def plan(site_url: str, end: date, days: int = 28) -> list[dict]:
    if not 7 <= days <= 90:
        raise ValueError('Window must be 7-90 days.')
    requests = [{'name': 'property', 'op': 'searchconsole.sites.get', 'args': {'siteUrl': site_url}}]
    for label, last in (('current', end), ('previous', end - timedelta(days=days))):
        for kind, dimensions, limit in [('totals', [], 1), ('pages', ['page'], 1000),
                                         ('queries_pages', ['query', 'page'], 1000)]:
            requests.append({'name': f'{label}_{kind}', 'op': OP, 'args': {
                'siteUrl': site_url, 'startDate': (last-timedelta(days=days-1)).isoformat(),
                'endDate': last.isoformat(), 'dimensions': dimensions, 'type': 'web',
                'dataState': 'final', 'rowLimit': limit, 'startRow': 0}})
    requests.append({'name': 'sitemaps', 'op': 'searchconsole.sitemaps.list', 'args': {'siteUrl': site_url}})
    return requests


def command(binary: str, profile: str, request: dict) -> list[str]:
    return [binary, '--profile', profile, 'read', request['op'], '--args',
            json.dumps(request['args']), '--output', 'json', '--max-items', 'all']


def invoke(argv: list[str]):
    try:
        result = subprocess.run(argv, capture_output=True, text=True, timeout=90, check=False)
    except FileNotFoundError as error:
        raise RuntimeError('Google Gum CLI not found; install ehmo/tap/gum, not Charmbracelet gum.') from error
    except subprocess.TimeoutExpired as error:
        raise RuntimeError('Gum timed out. No automatic retry was attempted.') from error
    if result.returncode:
        # Do not copy potentially sensitive CLI diagnostics into agent output or PRs.
        raise RuntimeError(f'Gum exited {result.returncode}; check local auth/API access before retrying.')
    try:
        payload = json.loads(result.stdout)
    except json.JSONDecodeError as error:
        raise RuntimeError('Gum did not return valid JSON; check the installed catalog and CLI version.') from error
    if not isinstance(payload, dict) or payload.get('error') or payload.get('ok') is False or payload.get('success') is False:
        raise RuntimeError('Unexpected or failed Gum JSON response; inspect locally, do not invent missing data.')
    return payload


def save(path: Path, value) -> None:
    # The directory was exclusively created by this run; no secret-bearing env vars are saved.
    with path.open('w', encoding='utf-8') as file:
        os.chmod(path, 0o600)
        json.dump(value, file, ensure_ascii=False, indent=2)
        file.write('\n')


def collect(requests: list[dict], output: Path, binary: str, profile: str,
            run=invoke, pause=time.sleep) -> None:
    output = output.expanduser().resolve()
    if output == REPO or REPO in output.parents:
        raise ValueError('Raw analytics must be exported outside this public repository.')
    if len(requests) > 8:
        raise ValueError('Eight-read invocation budget exceeded.')
    output.mkdir(parents=True, mode=0o700, exist_ok=False)
    manifest = {'complete': False, 'site': requests[0]['args']['siteUrl'],
                'profile': profile, 'requests': requests, 'completed': [],
                'limits': 'One page per report. Top returned rows only; not exhaustive keyword demand. '
                          'Gum may perform its own transport retries; this wrapper never retries.',
                'privacy': 'Do not commit this directory or paste raw reports in public PRs.'}
    save(output/'manifest.json', manifest)
    for number, request in enumerate(requests):
        if number:
            pause(1)
        payload = run(command(binary, profile, request))
        filename = request['name']+'.json'
        save(output/filename, payload)
        manifest['completed'].append({'file': filename, 'sha256': hashlib.sha256((output/filename).read_bytes()).hexdigest()})
        save(output/'manifest.json', manifest)
    manifest['complete'] = True
    save(output/'manifest.json', manifest)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', type=site, required=True)
    parser.add_argument('--profile', default='jobhunter')
    parser.add_argument('--gum', default='gum', help='Path to ehmo/gum binary')
    parser.add_argument('--days', type=int, default=28)
    parser.add_argument('--end-date', type=date.fromisoformat)
    parser.add_argument('--output', type=Path, help='New private directory outside the repository')
    parser.add_argument('--execute', action='store_true', help='Execute the eight planned Google read calls')
    args = parser.parse_args(argv)
    final_cutoff = datetime.now(ZoneInfo('America/Los_Angeles')).date()-timedelta(days=3)
    end = args.end_date or final_cutoff
    try:
        if end > final_cutoff:
            raise ValueError('Use an end date at least three days behind the current Pacific date.')
        requests = plan(args.site, end, args.days)
        if not args.execute:
            print(json.dumps({'mode': 'plan_only', 'gum_reads': len(requests), 'requests': requests}, indent=2))
            return 0
        if not args.output:
            raise ValueError('--execute requires --output to a new private directory outside the repository.')
        collect(requests, args.output, args.gum, args.profile)
        print('Completed eight read-only Gum invocations. Reports are private; review before drafting.')
        return 0
    except (ValueError, OSError, RuntimeError) as error:
        parser.exit(1, f'{error}\n')


if __name__ == '__main__':
    raise SystemExit(main())
