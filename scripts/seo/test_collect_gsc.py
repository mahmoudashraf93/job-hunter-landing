import contextlib
from datetime import date, timedelta
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('collect_gsc', Path(__file__).with_name('collect_gsc.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class CollectorTests(unittest.TestCase):
    def setUp(self):
        self.requests = m.plan('sc-domain:appjobhunter.com', date(2026, 10, 12))

    def test_eight_reads_with_flat_catalog_arguments(self):
        self.assertEqual(len(self.requests), 8)
        for request in self.requests:
            cmd = m.command('gum', 'jobhunter', request)
            self.assertEqual(cmd[3], 'read')
            self.assertNotIn('--allow-write', cmd)
            self.assertNotIn('body', request['args'])

    def test_adjacent_equal_windows(self):
        current = self.requests[1]['args']
        previous = self.requests[4]['args']
        self.assertEqual(date.fromisoformat(previous['endDate'])+timedelta(days=1), date.fromisoformat(current['startDate']))
        for args in (current, previous):
            self.assertEqual((date.fromisoformat(args['endDate'])-date.fromisoformat(args['startDate'])).days+1, 28)
            self.assertEqual(args['dataState'], 'final')

    def test_invalid_window(self):
        with self.assertRaises(ValueError):
            m.plan('sc-domain:appjobhunter.com', date(2026, 10, 12), 366)

    def test_reject_other_properties(self):
        for value in ['sc-domain:example.com', 'https://appjobhunter.com.evil.test/', 'https://appjobhunter.com/@x', 'https://user:pass@appjobhunter.com/']:
            with self.assertRaises(m.argparse.ArgumentTypeError):
                m.site(value)

    def test_support_exact_domain_and_prefix(self):
        for value in ['sc-domain:appjobhunter.com', 'https://appjobhunter.com/']:
            self.assertEqual(m.site(value), value)

    def test_default_plan_never_invokes_gum(self):
        with patch.object(m, 'collect') as collect, contextlib.redirect_stdout(io.StringIO()) as stdout:
            self.assertEqual(m.main(['--site', 'sc-domain:appjobhunter.com', '--end-date', '2026-01-01']), 0)
            collect.assert_not_called()
        self.assertEqual(json.loads(stdout.getvalue())['gum_reads'], 8)

    def test_success_manifest_and_file_permissions(self):
        with tempfile.TemporaryDirectory() as root:
            out = Path(root)/'export'
            calls = []
            def fake(cmd):
                calls.append(cmd)
                return {'rows': []}  # Synthetic fixture, not live GSC data.
            m.collect(self.requests, out, 'gum', 'jobhunter', run=fake, pause=lambda _: None)
            manifest = json.loads((out/'manifest.json').read_text())
            self.assertTrue(manifest['complete'])
            self.assertEqual(len(calls), 8)
            self.assertEqual(len(manifest['completed']), 8)
            self.assertEqual((out/'current_pages.json').stat().st_mode & 0o777, 0o600)

    def test_failed_read_stops_without_retry_and_marks_partial(self):
        with tempfile.TemporaryDirectory() as root:
            out = Path(root)/'export'
            calls = []
            def fail(cmd):
                calls.append(cmd)
                raise RuntimeError('auth failed')
            with self.assertRaises(RuntimeError):
                m.collect(self.requests, out, 'gum', 'jobhunter', run=fail, pause=lambda _: None)
            self.assertEqual(len(calls), 1)
            self.assertFalse(json.loads((out/'manifest.json').read_text())['complete'])

    def test_no_overwrite_or_repository_export(self):
        with self.assertRaises(ValueError):
            m.collect(self.requests, m.REPO/'private-data', 'gum', 'jobhunter')
        with tempfile.TemporaryDirectory() as root:
            with self.assertRaises(FileExistsError):
                m.collect(self.requests, Path(root), 'gum', 'jobhunter')

    def test_invalid_json_and_error_envelopes_are_not_data(self):
        for stdout in ['not json', '{"ok":false}', '{"error":{"code":"AUTH_REQUIRED"}}']:
            result = m.subprocess.CompletedProcess([], 0, stdout=stdout, stderr='')
            with patch.object(m.subprocess, 'run', return_value=result), self.assertRaises(RuntimeError):
                m.invoke(['gum'])


if __name__ == '__main__':
    unittest.main()
