const decodeHtml = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) => {
  if (entity.startsWith("#")) return String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === "x" ? 2 : 1), entity[1].toLowerCase() === "x" ? 16 : 10));
  return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[entity.toLowerCase()];
});

const attribute = (attributes, name) => {
  const match = attributes.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\x60]+))`, "i"));
  return match ? decodeHtml(match[1] ?? match[2] ?? match[3]) : undefined;
};

// The generated site uses static HTML. Ignore scripts and comments so markup
// examples or JSON strings cannot count as navigation.
const visibleHtml = (html) => html.replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");

export const extractAnchors = (html) => [...visibleHtml(html).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)]
  .flatMap(([, attributes, content]) => {
    const href = attribute(attributes, "href");
    if (href === undefined) return [];
    const imageAlts = [...content.matchAll(/<img\b([^>]*)>/gi)].map(([, attrs]) => attribute(attrs, "alt") ?? "").join(" ");
    const text = decodeHtml(content.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
    return [{ href, label: text || imageAlts.trim(), nofollow: (attribute(attributes, "rel") ?? "").toLowerCase().split(/\s+/).includes("nofollow") }];
  });

export const auditInternalLinks = (pages, indexablePaths, { origin, redirects = {} }) => {
  const hostname = new URL(origin).hostname;
  const edges = new Map([...pages.keys()].map((pathname) => [pathname, new Set()]));
  const ids = new Map([...pages].map(([pathname, html]) => [pathname, new Set(
    [...visibleHtml(html).matchAll(/<[a-z][\w:-]*\b([^>]*)>/gi)]
      .map(([, attributes]) => attribute(attributes, "id")).filter(Boolean)
  )]));
  const references = [];
  for (const [from, html] of pages) {
    for (const anchor of extractAnchors(html)) {
      const url = new URL(anchor.href, `${origin}${from}`);
      if (url.hostname === hostname && url.origin !== origin) {
        throw new Error(`${from} links to a noncanonical internal origin: ${anchor.href}`);
      }
      if (url.origin !== origin) continue;
      const to = url.pathname;
      references.push({ from, to });
      if (redirects[to] || redirects[`${to}/`]) throw new Error(`${from} links to retired page ${to}`);
      if (!pages.has(to)) continue; // Assets and missing targets are checked on disk by validate-seo.
      if (!anchor.label || /^(?:click here|here|read more|learn more)$/i.test(anchor.label)) {
        throw new Error(`${from} has missing or generic anchor text for ${anchor.href}`);
      }
      if (url.hash && !ids.get(to).has(decodeURIComponent(url.hash.slice(1)))) {
        throw new Error(`${from} links to missing fragment ${anchor.href}`);
      }
      if (!anchor.nofollow) edges.get(from).add(to);
    }
  }

  const depths = new Map([["/", 0]]);
  const queue = ["/"];
  for (let i = 0; i < queue.length; i++) {
    for (const to of edges.get(queue[i]) ?? []) {
      if (depths.has(to)) continue;
      depths.set(to, depths.get(queue[i]) + 1);
      queue.push(to);
    }
  }
  const unreachable = indexablePaths.filter((pathname) => !depths.has(pathname));
  if (unreachable.length) throw new Error(`Pages unreachable from the homepage through crawlable links: ${unreachable.join(", ")}`);
  return { references, maxDepth: Math.max(...indexablePaths.map((pathname) => depths.get(pathname))) };
};
