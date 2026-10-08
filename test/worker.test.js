import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

const BASE = "https://overlap.example.workers.dev";

test("GET / serves the app shell", async () => {
  const res = await worker.fetch(new Request(BASE + "/"));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  const html = await res.text();
  assert.match(html, /<title>Overlap — a timezone meeting planner<\/title>/);
  assert.match(html, /id="grid"/);
  assert.match(html, /id="people"/);
  assert.match(html, /name="viewport"/);
  assert.doesNotMatch(html, /\bundefined\b/); // guard against template bugs
  // no external requests: no http(s) asset references
  assert.doesNotMatch(html, /<(script|link|img)[^>]+src=["']https?:/);
});

test("GET /healthz reports ok as JSON", async () => {
  const res = await worker.fetch(new Request(BASE + "/healthz"));
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /application\/json/);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.app, "overlap");
  assert.ok(!Number.isNaN(Date.parse(body.time)));
});

test("unknown paths return a JSON 404", async () => {
  const res = await worker.fetch(new Request(BASE + "/nope"));
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.equal(body.error, "not_found");
});

test("non-GET requests are not served the app shell", async () => {
  const res = await worker.fetch(new Request(BASE + "/", { method: "POST" }));
  assert.equal(res.status, 404);
});
