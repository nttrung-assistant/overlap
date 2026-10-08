// The entire app ships as one static HTML string. No build step, no assets,
// no external requests — everything (styles, script, city data) is inline.
// The inline script deliberately avoids template literals so this file can
// stay a single plain template literal.

export const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="description" content="Overlap — find the meeting time that works for every timezone. No accounts, shareable links, no tracking.">
<title>Overlap — a timezone meeting planner</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='38' cy='50' r='28' fill='%23e4572e' opacity='.85'/%3E%3Ccircle cx='64' cy='50' r='28' fill='%232f7d5c' opacity='.7'/%3E%3C/svg%3E">
<style>
  :root {
    --bg: #f3f1ec;
    --card: #ffffff;
    --ink: #1f1d1a;
    --muted: #71695f;
    --accent: #e4572e;
    --good: #2f9d6f;
    --good-soft: color-mix(in srgb, #2f9d6f 16%, transparent);
    --ok-soft: color-mix(in srgb, #e0a03c 22%, transparent);
    --asleep: color-mix(in srgb, var(--ink) 7%, transparent);
    --line: color-mix(in srgb, var(--ink) 12%, transparent);
    --shadow: 0 24px 60px -30px color-mix(in srgb, var(--ink) 35%, transparent);
  }
  html[data-theme="dark"] {
    --bg: #131519;
    --card: #1c1f25;
    --ink: #ece9e3;
    --muted: #9b968c;
    --accent: #ff7a55;
    --good: #3dba85;
    --good-soft: color-mix(in srgb, #3dba85 22%, transparent);
    --ok-soft: color-mix(in srgb, #e0a03c 26%, transparent);
    --asleep: color-mix(in srgb, #000 32%, transparent);
    --line: color-mix(in srgb, var(--ink) 14%, transparent);
    --shadow: 0 24px 60px -24px #000c;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; padding: 28px 16px 48px;
    display: flex; flex-direction: column; align-items: center;
    background:
      radial-gradient(1100px 520px at 88% -8%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 60%),
      radial-gradient(900px 480px at -8% 108%, color-mix(in srgb, #2f7d5c 10%, transparent), transparent 55%),
      var(--bg);
    color: var(--ink);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background-color .35s ease, color .35s ease;
  }
  .wrap { width: min(860px, 100%); }
  header.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 750; font-size: 19px; letter-spacing: -.01em; }
  .brand svg { width: 26px; height: 26px; color: var(--accent); }
  .brand small { display: block; font-size: 12px; font-weight: 500; color: var(--muted); letter-spacing: .02em; }
  .iconbtn {
    width: 36px; height: 36px; border-radius: 12px; border: 1px solid var(--line);
    background: transparent; color: var(--muted); display: grid; place-items: center;
    cursor: pointer; transition: color .2s, border-color .2s, transform .15s;
  }
  .iconbtn:hover { color: var(--ink); border-color: color-mix(in srgb, var(--ink) 30%, transparent); }
  .iconbtn:active { transform: scale(.93); }
  .iconbtn svg { width: 17px; height: 17px; }
  .icon-sun { display: none; }
  html[data-theme="dark"] .icon-sun { display: block; }
  html[data-theme="dark"] .icon-moon { display: none; }

  .card {
    background: var(--card); border: 1px solid var(--line); border-radius: 24px;
    box-shadow: var(--shadow); padding: 20px 20px 16px; margin-bottom: 16px;
  }
  .card h2 { margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--muted); }

  /* --- people editor ------------------------------------------------------ */
  .people { display: flex; flex-direction: column; gap: 8px; }
  .person { display: flex; align-items: center; gap: 8px; }
  .person input {
    flex: 1; min-width: 0; padding: 10px 12px; font: inherit; font-size: 14px; font-weight: 600;
    color: var(--ink); background: color-mix(in srgb, var(--ink) 6%, transparent);
    border: 1px solid var(--line); border-radius: 12px; outline: none;
  }
  .person input:focus { border-color: var(--accent); }
  .person select {
    flex: 1.2; min-width: 0; padding: 10px 8px; font: inherit; font-size: 13.5px; font-weight: 600;
    color: var(--ink); background: color-mix(in srgb, var(--ink) 6%, transparent);
    border: 1px solid var(--line); border-radius: 12px; outline: none; cursor: pointer;
  }
  .person select:focus { border-color: var(--accent); }
  .person .del {
    width: 34px; height: 34px; flex: none; border-radius: 10px; border: 1px solid var(--line);
    background: transparent; color: var(--muted); cursor: pointer; font-size: 15px; line-height: 1;
    transition: color .2s, border-color .2s;
  }
  .person .del:hover { color: var(--accent); border-color: var(--accent); }
  .addrow { display: flex; gap: 8px; margin-top: 4px; }
  .addrow select { flex: 1; }
  button.primary {
    font: inherit; font-weight: 700; font-size: 14px; cursor: pointer; border: 0; border-radius: 12px;
    padding: 10px 18px; background: var(--accent); color: #fff;
    box-shadow: 0 8px 20px -10px color-mix(in srgb, var(--accent) 70%, transparent);
    transition: transform .15s, filter .2s;
  }
  button.primary:active { transform: scale(.96); }
  button.primary:hover { filter: brightness(1.06); }
  button.ghost {
    font: inherit; font-weight: 650; font-size: 13.5px; cursor: pointer; border-radius: 12px;
    padding: 9px 16px; border: 1px solid var(--line); background: transparent; color: var(--muted);
    transition: color .2s, border-color .2s;
  }
  button.ghost:hover { color: var(--ink); border-color: color-mix(in srgb, var(--ink) 30%, transparent); }
  button.ghost.copied { color: var(--good); border-color: var(--good); }

  /* --- hours window ------------------------------------------------------- */
  .hours-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .hours-row label { font-size: 13px; font-weight: 600; color: var(--muted); display: flex; align-items: center; gap: 8px; }
  .hours-row input[type="number"] {
    width: 62px; padding: 8px; text-align: center; font: inherit; font-weight: 700; color: var(--ink);
    background: color-mix(in srgb, var(--ink) 6%, transparent); border: 1px solid var(--line); border-radius: 10px; outline: none;
  }
  .hours-row input[type="number"]:focus { border-color: var(--accent); }
  .hours-row .actions { margin-left: auto; display: flex; gap: 8px; }

  /* --- grid --------------------------------------------------------------- */
  .gridwrap { overflow-x: auto; padding-bottom: 4px; }
  table.grid { border-collapse: separate; border-spacing: 3px; width: 100%; min-width: 520px; table-layout: fixed; }
  table.grid th {
    font-size: 11.5px; font-weight: 700; color: var(--muted); text-align: left;
    padding: 2px 6px 6px; max-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  table.grid th.h { width: 52px; }
  table.grid td { padding: 0; }
  table.grid td.h {
    font-size: 11px; font-weight: 650; color: var(--muted); text-align: right; padding-right: 6px;
    font-variant-numeric: tabular-nums;
  }
  .cell {
    height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-size: 11.5px; font-weight: 650; font-variant-numeric: tabular-nums;
    background: var(--asleep); color: var(--muted); border: 1px solid transparent;
  }
  .cell.ok { background: var(--ok-soft); color: var(--ink); }
  .cell.good { background: var(--good-soft); color: var(--good); border-color: color-mix(in srgb, var(--good) 35%, transparent); }
  tr.allgood td.cell { outline: 2px solid color-mix(in srgb, var(--good) 55%, transparent); outline-offset: -2px; }
  tr.now td.h { color: var(--accent); font-weight: 800; }

  .legend { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 10px; font-size: 12px; color: var(--muted); font-weight: 550; }
  .legend i { display: inline-block; width: 12px; height: 12px; border-radius: 4px; margin-right: 6px; vertical-align: -1px; }
  .legend .l-good i { background: var(--good-soft); border: 1px solid color-mix(in srgb, var(--good) 35%, transparent); }
  .legend .l-ok i { background: var(--ok-soft); }
  .legend .l-asleep i { background: var(--asleep); border: 1px solid var(--line); }

  .verdict { margin-top: 12px; font-size: 14px; font-weight: 650; line-height: 1.45; }
  .verdict b { color: var(--good); }
  .verdict .none { color: var(--accent); }

  footer { margin-top: 6px; text-align: center; color: var(--muted); font-size: 12px; }
  footer kbd { font: inherit; font-size: 11px; padding: 2px 6px; border-radius: 6px; border: 1px solid var(--line); background: color-mix(in srgb, var(--ink) 6%, transparent); }
  @media (max-width: 560px) {
    .person { flex-wrap: wrap; }
    .person select { flex-basis: 100%; order: 3; }
  }
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <div class="brand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>
      <span>Overlap<small>find the hour that works for everyone</small></span>
    </div>
    <div style="display:flex;gap:8px">
      <button class="iconbtn" id="copylink" title="Copy shareable link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>
      </button>
      <button class="iconbtn" id="theme" title="Toggle theme">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>
    </div>
  </header>

  <div class="card">
    <h2>Who's coming</h2>
    <div class="people" id="people"></div>
    <div class="addrow">
      <select id="pickcity" aria-label="Add a city"></select>
      <button class="primary" id="add">+ Add</button>
    </div>
  </div>

  <div class="card">
    <h2>Awake hours (each person's local time)</h2>
    <div class="hours-row">
      <label>From <input id="okfrom" type="number" min="0" max="23" value="9"></label>
      <label>To <input id="okto" type="number" min="0" max="23" value="18"></label>
      <label style="flex:1">Reference zone
        <select id="refzone" style="flex:1"></select>
      </label>
      <div class="actions">
        <button class="ghost" id="copylink2">Copy link</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="gridwrap"><table class="grid" id="grid"></table></div>
    <div class="legend">
      <span class="l-good"><i></i>inside awake hours</span>
      <span class="l-ok"><i></i>early / late but awake</span>
      <span class="l-asleep"><i></i>asleep</span>
    </div>
    <div class="verdict" id="verdict"></div>
  </div>

  <footer>Everything stays in your browser &middot; share by copying the link &middot; times refresh every minute</footer>
</div>

<script>
(function () {
  'use strict';

  // --- curated city list ----------------------------------------------------
  var CITIES = [
    ['Ho Chi Minh City','Asia/Ho_Chi_Minh'],['Ha Noi','Asia/Ho_Chi_Minh'],['Singapore','Asia/Singapore'],
    ['Bangkok','Asia/Bangkok'],['Jakarta','Asia/Jakarta'],['Kuala Lumpur','Asia/Kuala_Lumpur'],
    ['Manila','Asia/Manila'],['Hong Kong','Asia/Hong_Kong'],['Shanghai','Asia/Shanghai'],
    ['Beijing','Asia/Shanghai'],['Seoul','Asia/Seoul'],['Tokyo','Asia/Tokyo'],
    ['Taipei','Asia/Taipei'],['Perth','Australia/Perth'],['Sydney','Australia/Sydney'],
    ['Melbourne','Australia/Melbourne'],['Auckland','Pacific/Auckland'],['Kolkata','Asia/Kolkata'],
    ['Mumbai','Asia/Kolkata'],['Dubai','Asia/Dubai'],['Doha','Asia/Qatar'],
    ['Riyadh','Asia/Riyadh'],['Istanbul','Europe/Istanbul'],['Moscow','Europe/Moscow'],
    ['Nairobi','Africa/Nairobi'],['Lagos','Africa/Lagos'],['Cairo','Africa/Cairo'],
    ['Johannesburg','Africa/Johannesburg'],['Athens','Europe/Athens'],['Helsinki','Europe/Helsinki'],
    ['Kyiv','Europe/Kyiv'],['Warsaw','Europe/Warsaw'],['Berlin','Europe/Berlin'],
    ['Amsterdam','Europe/Amsterdam'],['Madrid','Europe/Madrid'],['Paris','Europe/Paris'],
    ['Rome','Europe/Rome'],['Zurich','Europe/Zurich'],['Stockholm','Europe/Stockholm'],
    ['London','Europe/London'],['Dublin','Europe/Dublin'],['Lisbon','Europe/Lisbon'],
    ['Reykjavik','Atlantic/Reykjavik'],['Sao Paulo','America/Sao_Paulo'],['Buenos Aires','America/Argentina/Buenos_Aires'],
    ['Santiago','America/Santiago'],['New York','America/New_York'],['Toronto','America/Toronto'],
    ['Chicago','America/Chicago'],['Mexico City','America/Mexico_City'],['Denver','America/Denver'],
    ['Los Angeles','America/Los_Angeles'],['Vancouver','America/Vancouver'],['Seattle','America/Los_Angeles'],
    ['San Francisco','America/Los_Angeles'],['Honolulu','Pacific/Honolulu'],['Anchorage','America/Anchorage']
  ];

  var ZONES = [];
  CITIES.forEach(function (c) { if (ZONES.indexOf(c[1]) < 0) ZONES.push(c[1]); });

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    people: $('people'), pick: $('pickcity'), add: $('add'), grid: $('grid'),
    okfrom: $('okfrom'), okto: $('okto'), refzone: $('refzone'),
    verdict: $('verdict'), theme: $('theme'),
    copy: $('copylink'), copy2: $('copylink2')
  };

  // --- theme ----------------------------------------------------------------
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('ov.settings') || '{}'); } catch (e) { saved = {}; }
  function save() { try { localStorage.setItem('ov.settings', JSON.stringify(saved)); } catch (e) {} }
  var theme = saved.theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function applyTheme() { document.documentElement.setAttribute('data-theme', theme); saved.theme = theme; save(); }
  applyTheme();
  els.theme.addEventListener('click', function () { theme = (theme === 'dark') ? 'light' : 'dark'; applyTheme(); });

  // --- state ------------------------------------------------------------------
  function browserZone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; }
  }
  var state = { zones: [], ref: browserZone(), from: 9, to: 18 };

  function zoneExists(z) { return ZONES.indexOf(z) >= 0; }
  function loadFromUrl() {
    try {
      var q = new URLSearchParams(location.search);
      var tz = q.get('tz');
      if (tz) {
        var list = tz.split(',').filter(zoneExists);
        if (list.length) state.zones = list.slice(0, 8);
      }
      var ref = q.get('ref');
      if (ref && zoneExists(ref)) state.ref = ref;
      var ok = q.get('ok');
      if (ok && /^\\d{1,2}-\\d{1,2}$/.test(ok)) {
        var p = ok.split('-').map(Number);
        if (p[0] >= 0 && p[0] <= 23 && p[1] >= 0 && p[1] <= 23) { state.from = p[0]; state.to = p[1]; }
      }
    } catch (e) {}
  }
  function defaultZones() {
    var mine = browserZone();
    var picks = [mine];
    ['Asia/Ho_Chi_Minh','Europe/London','America/New_York'].forEach(function (z) {
      if (picks.length < 4 && picks.indexOf(z) < 0) picks.push(z);
    });
    return picks.filter(zoneExists).slice(0, 4);
  }

  // --- time math ---------------------------------------------------------------
  function fmtIn(tz, date, opts) {
    return new Intl.DateTimeFormat('en-US', Object.assign({ timeZone: tz }, opts)).format(date);
  }
  function hourIn(tz, date) {
    var h = parseInt(fmtIn(tz, date, { hour: 'numeric', hour12: false }), 10);
    return (h === 24) ? 0 : h;
  }
  function minutesIn(tz, date) {
    return parseInt(fmtIn(tz, date, { minute: '2-digit' }), 10);
  }
  function offsetMin(tz, date) {
    var f = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    var p = {};
    f.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, (+p.hour) % 24, +p.minute, +p.second);
    return Math.round((asUTC - date.getTime()) / 60000);
  }
  function refHourToDate(hour) {
    var now = new Date();
    var wall = new Date(Date.UTC(
      +fmtIn(state.ref, now, { year: 'numeric' }),
      +fmtIn(state.ref, now, { month: '2-digit' }) - 1,
      +fmtIn(state.ref, now, { day: '2-digit' }),
      hour, 0, 0
    ));
    return new Date(wall.getTime() - offsetMin(state.ref, wall) * 60000);
  }

  // --- people editor -------------------------------------------------------------
  function cityLabel(z) {
    for (var i = 0; i < CITIES.length; i++) if (CITIES[i][1] === z) return CITIES[i][0];
    return z;
  }
  function fillZoneSelect(sel, selected) {
    sel.innerHTML = '';
    var used = {};
    CITIES.forEach(function (c) {
      if (used[c[1]]) return; used[c[1]] = true;
      var o = document.createElement('option');
      o.value = c[1]; o.textContent = c[0] + '  (' + c[1].split('/').pop().replace(/_/g, ' ') + ')';
      if (c[1] === selected) o.selected = true;
      sel.appendChild(o);
    });
    if (selected && !used[selected]) {
      var o = document.createElement('option');
      o.value = selected; o.selected = true; o.textContent = selected;
      sel.appendChild(o);
    }
  }
  function renderPeople() {
    els.people.innerHTML = '';
    state.zones.forEach(function (z, i) {
      var row = document.createElement('div'); row.className = 'person';
      var inp = document.createElement('input');
      inp.type = 'text'; inp.value = cityLabel(z); inp.readOnly = true; inp.setAttribute('aria-label', 'Participant ' + (i + 1));
      var sel = document.createElement('select');
      fillZoneSelect(sel, z);
      sel.addEventListener('change', function () { state.zones[i] = sel.value; renderAll(); });
      var del = document.createElement('button');
      del.className = 'del'; del.type = 'button'; del.textContent = '✕'; del.title = 'Remove';
      del.setAttribute('aria-label', 'Remove participant ' + (i + 1));
      del.addEventListener('click', function () {
        if (state.zones.length <= 1) return;
        state.zones.splice(i, 1); renderAll();
      });
      row.appendChild(inp); row.appendChild(sel); row.appendChild(del);
      els.people.appendChild(row);
    });
  }
  function renderPick() {
    fillZoneSelect(els.pick, null);
    fillZoneSelect(els.refzone, state.ref);
  }

  // --- grid ---------------------------------------------------------------------
  function classify(h) {
    var a = Math.min(state.from, state.to), b = Math.max(state.from, state.to);
    if (h >= a && h <= b) return 'good';
    var d = Math.min(Math.abs(h - a), 24 - Math.abs(h - a), Math.abs(h - b), 24 - Math.abs(h - b));
    return (d <= 2) ? 'ok' : 'asleep';
  }
  function fmtHour(h) { return (h < 10 ? '0' : '') + h + ':00'; }

  function renderGrid() {
    var now = new Date();
    var nowRefHour = hourIn(state.ref, now);
    var tbl = els.grid;
    tbl.innerHTML = '';
    var thead = document.createElement('thead');
    var hr = document.createElement('tr');
    var th0 = document.createElement('th'); th0.className = 'h'; th0.textContent = 'Ref →'; hr.appendChild(th0);
    state.zones.forEach(function (z) {
      var th = document.createElement('th');
      th.textContent = cityLabel(z);
      th.title = z + ' — local time shown in cells';
      hr.appendChild(th);
    });
    thead.appendChild(hr); tbl.appendChild(thead);

    var tbody = document.createElement('tbody');
    for (var h = 0; h < 24; h++) {
      var when = refHourToDate(h);
      var tr = document.createElement('tr');
      if (h === nowRefHour) tr.className = 'now';
      var allGood = true;
      var tdh = document.createElement('td'); tdh.className = 'h'; tdh.textContent = fmtHour(h);
      if (h === nowRefHour) { var dot = document.createElement('span'); dot.textContent = '● '; tdh.appendChild(dot); }
      tr.appendChild(tdh);
      state.zones.forEach(function (z) {
        var cls = classify(hourIn(z, when));
        if (cls !== 'good') allGood = false;
        var td = document.createElement('td');
        var cell = document.createElement('div');
        cell.className = 'cell ' + cls;
        cell.textContent = fmtHour(hourIn(z, when));
        cell.title = z + ' — ' + fmtIn(z, when, { weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: false });
        td.appendChild(cell);
        tr.appendChild(td);
      });
      if (allGood) tr.className = (tr.className ? tr.className + ' ' : '') + 'allgood';
      tbody.appendChild(tr);
    }
    tbl.appendChild(tbody);
  }

  function renderVerdict() {
    var good = [];
    for (var h = 0; h < 24; h++) {
      var when = refHourToDate(h);
      var okAll = state.zones.every(function (z) { return classify(hourIn(z, when)) === 'good'; });
      if (okAll) good.push(h);
    }
    if (!good.length) {
      els.verdict.innerHTML = '<span class="none">No hour works for everyone inside those awake hours.</span> Loosen the window or swap a city.';
      return;
    }
    // group contiguous spans (wrapping midnight)
    var spans = [];
    good.forEach(function (h) {
      var last = spans[spans.length - 1];
      if (last && (last[last.length - 1] + 1) % 24 === h) last.push(h);
      else spans.push([h]);
    });
    if (spans.length > 1) {
      var first = spans[0], lastS = spans[spans.length - 1];
      if ((lastS[lastS.length - 1] + 1) % 24 === first[0]) { lastS.push.apply(lastS, first); spans.shift(); }
    }
    var parts = spans.map(function (s) {
      return s.length === 1 ? fmtHour(s[0]) : fmtHour(s[0]) + '–' + fmtHour((s[s.length - 1] + 1) % 24);
    });
    var refName = cityLabel(state.ref);
    els.verdict.innerHTML = '<b>' + parts.join(', ') + '</b> in ' + refName + ' works for everyone (' + state.zones.length + ' zones).';
  }

  // --- url -----------------------------------------------------------------------
  function currentUrl() {
    var u = new URL(location.origin + location.pathname);
    u.searchParams.set('tz', state.zones.join(','));
    u.searchParams.set('ref', state.ref);
    u.searchParams.set('ok', state.from + '-' + state.to);
    return u.toString();
  }
  function flashCopied(btn) {
    btn.classList.add('copied');
    var old = btn.textContent;
    if (old !== '✓') { btn.dataset.old = old; btn.textContent = '✓ Copied'; }
    setTimeout(function () {
      btn.classList.remove('copied');
      if (btn.dataset.old) btn.textContent = btn.dataset.old;
    }, 1400);
  }
  function copyLink(btn) {
    var url = currentUrl();
    var done = function () { flashCopied(btn); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { promptCopy(url, done); });
    } else promptCopy(url, done);
  }
  function promptCopy(url, done) {
    var ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { window.prompt('Copy this link:', url); }
    document.body.removeChild(ta);
  }

  // --- wiring --------------------------------------------------------------------
  function readControls() {
    var f = parseInt(els.okfrom.value, 10), t = parseInt(els.okto.value, 10);
    state.from = isNaN(f) ? 9 : Math.min(23, Math.max(0, f));
    state.to = isNaN(t) ? 18 : Math.min(23, Math.max(0, t));
    els.okfrom.value = state.from; els.okto.value = state.to;
    state.ref = els.refzone.value;
    history.replaceState(null, '', currentUrl());
    renderGrid(); renderVerdict();
  }
  // live update while typing: clamp only when the value parses, never rewrite the field
  function onInputHours() {
    var f = parseInt(els.okfrom.value, 10), t = parseInt(els.okto.value, 10);
    if (!isNaN(f)) state.from = Math.min(23, Math.max(0, f));
    if (!isNaN(t)) state.to = Math.min(23, Math.max(0, t));
    history.replaceState(null, '', currentUrl());
    renderGrid(); renderVerdict();
  }
  function renderAll() { renderPeople(); renderPick(); readControls(); }

  els.add.addEventListener('click', function () {
    if (state.zones.length >= 8) return;
    var z = els.pick.value;
    if (state.zones.indexOf(z) >= 0) return;
    state.zones.push(z);
    renderAll();
  });
  els.okfrom.addEventListener('change', readControls);
  els.okto.addEventListener('change', readControls);
  els.okfrom.addEventListener('input', onInputHours);
  els.okto.addEventListener('input', onInputHours);
  els.refzone.addEventListener('change', readControls);
  els.copy.addEventListener('click', function () { copyLink(els.copy); });
  els.copy2.addEventListener('click', function () { copyLink(els.copy2); });
  document.addEventListener('keydown', function (ev) {
    if (ev.target && /input|select|textarea/i.test(ev.target.tagName)) return;
    if (ev.key === 't' || ev.key === 'T') els.theme.click();
  });

  loadFromUrl();
  if (!state.zones.length) state.zones = defaultZones();
  // sync controls from state BEFORE readControls reads them back,
  // so URL params (?ok=) are not clobbered by the HTML defaults
  els.okfrom.value = state.from;
  els.okto.value = state.to;
  renderAll();
  setInterval(function () { renderGrid(); }, 60000);
})();
</script>
</body>
</html>
`;
