import { guideRedirects } from "../content/seo-plan.mjs";

const GOOGLE_VERIFICATION_PATH = "/google1586d706d11d149f.html";
const GOOGLE_VERIFICATION_BODY = "google-site-verification: google1586d706d11d149f.html";
const REDIRECTS = new Map([
  ...Object.entries(guideRedirects),
  ["/privacypolicy/", "/privacy/"]
]);

const redirectTarget = (pathname) => {
  if (REDIRECTS.has(pathname)) return REDIRECTS.get(pathname);
  if (!pathname.endsWith("/") && REDIRECTS.has(`${pathname}/`)) {
    return REDIRECTS.get(`${pathname}/`);
  }
  return null;
};

export default {
  fetch(request, env) {
    const url = new URL(request.url);

    const target = redirectTarget(url.pathname);
    if (target) {
      return Response.redirect(new URL(target, url.origin), 301);
    }

    if (url.pathname === "/year" || url.pathname === "/year/") {
      return new Response("Gone", {
        status: 410,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=3600"
        }
      });
    }

    if (url.pathname === GOOGLE_VERIFICATION_PATH) {
      return new Response(GOOGLE_VERIFICATION_BODY, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=0, must-revalidate"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
