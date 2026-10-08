import { PAGE } from "./page.js";

const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
  "cache-control": "no-cache",
};

const JSON_HEADERS = { "cache-control": "no-store" };

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (request.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
      return new Response(PAGE, { headers: HTML_HEADERS });
    }

    if (request.method === "GET" && pathname === "/healthz") {
      return Response.json(
        { ok: true, app: "overlap", time: new Date().toISOString() },
        { headers: JSON_HEADERS },
      );
    }

    return Response.json(
      { ok: false, error: "not_found", path: pathname },
      { status: 404, headers: JSON_HEADERS },
    );
  },
};
