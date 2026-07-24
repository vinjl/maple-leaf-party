/* Open Government Explorer — diagram map + treasury flow */
(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const state = {
    org: null,
    budgets: null,
    decisions: null,
    traces: null,
    issues: null,
    selectedId: null,
    treasuryFocus: null, // budget line key or org id
    search: "",
  };

  const money = (n) => {
    if (n == null || Number.isNaN(n)) return "—";
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}k`;
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

  function node(id) {
    return byId(state.org.nodes, id);
  }

  function childrenOf(parentId) {
    return state.org.nodes.filter((n) => n.parent === parentId);
  }

  function budgetFor(orgId) {
    const n = node(orgId);
    if (!n?.budget_id) return null;
    return byId(state.budgets.budgets, n.budget_id);
  }

  function decisionsFor(orgId) {
    return state.decisions.decisions.filter((d) => d.org_id === orgId);
  }

  function decisionCount(orgId) {
    return decisionsFor(orgId).length;
  }

  function parseRoute() {
    const h = (location.hash || "#/").replace(/^#/, "") || "/";
    const parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "map" };
    if (parts[0] === "map" || parts[0] === "") return { name: "map", id: parts[1] || null };
    if (parts[0] === "org" && parts[1]) return { name: "map", id: parts[1] };
    if (parts[0] === "treasury") return { name: "treasury", id: parts[1] || null };
    if (parts[0] === "decision" && parts[1]) return { name: "decision", id: parts[1] };
    if (parts[0] === "trace" && parts[1]) return { name: "trace", id: parts[1] };
    if (parts[0] === "issues") return { name: "issues" };
    if (parts[0] === "decisions") return { name: "decisions" };
    return { name: "map" };
  }

  function setNav(route) {
    $$(".open-nav a[data-route]").forEach((a) => {
      const r = a.getAttribute("data-route");
      const active =
        r === route.name ||
        (route.name === "map" && r === "map") ||
        (route.name === "decision" && r === "decisions");
      a.classList.toggle("is-active", active);
    });
  }

  function go(hash) {
    if (location.hash === hash) {
      render();
    } else {
      location.hash = hash;
    }
  }

  /* —— Diagram: State map —— */
  function renderStateMap(selectedId) {
    const constitution = node("constitution");
    const branches = childrenOf("root").filter((b) => b.id !== "constitution");
    // Put constitution first visually via separate row
    const q = state.search.trim().toLowerCase();

    const branchBlock = (b) => {
      const kids = childrenOf(b.id);
      const filteredKids = q
        ? kids.filter(
            (k) =>
              k.name.toLowerCase().includes(q) ||
              (k.mandate || "").toLowerCase().includes(q)
          )
        : kids;
      const sel = selectedId === b.id ? " is-selected" : "";
      const hideBranch =
        q &&
        !b.name.toLowerCase().includes(q) &&
        !(b.mandate || "").toLowerCase().includes(q) &&
        filteredKids.length === 0;

      if (hideBranch) return "";

      return `
        <div class="gov-branch${sel}">
          <button type="button" class="gov-node gov-node-branch${sel}" data-org="${esc(b.id)}" aria-pressed="${selectedId === b.id}">
            <span class="gov-node-name">${esc(b.name)}</span>
            ${decisionCount(b.id) ? `<span class="gov-badge">${decisionCount(b.id)}</span>` : ""}
          </button>
          ${
            filteredKids.length
              ? `<div class="gov-stem" aria-hidden="true"></div>
            <div class="gov-children">
              ${filteredKids
                .map((k) => {
                  const ksel = selectedId === k.id ? " is-selected" : "";
                  const bud = budgetFor(k.id);
                  return `
                  <button type="button" class="gov-node gov-node-leaf${ksel}" data-org="${esc(k.id)}" aria-pressed="${selectedId === k.id}">
                    <span class="gov-node-name">${esc(k.name)}</span>
                    ${bud ? `<span class="gov-node-meta">${money(bud.total_out)}</span>` : ""}
                    ${decisionCount(k.id) ? `<span class="gov-badge">${decisionCount(k.id)}</span>` : ""}
                  </button>`;
                })
                .join("")}
            </div>`
              : ""
          }
        </div>`;
    };

    const cSel = selectedId === "constitution" ? " is-selected" : "";

    return `
      <div class="gov-map" role="tree" aria-label="Map of government">
        <div class="gov-map-top">
          <button type="button" class="gov-node gov-node-root${cSel}" data-org="constitution" aria-pressed="${selectedId === "constitution"}">
            <span class="gov-node-kicker">Supreme</span>
            <span class="gov-node-name">${esc(constitution?.name || "Constitution")}</span>
          </button>
          <div class="gov-trunk" aria-hidden="true"></div>
        </div>
        <div class="gov-map-row">
          ${branches.map(branchBlock).join("")}
        </div>
        <p class="gov-map-hint">Click a box for mandate, sample budget, and decisions. Gold badges = Decision Packages.</p>
      </div>
    `;
  }

  /* —— Diagram: Treasury flow —— */
  function ministryOutflows() {
    return state.budgets.budgets
      .filter((b) => b.id !== "bud-treasury" && b.org_id)
      .map((b) => {
        const o = node(b.org_id);
        return {
          org_id: b.org_id,
          name: o ? o.name : b.org_id,
          total: b.total_out,
          budget: b,
        };
      })
      .sort((a, b) => b.total - a.total);
  }

  function renderTreasuryMap(focusOrgId) {
    const rollup = byId(state.budgets.budgets, "bud-treasury");
    const flows = ministryOutflows();
    const sum = flows.reduce((s, f) => s + f.total, 0) || 1;
    const totalLabel = rollup ? money(rollup.total_out) : money(sum);

    const bands = flows
      .map((f) => {
        const pct = Math.max(3, Math.round((f.total / sum) * 100));
        const sel = focusOrgId === f.org_id ? " is-selected" : "";
        return `
        <button type="button" class="tf-band${sel}" data-org="${esc(f.org_id)}" style="--w:${pct}" title="${esc(f.name)} ${money(f.total)}">
          <span class="tf-band-fill" style="width:${pct}%"></span>
          <span class="tf-band-label">
            <strong>${esc(f.name)}</strong>
            <span>${money(f.total)} · ${Math.round((f.total / sum) * 100)}%</span>
          </span>
        </button>`;
      })
      .join("");

    return `
      <div class="treasury-map" aria-label="Public Treasury money flow">
        <div class="tf-in">
          <div class="tf-box tf-box-in">
            <span class="tf-kicker">In</span>
            <strong>Taxes &amp; revenues</strong>
            <span class="tf-sub">Aggregate public · demo</span>
          </div>
          <div class="tf-arrow-down" aria-hidden="true"></div>
        </div>

        <div class="tf-hub">
          <button type="button" class="tf-box tf-box-hub${focusOrgId === "open-state" || !focusOrgId ? " is-selected" : ""}" data-org="open-state">
            <span class="tf-kicker">Public Treasury</span>
            <strong>Ledger hub</strong>
            <span class="tf-total">${totalLabel}</span>
            <span class="tf-sub">illustrative total outflow</span>
          </button>
          <div class="tf-arrow-down" aria-hidden="true"></div>
        </div>

        <div class="tf-out-label">Out — by ministry <span class="open-demo-tag">demo $</span></div>
        <div class="tf-bands" role="list">
          ${bands}
        </div>

        <p class="gov-map-hint">Bar width = share of ministry sample budgets. Click a bar for line items and Trace paths.</p>
      </div>
    `;
  }

  function renderTraceDiagram(traceId) {
    const t = byId(state.traces.traces, traceId);
    if (!t) return `<p class="open-note">Trace not found.</p>`;
    return `
      <div class="trace-diagram">
        <p class="open-meta">${esc(t.id)} · ${esc(t.title)}</p>
        <ol class="trace-flow">
          ${t.steps
            .map(
              (s, i) => `
            <li class="trace-flow-step">
              <span class="trace-flow-num">${i + 1}</span>
              <div>
                <strong>${esc(s.stage)}</strong>
                <p>${esc(s.detail)}</p>
              </div>
              ${i < t.steps.length - 1 ? `<span class="trace-flow-join" aria-hidden="true"></span>` : ""}
            </li>`
            )
            .join("")}
        </ol>
      </div>
    `;
  }

  function renderPanel(orgId) {
    if (!orgId) {
      return `
        <div class="open-drawer-empty">
          <p class="open-kicker">Detail</p>
          <h2>Select a node</h2>
          <p>Click any box on the diagram for mandate, sample budget, and Decision Packages.</p>
        </div>`;
    }
    const n = node(orgId);
    if (!n) {
      return `<div class="open-drawer-empty"><p>Unknown institution.</p></div>`;
    }
    const budget = budgetFor(orgId);
    const decs = decisionsFor(orgId);
    // Also include decisions that list this org even if decision_ids incomplete
    const more = state.decisions.decisions.filter(
      (d) => d.org_id === orgId && !decs.find((x) => x.id === d.id)
    );
    const allDecs = [...decs, ...more];

    let budgetHtml = "";
    if (budget) {
      budgetHtml = `
        <div class="drawer-block">
          <h3>Sample budget <span class="open-demo-tag">demo</span></h3>
          <p class="open-note">${esc(budget.fy)} · Total ${money(budget.total_out)}</p>
          <ul class="drawer-lines">
            ${budget.lines
              .map((l) => {
                const traces = (l.trace_ids || [])
                  .map(
                    (tid) =>
                      `<button type="button" class="linkish" data-trace="${esc(tid)}">${esc(tid)}</button>`
                  )
                  .join(" ");
                return `<li>
                  <div class="drawer-line-top">
                    <span>${esc(l.label)}</span>
                    <strong>${money(l.amount)}</strong>
                  </div>
                  ${traces ? `<div class="drawer-traces">Trace ${traces}</div>` : ""}
                </li>`;
              })
              .join("")}
          </ul>
        </div>`;
    }

    return `
      <div class="open-drawer-body">
        <button type="button" class="open-drawer-close" id="drawerClose" aria-label="Close panel">×</button>
        <p class="open-kicker">${esc(n.kind)}</p>
        <h2>${esc(n.name)}</h2>
        <p class="open-lead">${esc(n.mandate || "")}</p>
        ${
          n.github
            ? `<p><a class="action action-quiet" href="${esc(n.github)}" target="_blank" rel="noopener">GitHub design notes →</a></p>`
            : ""
        }
        ${budgetHtml}
        ${
          allDecs.length
            ? `<div class="drawer-block">
          <h3>Decision Packages</h3>
          <div class="open-decision-list">
            ${allDecs
              .map(
                (d) => `
              <a class="open-decision-row" href="#/decision/${esc(d.id)}">
                <span class="open-status open-status-${esc(d.status)}">${esc(d.status)}</span>
                <span class="open-decision-title">${esc(d.title)}</span>
              </a>`
              )
              .join("")}
          </div>
        </div>`
            : `<div class="drawer-block"><p class="open-note">No sample decisions attached to this node yet.</p></div>`
        }
        <div id="traceSlot" class="drawer-block drawer-trace-slot" hidden></div>
      </div>
    `;
  }

  function renderMapShell(mode, selectedId) {
    const diagram =
      mode === "treasury" ? renderTreasuryMap(selectedId) : renderStateMap(selectedId);
    const title =
      mode === "treasury"
        ? "Public Treasury — money flow"
        : "State map — structure of government";
    const lead =
      mode === "treasury"
        ? "See tax dollars enter the ledger hub and leave by ministry. Click a bar for line items and Trace steps."
        : "See how the Maple Leaf model is organized. Click a node for detail. This is a diagram, not a stack of pages.";

    return `
      <div class="map-layout${selectedId ? " has-panel" : ""}">
        <div class="map-stage">
          <header class="open-page-head map-head">
            <h1>${title}</h1>
            <p class="open-lead">${lead}</p>
          </header>
          ${
            mode === "map"
              ? `<div class="open-toolbar">
            <label class="open-search">
              <span class="visually-hidden">Filter</span>
              <input type="search" id="openSearch" placeholder="Filter ministries…" value="${esc(state.search)}" />
            </label>
          </div>`
              : ""
          }
          ${diagram}
        </div>
        <aside class="open-drawer" id="openDrawer" aria-live="polite">
          ${renderPanel(selectedId)}
        </aside>
      </div>
    `;
  }

  function renderDecision(id) {
    const d = byId(state.decisions.decisions, id);
    if (!d) return `<p>Decision not found.</p>`;
    const org = node(d.org_id);
    return `
      <nav class="open-crumb">
        <a href="#/map">State map</a> ·
        ${org ? `<a href="#/org/${esc(org.id)}">${esc(org.name)}</a> ·` : ""}
        Decision
      </nav>
      <header class="open-page-head">
        <span class="open-status open-status-${esc(d.status)}">${esc(d.status)}</span>
        <h1>${esc(d.title)}</h1>
        <p class="open-meta">${esc(d.date)} · ${org ? esc(org.name) : ""} · ${esc(d.signatory)}</p>
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

  function renderDecisionsList() {
    return `
      <nav class="open-crumb"><a href="#/map">State map</a> · Decisions</nav>
      <header class="open-page-head">
        <h1>Decision Packages</h1>
        <p class="open-lead">Full records. Prefer opening from a node on the map — badges show counts.</p>
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

  function renderIssues() {
    const seed = state.issues.issues;
    const local = loadLocalIssues();
    const tiers = state.issues.bounty_tiers_demo || [];
    return `
      <nav class="open-crumb"><a href="#/map">State map</a> · Issues</nav>
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
        <h2>Docket</h2>
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
                  ? `<p class="open-note">Savings ${money(i.verified_savings)}${
                      i.bounty_paid ? ` · bounty ${money(i.bounty_paid)}` : ""
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
        <p class="open-note">Stored in your browser only.</p>
        <form id="issueForm" class="open-form">
          <label>Type
            <select name="type">
              <option value="waste">Waste</option>
              <option value="fraud">Fraud</option>
              <option value="bug">Process bug</option>
            </select>
          </label>
          <label>Title <input name="title" required maxlength="120" /></label>
          <label>Summary <textarea name="summary" required rows="4" maxlength="800"></textarea></label>
          <button type="submit" class="action">Submit demo report</button>
        </form>
      </section>
    `;
  }

  function bindMapEvents(mode) {
    $$("[data-org]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-org");
        if (mode === "treasury") {
          go(`#/treasury/${id}`);
        } else {
          go(`#/org/${id}`);
        }
      });
    });

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

    const close = $("#drawerClose");
    if (close) {
      close.addEventListener("click", () => {
        go(mode === "treasury" ? "#/treasury" : "#/map");
      });
    }

    $$("[data-trace]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tid = btn.getAttribute("data-trace");
        const slot = $("#traceSlot");
        if (slot) {
          slot.hidden = false;
          slot.innerHTML = `<h3>Trace path</h3>${renderTraceDiagram(tid)}`;
        }
      });
    });

    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape" && state.selectedId) {
          go(mode === "treasury" ? "#/treasury" : "#/map");
        }
      },
      { once: true }
    );
  }

  function render() {
    const root = $("#openApp");
    if (!root || !state.org) return;
    const route = parseRoute();
    setNav(route);

    if (route.name === "map") {
      state.selectedId = route.id || null;
      root.innerHTML = renderMapShell("map", state.selectedId);
      bindMapEvents("map");
      return;
    }
    if (route.name === "treasury") {
      state.selectedId = route.id || null;
      root.innerHTML = renderMapShell("treasury", state.selectedId);
      bindMapEvents("treasury");
      return;
    }
    if (route.name === "decision") {
      root.innerHTML = renderDecision(route.id);
      return;
    }
    if (route.name === "decisions") {
      root.innerHTML = renderDecisionsList();
      return;
    }
    if (route.name === "issues") {
      root.innerHTML = renderIssues();
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
          });
          render();
        });
      }
      return;
    }
    if (route.name === "trace") {
      // open treasury with panel and show trace
      state.selectedId = "open-state";
      root.innerHTML = renderMapShell("treasury", "open-state");
      bindMapEvents("treasury");
      const slot = $("#traceSlot");
      if (slot) {
        slot.hidden = false;
        slot.innerHTML = `<h3>Trace path</h3>${renderTraceDiagram(route.id)}`;
      }
      return;
    }

    root.innerHTML = renderMapShell("map", null);
    bindMapEvents("map");
  }

  async function boot() {
    const root = $("#openApp");
    if (!root) return;
    root.innerHTML = `<p class="open-note">Loading map…</p>`;
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
      // normalize empty hash to map
      if (!location.hash || location.hash === "#" || location.hash === "#/") {
        history.replaceState(null, "", "#/map");
      }
      render();
      window.addEventListener("hashchange", render);
    } catch (err) {
      root.innerHTML = `<p class="open-note">Could not load map data. ${esc(err.message)}</p>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
