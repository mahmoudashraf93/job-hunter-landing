# JobHunter Landing Site

Production website for [JobHunter](https://appjobhunter.com/), an iPhone job
search and application assistant with matched jobs, Safari autofill, resume
tools, cover-letter support, and application tracking.

## Development

The repository contains source content and generated static HTML served by a
Cloudflare Worker. Regenerate and validate the site with:

```sh
node scripts/build-homepage.mjs
node scripts/build-tools.mjs
node scripts/build-guides.mjs
node scripts/apply-seo-patches.mjs
node scripts/validate-seo.mjs
```

Production deploys from the `master` branch to
[appjobhunter.com](https://appjobhunter.com/). GitHub Pages also serves the
repository so legacy App Store links can redirect to the canonical site.
