const GOOGLE_VERIFICATION_PATH = "/google1586d706d11d149f.html";
const GOOGLE_VERIFICATION_BODY = "google-site-verification: google1586d706d11d149f.html";

export default {
  fetch(request, env) {
    const url = new URL(request.url);

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
