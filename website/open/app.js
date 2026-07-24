/* Open Government Explorer — static prototype */
(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const state = {
    org: null,
    budgets: null,
    decisions: null,
    traces: null,
    issues: null,
    search: "",
  };

  const money = (n) => {
    if (n == null || Number.isNaN(n)) return "—";
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}k`;
    return `$${n}`;
  };

  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function byId(list, id) {
    return (list || []).find((x) => x.id === id);
  }

  function childrenOf(parentId) {
    return state.org.nodes.filter((n) => n.parent === parentId);
  }

  function parseRoute() {
    const h = (location.hash || "#/").replace(/^#/, "") || "/";
    const parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "org" && parts[1]) return { name: "org", id: parts[1] };
    if (parts[0] === "decision" && parts[1]) return { name: "decision", id: parts[1] };
    if (parts[0] === "trace" && parts[1]) return { name: "trace", id: parts[1] };
    if (parts[0] === "treasury") return { name: "treasury" };
    if (parts[0] === "issues") return { name: "issues" };
    if (parts[0] === "decisions") return { name: "decisions" };
    return { name: "home" };
  }

  function setActiveNav(route) {
    $$(".open-nav a").forEach((a) => {
      const r = a.getAttribute("data-route");
      a.classList.toggle("is-active", r === route.name || (route.name === "home" && r === "map"));
    });
  }

  function renderHome() {
    const branches = childrenOf("root");
    const decisions = state.decisions.decisions;
    const q = state.search.trim().toLowerCase();

    let orgs = state.org.nodes.filter((n) => n.id !== "root");
    if (q) {
      orgs = orgs.filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          (n.mandate || "").toLowerCase().includes(q)
      );
    }

    return `
      <header class="open-page-head">
        <h1>Open Government Explorer</h1>
        <p class="open-lead">Browse the Maple Leaf model of the Canadian state: institutions, sample budgets, Trace money paths, and full Decision Packages — official reasons, Universal Decision Logic, and uncensored AI analysis with prompts.</p>
      </header>

      <div class="open-toolbar">
        <label class="open-search">
          <span class="visually-hidden">Search</span>
          <input type="search" id="openSearch" placeholder="Search ministries, chambers…" value="${esc(state.search)}" />
        </label>
        <div class="open-quick">
          <a class="action action-quiet" href="#/treasury">Public Treasury</a>
          <a class="action action-quiet" href="#/decisions">All decisions</a>
          <a class="action action-quiet" href="#/issues">Issues &amp; bounties</a>
        </div>
      </div>

      <section class="open-section">
        <h2>Map of the state</h2>
        <div class="open-branch-grid">
          ${branches
            .map((b) => {
              const kids = childrenOf(b.id);
              return `
              <article class="open-card">
                <h3><a href="#/org/${esc(b.id)}">${esc(b.name)}</a></h3>
                <p>${esc(b.mandate)}</p>
                ${
                  kids.length
                    ? `<ul class="open-mini-list">${kids
                        .map(
                          (k) =>
                            `<li><a href="#/org/${esc(k.id)}">${esc(k.name)}</a></li>`
                        )
                        .join("")}</ul>`
                    : ""
                }
              </article>`;
            })
            .join("")}
        </div>
      </section>

      ${
        q
          ? `<section class="open-section">
        <h2>Search results</h2>
        <ul class="open-mini-list open-mini-list-wide">
          ${orgs
            .map((n) => `<li><a href="#/org/${esc(n.id)}">${esc(n.name)}</a> — ${esc(n.kind)}</li>`)
            .join("") || "<li>No matches.</li>"}
        </ul>
      </section>`
          : ""
      }

      <section class="open-section">
        <h2>Decision Packages</h2>
        <p class="open-note">Each record shows how and why a decision was made: signed reasons, steelman logic, AI prompt, and AI analysis without fashion filters.</p>
        <div class="open-decision-list">
          ${decisions
            .map(
              (d) => `
            <a class="open-decision-row" href="#/decision/${esc(d.id)}">
              <span class="open-status open-status-${esc(d.status)}">${esc(d.status)}</span>
              <span class="open-decision-title">${esc(d.title)}</span>
            </a>`
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderOrg(id) {
    const n = byId(state.org.nodes, id);
    if (!n) return `<p>Institution not found.</p>`;
    const kids = childrenOf(id);
    const budget = n.budget_id
      ? byId(state.budgets.budgets, n.budget_id)
      : null;
    const decs = (n.decision_ids || [])
      .map((did) => byId(state.decisions.decisions, did))
      .filter(Boolean);

    return `
      <nav class="open-crumb"><a href="#/">Map</a> · ${esc(n.name)}</nav>
      <header class="open-page-head">
        <p class="open-kicker">${esc(n.kind)}</p>
        <h1>${esc(n.name)}</h1>
        <p class="open-lead">${esc(n.mandate)}</p>
        ${
          n.github
            ? `<p><a class="action action-quiet" href="${esc(n.github)}" target="_blank" rel="noopener">Design notes on GitHub →</a></p>`
            : ""
        }
      </header>

      ${
        kids.length
          ? `<section class="open-section">
        <h2>Under this branch</h2>
        <div class="open-branch-grid">
          ${kids
            .map(
              (k) => `
            <article class="open-card">
              <h3><a href="#/org/${esc(k.id)}">${esc(k.name)}</a></h3>
              <p>${esc(k.mandate || "")}</p>
            </article>`
            )
            .join("")}
        </div>
      </section>`
          : ""
      }

      ${
        budget
          ? `<section class="open-section">
        <h2>Sample budget <span class="open-demo-tag">illustrative</span></h2>
        <p class="open-note">${esc(budget.label)} · ${esc(budget.fy)} · Total out ${money(budget.total_out)}</p>
        <table class="open-table">
          <thead><tr><th>Line</th><th>Amount</th><th>Trace</th></tr></thead>
          <tbody>
            ${budget.lines
              .map(
                (l) => `
              <tr>
                <td>${esc(l.label)}</td>
                <td>${money(l.amount)}</td>
                <td>${(l.trace_ids || [])
                  .map((t) => `<a href="#/trace/${esc(t)}">${esc(t)}</a>`)
                  .join(" ") || "—"}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </section>`
          : ""
      }

      ${
        decs.length
          ? `<section class="open-section">
        <h2>Decisions</h2>
        <div class="open-decision-list">
          ${decs
            .map(
              (d) => `
            <a class="open-decision-row" href="#/decision/${esc(d.id)}">
              <span class="open-status open-status-${esc(d.status)}">${esc(d.status)}</span>
              <span class="open-decision-title">${esc(d.title)}</span>
            </a>`
            )
            .join("")}
        </div>
      </section>`
          : ""
      }

      ${
        (n.platform || []).length
          ? `<p class="open-note">Platform modules: ${(n.platform || []).map((p) => esc(p)).join(", ")}</p>`
          : ""
      }
    `;
  }

  function renderDecision(id) {
    const d = byId(state.decisions.decisions, id);
    if (!d) return `<p>Decision not found.</p>`;
    const org = byId(state.org.nodes, d.org_id);

    return `
      <nav class="open-crumb"><a href="#/">Map</a> · <a href="#/decisions">Decisions</a> · ${esc(d.id)}</nav>
      <header class="open-page-head">
        <span class="open-status open-status-${esc(d.status)}">${esc(d.status)}</span>
        <h1>${esc(d.title)}</h1>
        <p class="open-meta">${esc(d.date)} · ${org ? `<a href="#/org/${esc(org.id)}">${esc(org.name)}</a>` : ""} · ${esc(d.signatory)}</p>
      </header>

      <section class="open-panel">
        <h2>Official reasons</h2>
        <p>${esc(d.official_reasons)}</p>
        <p class="open-sign">— ${esc(d.signatory)}</p>
      </section>

      <section class="open-panel">
        <h2>Universal Decision Logic</h2>
        <dl class="open-dl">
          <dt>Citizen test</dt><dd>${esc(d.udl.citizen_test)}</dd>
          <dt>Steelman — for</dt><dd>${esc(d.udl.steelman_for)}</dd>
          <dt>Steelman — against</dt><dd>${esc(d.udl.steelman_against)}</dd>
          <dt>Data grade</dt><dd>${esc(d.udl.data_grade)}</dd>
          <dt>Foreign interest</dt><dd>${esc(d.udl.foreign_interest)}</dd>
          <dt>History</dt><dd>${esc(d.udl.history)}</dd>
        </dl>
      </section>

      <section class="open-panel open-panel-ai">
        <h2>AI analysis <span class="open-demo-tag">uncensored · no fashion filter</span></h2>
        <p class="open-note">Model: ${esc(d.ai.model)}</p>
        <h3 class="open-sub">Prompt (logged)</h3>
        <pre class="open-pre">${esc(d.ai.prompt)}</pre>
        <h3 class="open-sub">Analysis</h3>
        <pre class="open-pre open-pre-analysis">${esc(d.ai.analysis)}</pre>
      </section>

      <section class="open-panel">
        <h2>Human Council</h2>
        <p>${esc(d.council)}</p>
      </section>

      <section class="open-panel">
        <h2>Outcome</h2>
        <p>${esc(d.outcome)}</p>
      </section>
    `;
  }

  function renderTrace(id) {
    const t = byId(state.traces.traces, id);
    if (!t) return `<p>Trace not found.</p>`;
    return `
      <nav class="open-crumb"><a href="#/">Map</a> · <a href="#/treasury">Treasury</a> · ${esc(t.id)}</nav>
      <header class="open-page-head">
        <p class="open-kicker">Trace ID</p>
        <h1>${esc(t.id)}</h1>
        <p class="open-lead">${esc(t.title)}</p>
      </header>
      <ol class="open-trace">
        ${t.steps
          .map(
            (s, i) => `
          <li>
            <span class="open-trace-num">${i + 1}</span>
            <div>
              <strong>${esc(s.stage)}</strong>
              <p>${esc(s.detail)}</p>
            </div>
          </li>`
          )
          .join("")}
      </ol>
    `;
  }

  function renderTreasury() {
    const rollup = byId(state.budgets.budgets, "bud-treasury");
    const all = state.budgets.budgets.filter((b) => b.id !== "bud-treasury");
    return `
      <nav class="open-crumb"><a href="#/">Map</a> · Treasury</nav>
      <header class="open-page-head">
        <h1>Public Treasury</h1>
        <p class="open-lead">Sample rollup of where money goes. Every line can carry Trace IDs. Amounts are illustrative demo data.</p>
      </header>
      ${
        rollup
          ? `
      <section class="open-section">
        <h2>${esc(rollup.label)} · ${money(rollup.total_out)}</h2>
        <table class="open-table">
          <thead><tr><th>Line</th><th>Amount</th><th>Trace</th></tr></thead>
          <tbody>
            ${rollup.lines
              .map(
                (l) => `
              <tr>
                <td>${esc(l.label)}</td>
                <td>${money(l.amount)}</td>
                <td>${(l.trace_ids || [])
                  .map((t) => `<a href="#/trace/${esc(t)}">${esc(t)}</a>`)
                  .join(" ") || "—"}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </section>`
          : ""
      }
      <section class="open-section">
        <h2>Ministry sample budgets</h2>
        <ul class="open-mini-list open-mini-list-wide">
          ${all
            .map((b) => {
              const o = byId(state.org.nodes, b.org_id);
              return `<li><a href="#/org/${esc(b.org_id)}">${esc(o ? o.name : b.org_id)}</a> — ${money(b.total_out)} <span class="open-demo-tag">demo</span></li>`;
            })
            .join("")}
        </ul>
      </section>
    `;
  }

  function renderDecisions() {
    return `
      <nav class="open-crumb"><a href="#/">Map</a> · Decisions</nav>
      <header class="open-page-head">
        <h1>All Decision Packages</h1>
        <p class="open-lead">How and why — official reasons, UDL, AI prompt and analysis, council, outcome.</p>
      </header>
      <div class="open-decision-list">
        ${state.decisions.decisions
          .map(
            (d) => `
          <a class="open-decision-row" href="#/decision/${esc(d.id)}">
            <span class="open-status open-status-${esc(d.status)}">${esc(d.status)}</span>
            <span class="open-decision-title">${esc(d.title)}</span>
          </a>`
          )
          .join("")}
      </div>
    `;
  }

  function renderIssues() {
    const seed = state.issues.issues;
    const local = loadLocalIssues();
    const tiers = state.issues.bounty_tiers_demo || [];

    return `
      <nav class="open-crumb"><a href="#/">Map</a> · Issues</nav>
      <header class="open-page-head">
        <h1>Citizen issues &amp; waste bounty</h1>
        <p class="open-lead">${esc(state.issues.meta.bounty_rules)}</p>
      </header>

      <section class="open-section">
        <h2>Bounty tiers <span class="open-demo-tag">demo</span></h2>
        <table class="open-table">
          <thead><tr><th>Verified impact</th><th>Reward range</th></tr></thead>
          <tbody>
            ${tiers.map((t) => `<tr><td>${esc(t.impact)}</td><td>${esc(t.reward)}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>

      <section class="open-section">
        <h2>Open docket</h2>
        <div class="open-issue-list">
          ${[...seed, ...local]
            .map(
              (i) => `
            <article class="open-card">
              <p class="open-meta"><span class="open-status">${esc(i.status)}</span> · ${esc(i.type)} · ${esc(i.id)}</p>
              <h3>${esc(i.title)}</h3>
              <p>${esc(i.summary)}</p>
              ${
                i.verified_savings
                  ? `<p class="open-note">Verified savings ${money(i.verified_savings)}${
                      i.bounty_paid ? ` · bounty paid ${money(i.bounty_paid)}` : ""
                    }</p>`
                  : ""
              }
            </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="open-section">
        <h2>File a demo report</h2>
        <p class="open-note">Stored only in your browser (localStorage). This is a prototype, not a live government filing system.</p>
        <form id="issueForm" class="open-form">
          <label>Type
            <select name="type">
              <option value="waste">Waste</option>
              <option value="fraud">Fraud</option>
              <option value="bug">Process bug</option>
            </select>
          </label>
          <label>Title <input name="title" required maxlength="120" placeholder="Short description" /></label>
          <label>Summary <textarea name="summary" required rows="4" maxlength="800" placeholder="What should be checked? Link Trace IDs if you have them."></textarea></label>
          <button type="submit" class="action">Submit demo report</button>
        </form>
      </section>
    `;
  }

  function loadLocalIssues() {
    try {
      return JSON.parse(localStorage.getItem("mlp-open-issues") || "[]");
    } catch {
      return [];
    }
  }

  function saveLocalIssue(issue) {
    const list = loadLocalIssues();
    list.unshift(issue);
    localStorage.setItem("mlp-open-issues", JSON.stringify(list.slice(0, 50)));
  }

  function render() {
    const root = $("#openApp");
    if (!root || !state.org) return;
    const route = parseRoute();
    setActiveNav(route);

    let html = "";
    switch (route.name) {
      case "org":
        html = renderOrg(route.id);
        break;
      case "decision":
        html = renderDecision(route.id);
        break;
      case "trace":
        html = renderTrace(route.id);
        break;
      case "treasury":
        html = renderTreasury();
        break;
      case "decisions":
        html = renderDecisions();
        break;
      case "issues":
        html = renderIssues();
        break;
      default:
        html = renderHome();
    }
    root.innerHTML = html;

    const search = $("#openSearch");
    if (search) {
      search.addEventListener("input", (e) => {
        state.search = e.target.value;
        render();
        const again = $("#openSearch");
        if (again) {
          again.focus();
          const len = again.value.length;
          again.setSelectionRange(len, len);
        }
      });
    }

    const form = $("#issueForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        saveLocalIssue({
          id: `LOCAL-${Date.now()}`,
          type: fd.get("type"),
          title: fd.get("title"),
          status: "open",
          summary: fd.get("summary"),
          verified_savings: null,
          bounty_paid: null,
          local: true,
        });
        location.hash = "#/issues";
        render();
      });
    }
  }

  async function boot() {
    const root = $("#openApp");
    if (!root) return;
    root.innerHTML = `<p class="open-note">Loading prototype…</p>`;
    try {
      const [org, budgets, decisions, traces, issues] = await Promise.all([
        fetch("data/org.json").then((r) => r.json()),
        fetch("data/budgets.json").then((r) => r.json()),
        fetch("data/decisions.json").then((r) => r.json()),
        fetch("data/traces.json").then((r) => r.json()),
        fetch("data/issues.json").then((r) => r.json()),
      ]);
      state.org = org;
      state.budgets = budgets;
      state.decisions = decisions;
      state.traces = traces;
      state.issues = issues;
      const disc = $("#openDisclaimer");
      if (disc && org.meta?.disclaimer) disc.textContent = org.meta.disclaimer;
      render();
      window.addEventListener("hashchange", render);
    } catch (err) {
      root.innerHTML = `<p class="open-note">Could not load prototype data. ${esc(err.message)}</p>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
