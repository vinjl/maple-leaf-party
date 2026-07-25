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
    chamber: null,
    selectedId: null,
    treasuryFocus: null,
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
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

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
    if (parts[0] === "chamber") return { name: "chamber" };
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

    // Order branches for a readable map: legislative, executive (largest), judicial, open-state, federalism, swf
    const order = ["legislative", "executive", "judicial", "open-state", "federalism", "swf"];
    const ordered = [
      ...order.map((id) => branches.find((b) => b.id === id)).filter(Boolean),
      ...branches.filter((b) => !order.includes(b.id)),
    ];

    return `
      <div class="gov-map" role="tree" aria-label="Map of government">
        <div class="gov-map-legend" aria-hidden="true">
          <span><i class="leg leg-branch"></i> Branch</span>
          <span><i class="leg leg-leaf"></i> Ministry / chamber</span>
          <span><i class="leg leg-badge"></i> Decision Package</span>
        </div>
        <div class="gov-map-top">
          <button type="button" class="gov-node gov-node-root${cSel}" data-org="constitution" aria-pressed="${selectedId === "constitution"}">
            <span class="gov-node-kicker">Supreme priority</span>
            <span class="gov-node-name">${esc(constitution?.name || "Constitution")}</span>
            <span class="gov-node-meta">Citizens first · logic</span>
          </button>
          <div class="gov-trunk" aria-hidden="true"></div>
          <div class="gov-rail" aria-hidden="true"></div>
        </div>
        <div class="gov-map-row">
          ${ordered.map(branchBlock).join("")}
        </div>
        <p class="gov-map-hint">Click any box — detail opens beside the map (mandate, sample $, decisions). Badges = Decision Packages.</p>
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
    const inflows = rollup?.inflows || [
      { label: "Taxes & revenues", amount: rollup?.total_out || sum },
    ];
    const inSum = inflows.reduce((s, x) => s + x.amount, 0) || 1;

    const inBands = inflows
      .map((f) => {
        const pct = Math.max(8, Math.round((f.amount / inSum) * 100));
        return `
        <div class="tf-band tf-band-in" style="--w:${pct}">
          <span class="tf-band-fill tf-band-fill-in" style="width:${pct}%"></span>
          <span class="tf-band-label">
            <strong>${esc(f.label)}</strong>
            <span>${money(f.amount)}</span>
          </span>
        </div>`;
      })
      .join("");

    const bands = flows
      .map((f) => {
        const pct = Math.max(4, Math.round((f.total / sum) * 100));
        const sel = focusOrgId === f.org_id ? " is-selected" : "";
        return `
        <button type="button" class="tf-band${sel}" data-org="${esc(f.org_id)}" title="${esc(f.name)} ${money(f.total)}">
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
        <div class="tf-out-label">In — public revenues <span class="open-demo-tag">demo $</span></div>
        <div class="tf-bands tf-bands-in">${inBands}</div>
        <div class="tf-arrow-down tf-arrow-center" aria-hidden="true"></div>

        <div class="tf-hub">
          <button type="button" class="tf-box tf-box-hub${
            focusOrgId === "open-state" || !focusOrgId ? " is-selected" : ""
          }" data-org="open-state">
            <span class="tf-kicker">Public Treasury</span>
            <strong>One ledger hub</strong>
            <span class="tf-total">${totalLabel}</span>
            <span class="tf-sub">illustrative · every dollar Trace-ready</span>
          </button>
        </div>
        <div class="tf-arrow-down tf-arrow-center" aria-hidden="true"></div>

        <div class="tf-out-label">Out — by ministry <span class="open-demo-tag">demo $</span></div>
        <div class="tf-bands" role="list">${bands}</div>

        <p class="gov-map-hint">Bar width = share of the pot. Click a ministry for program lines and Trace paths (how a dollar moves).</p>
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
            ? `<p><a class="action action-quiet" href="${esc(n.github)}" target="_blank" rel="noopener noreferrer">GitHub design notes →</a></p>`
            : ""
        }
        ${budgetHtml}
        ${
          orgId === "public-chamber" || orgId === "house" || orgId === "senate" || orgId === "legislative"
            ? `<div class="drawer-block">
          <h3>Public Chamber</h3>
          <p class="open-note">Live citizen chat, call-in, and AI view-summary during debate.</p>
          <p><a class="action" href="#/chamber">Enter Public Chamber →</a></p>
        </div>`
            : ""
        }
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

  function renderChamber() {
    const c = state.chamber;
    if (!c) return `<p class="open-note">Chamber data missing.</p>`;
    const s = c.session;
    const local = loadLocalChat();
    const messages = [...c.messages, ...local];

    return `
      <nav class="open-crumb"><a href="#/map">State map</a> · <a href="#/org/legislative">Legislative</a> · Public Chamber</nav>
      <header class="open-page-head">
        <p class="open-kicker">${esc(c.meta.slogan)}</p>
        <h1>Public Chamber</h1>
        <p class="open-lead">
          While Parliament debates anything material, citizens are in the room.
          Live chat, call-in queue, AI clustering of views, then Universal Decision Logic still decides.
        </p>
        <p class="open-note">${esc(c.meta.disclaimer)}</p>
      </header>

      <div class="chamber-layout">
        <section class="chamber-main">
          <div class="chamber-session">
            <span class="chamber-live">● ${esc(s.status)}</span>
            <h2>${esc(s.title)}</h2>
            <p class="open-meta">${esc(s.stage)} · started ${esc(s.started)} · ~${esc(String(s.viewers_demo))} watching · ${esc(String(s.callers_waiting_demo))} in call queue <span class="open-demo-tag">demo</span></p>
            <p><a class="action action-quiet" href="#/decision/${esc(s.bill_ref)}">Linked Decision Package →</a></p>
          </div>

          <div class="chamber-chat" id="chamberChat" aria-live="polite">
            ${messages
              .map(
                (m) => `
              <article class="chamber-msg chamber-msg-${esc(m.channel)}">
                <header>
                  <strong>${esc(m.who)}</strong>
                  <span class="chamber-channel">${esc(m.channel)}</span>
                </header>
                <p>${esc(m.text)}</p>
              </article>`
              )
              .join("")}
          </div>

          <form id="chamberForm" class="chamber-compose open-form">
            <label>Your message to the floor
              <textarea name="text" required rows="2" maxlength="400" placeholder="Identity-checked citizens would speak here in a live session…"></textarea>
            </label>
            <div class="chamber-compose-row">
              <button type="submit" class="action">Send to demo chat</button>
              <button type="button" class="action action-quiet" id="chamberCallBtn">Request call-in slot</button>
            </div>
            <p class="open-note" id="chamberNote" role="status"></p>
          </form>
        </section>

        <aside class="chamber-side">
          <div class="open-panel open-panel-ai">
            <h2>AI view summary <span class="open-demo-tag">browser demo</span></h2>
            <p class="open-note">${esc(c.ai_summary.udl_note)}</p>
            ${c.ai_summary.clusters
              .map(
                (cl) => `
              <div class="chamber-cluster">
                <h3 class="open-sub">${esc(cl.theme)} · ${esc(cl.share)}</h3>
                <ul class="plain">
                  ${cl.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}
                </ul>
              </div>`
              )
              .join("")}
          </div>
          <div class="open-panel">
            <h2>How this works</h2>
            <ul class="plain">
              <li><strong>Chat</strong> during public debate on any material act.</li>
              <li><strong>Call-in</strong> fair queue, recorded and transcribed.</li>
              <li><strong>AI</strong> clusters views; prompts and method stay public; not a vote count.</li>
              <li><strong>Logic and math</strong> still gate the Decision Package. Named humans still sign.</li>
            </ul>
            <p class="home-cta-line">
              <a class="action action-quiet" href="https://github.com/vinjl/maple-leaf-party/issues/new/choose" target="_blank" rel="noopener noreferrer">Propose on GitHub prototype →</a>
            </p>
            <p class="open-note">Live chamber access under Maple government is for verified Canadian citizens only.</p>
          </div>
        </aside>
      </div>
    `;
  }

  function loadLocalChat() {
    try {
      return JSON.parse(localStorage.getItem("mlp-chamber-chat") || "[]");
    } catch {
      return [];
    }
  }

  function saveLocalChat(msg) {
    const list = loadLocalChat();
    list.push(msg);
    localStorage.setItem("mlp-chamber-chat", JSON.stringify(list.slice(-40)));
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
            <p class="open-note">
              Want to change something?
              Today use the
              <a href="https://github.com/vinjl/maple-leaf-party/issues/new/choose" target="_blank" rel="noopener noreferrer">GitHub prototype</a>.
              Under Maple government, proposals will need a verified Canadian citizen account on a national platform.
              <a href="https://github.com/vinjl/maple-leaf-party/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">How to contribute</a>.
            </p>
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
          <dt>Best case for</dt><dd>${esc(d.udl.steelman_for)}</dd>
          <dt>Best case against</dt><dd>${esc(d.udl.steelman_against)}</dd>
          <dt>Data grade</dt><dd>${esc(d.udl.data_grade)}</dd>
          <dt>Foreign interest</dt><dd>${esc(d.udl.foreign_interest)}</dd>
          <dt>History</dt><dd>${esc(d.udl.history)}</dd>
        </dl>
      </section>
      <section class="open-panel open-panel-ai">
        <h2>AI analysis <span class="open-demo-tag">demo analysis · not live policy</span></h2>
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
    // Scroll selected node into view on load
    const sel = $(".gov-node.is-selected, .tf-band.is-selected, .tf-box-hub.is-selected");
    if (sel && sel.scrollIntoView) {
      try {
        sel.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch (_) {
        /* ignore */
      }
    }

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

  }

  // Single escape handler for drawer
  if (!window.__mlpOpenEsc) {
    window.__mlpOpenEsc = true;
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const route = parseRoute();
      if (route.name === "map" && route.id) go("#/map");
      if (route.name === "treasury" && route.id) go("#/treasury");
    });
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
    if (route.name === "chamber") {
      root.innerHTML = renderChamber();
      const form = $("#chamberForm");
      const note = $("#chamberNote");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          const text = String(fd.get("text") || "").trim();
          if (!text) return;
          saveLocalChat({
            id: `lc-${Date.now()}`,
            who: "You · demo",
            channel: "chat",
            text,
          });
          form.reset();
          render();
          const chat = $("#chamberChat");
          if (chat) chat.scrollTop = chat.scrollHeight;
        });
      }
      const callBtn = $("#chamberCallBtn");
      if (callBtn && note) {
        callBtn.addEventListener("click", () => {
          note.textContent =
            "Demo only. In a live session you would enter the identity-checked call queue. Queue position would appear here.";
        });
      }
      const chat = $("#chamberChat");
      if (chat) chat.scrollTop = chat.scrollHeight;
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
      const [org, budgets, decisions, traces, issues, chamber] = await Promise.all([
        fetch("data/org.json").then((r) => r.json()),
        fetch("data/budgets.json").then((r) => r.json()),
        fetch("data/decisions.json").then((r) => r.json()),
        fetch("data/traces.json").then((r) => r.json()),
        fetch("data/issues.json").then((r) => r.json()),
        fetch("data/chamber.json").then((r) => r.json()),
      ]);
      state.org = org;
      state.budgets = budgets;
      state.decisions = decisions;
      state.traces = traces;
      state.issues = issues;
      state.chamber = chamber;
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
