# The Maple Leaf — Government as an Open Source Project

**Version:** 0.2  
**Status:** Framework draft — **flagship operating metaphor**  
**Depends on:** `00-first-principles.md`, `05-open-state-architecture.md`, `08-ai-state.md`  
**Carve-outs:** Military operations and secret police/intelligence operations remain classified (same closed list as Open State). Everything else: **open source standards**.

---

## 1. Thesis

Treat the Canadian federal state the way a serious open source project treats its code and community:

| Open source value | Government translation |
|-------------------|------------------------|
| **Transparent** | Public by default — money, process, policy diffs, software |
| **Open source** | Taxpayer-funded software, models, schemas, and process specs are free to inspect, fork, audit |
| **Secure** | Real security engineering + disclosure — not security-by-obscurity for civilian systems |
| **Lean** | Delete dead code / dead programs; small surface area; no feature bloat bureaucracy |
| **Integrity max** | Signed changes, immutable history, reproducible builds, accountable maintainers |

**One line:**

> **The government is a public repository of power. Citizens can read it, audit it, file issues, and verify every non-exempt commit. Maintainers (officials) are accountable. Military ops and secret intel stay private. Everything else is open.**

This is not “governance by Twitter poll” and not “DAO replaces Parliament.” It is **engineering culture applied to the state**: maximum inspectability, minimum waste, maximum integrity.

---

## 1b. Hosting path — prototype now, national platform later

| Phase | Host | Who can propose / file issues |
|-------|------|--------------------------------|
| **Party / design phase** | Public GitHub repo (this project) | Anyone can *read*; serious proposals follow CONTRIBUTING; GitHub is a **prototype host**, not the end state |
| **Maple government** | **National Open Government Platform** Canadian-hosted, sovereign | **Verified Canadian citizen identity accounts only** — My Service Canada–class proof of citizenship, not foreign logins, not bots, not the world writing Canadian law |

**End-state rules**

1. Read access to non-exempt government source and ledgers remains as public as law allows.  
2. **Write path** (propose laws, process fixes, waste bounty claims, Public Chamber identity) requires **citizen verification**.  
3. Permanent residents and others may have limited status-specific channels as statute defines; default write power is **citizens**.  
4. The national platform replaces third-party commercial forges for official state source of truth.  
5. Logic gate and Decision Packages still apply. Citizenship is the key. Logic is the filter.

---

## 2. Mapping: OSS project → Canadian state

| OSS practice | Maple government practice |
|--------------|---------------------------|
| Public git repo | Maple Ledger + Process Registry + public document store |
| README | Every department and every `process_id` has a plain-language public README |
| LICENSE | Taxpayer-funded artifacts: open license by default (inspect/reuse) |
| COMMIT history | Immutable ledger history of $ Traces and process events; law/reg **diffs** |
| Signed commits | Named accountable official + role on every material decision/payment |
| CODEOWNERS | Named process owner; no “the department” anonymity |
| Pull requests | Public change proposals for regs/policy/process (with debate window) |
| Code review | Dual control + public rubric for material spend and rule changes |
| Issues / bug tracker | **MCIP** (`16-citizen-issues.md`) — bugs, suggestions, public fraud docket, signature ladder to referendum |
| CI / tests | Automated KPI checks; process fails CI → public red; AI State as continuous integration |
| Releases | Versioned statutes, process SOPs, software; changelogs mandatory |
| Semantic versioning | Breaking changes to benefits/rules clearly flagged |
| CONTRIBUTING.md | How citizens, firms, researchers file issues and propose fixes lawfully |
| SECURITY.md | Vulnerability disclosure + bug bounty for gov software and ledger |
| Dependabot / SBOM | Software bill of materials for all gov systems; patch SLAs |
| Archive / deprecate | Sunset failed programs like deprecated packages |
| Forks | Provinces/municipalities may reuse federal open components |
| Maintainers step down | Non-performance → remove CODEOWNERS rights (firing/reassignment path) |

---

## 3. Four hard maximization goals

### 3.1 Transparent (max)

- Public by default for all **non-exempt** money and processes (see `05` — 100% except military ops + secret police ops)  
- **Every outflow dollar**, including **all government benefits**, as public Trace events  
- Benefits/person payees: **anonymized fully public auditable** event streams (recompute program totals; no public names/SINs)  
- Machine-readable everything: APIs, bulk download, citizen UI  
- No ATIP-as-primary-interface for ordinary operational data  
- Lobby, contracts, beneficial ownership of org payees — linked graphs  

### 3.2 Open source (max)

**Default rule:** If taxpayers paid for it, the public can read it.

| Artifact | Default |
|----------|---------|
| Custom government software | **Open source** (public repo) |
| Paid custom software contracts | Source escrow + public release as contract term |
| Process definitions / SOPs (non-exempt) | Public, versioned |
| Schemas, APIs, data dictionaries | Public |
| AI model cards, eval harnesses, binding policies | Public for civilian systems |
| Documents / reports | Public; content-addressed hashes on ledger |
| Procurement specs | Public |

**Narrow non-open (aligned carve-outs + real secrets):**

- Military operational software/systems where disclosure aids adversaries  
- Secret intelligence tooling/sources/methods  
- Cryptographic keys, credentials, live exploit details before patch  
- Private citizen case data (not “open source the medical file”)  

**Security note:** For civilian systems, **open source is a security feature** — more eyes, faster patch pressure, no proprietary black-box benefits engines. Secrecy is reserved for genuine adversarial domains, not for hiding shoddy IT.

### 3.3 Secure (max)

Open ≠ careless.

| Practice | Requirement |
|----------|-------------|
| Secure SDLC | Threat model, review, testing before prod |
| Reproducible builds | Where feasible — verify binary matches source |
| SBOM | Every system publishes dependency list |
| Patch SLA | Critical vulns timed; public status for non-exempt systems |
| Bug bounty | Paid for material findings on gov software, ledger, election tooling |
| Least privilege | Staff access minimized; dual control on money |
| Identity & auth | Strong auth for officials; action audit logs |
| Incident disclosure | Public postmortems for civilian breaches (timeline, fix, owner) |
| Classified tier | Military/intel use hardened closed tiers — not an excuse for civilian obscurity |
| Supply chain | Prefer inspectable dependencies; pin & verify |

### 3.4 Lean (max)

Open source projects die under bloat. So does government.

| Lean rule | Practice |
|-----------|----------|
| YAGNI for programs | No program without problem, metric, sunset |
| Delete dead code | Kill processes with failed KPIs two cycles |
| Small modules | Prefer simple process graphs over mega-agencies |
| One way to do it | Dedupe overlapping programs publicly |
| Measure LOC of law | Prefer short clear statutes; publish complexity metrics |
| Admin ratio | Publish admin cost per case; target continuous decline |
| AI bias to shrink | AI State success = fewer layers, not more dashboards (`08`) |

### 3.5 Integrity (max)

| Integrity control | Practice |
|-------------------|----------|
| Immutable history | Maple Ledger append-only; no silent rewrites |
| Attribution | Every material change has a human owner |
| Reproducibility | Another party can re-derive published totals from raw events |
| Separation of duties | Propose ≠ approve ≠ pay |
| Conflict disclosure | Maintainers’ conflicts public when spending/regulating |
| No silent force-push | Policy/law changes via versioned PR with changelog |
| Election integrity | E2E-V + open source voting software (`05`) |
| Audit bounties | Pay citizens who prove integrity failures |

---

## 4. “Repos” of the federal government

Public monorepo-style portals (logical, not necessarily one git host):

```
canada.gov.open/
  README.md                 # How the Open State works
  SECURITY.md               # Disclosure + bounty
  CONTRIBUTING.md           # Issues, proposals, ethics
  ledger/                   # Money Trace APIs + docs
  processes/                # MPR: every process_id README + SLA
  statutes/                 # Machine-readable law + diffs
  regs/                     # Same
  software/                 # Index of gov OSS repos
  ai/                       # Model cards, evals, inventories
  procurement/              # Contracts, rubrics, scores
  issues/                   # Public failure & waste tracker
  releases/                 # Changelogs for major policy/software
  exempt/                   # Statute describing military/intel carve-outs only
```

Every **department** publishes the same skeleton. Every **process** has:

- README (what/why/who/SLA/cost)  
- CHANGELOG  
- Owners  
- Open issues (breach rates, defects)  
- Linked Trace $ spend  

---

## 5. Change management like a mature project

### 5.1 Policy / process pull requests

Material changes to processes, fees, eligibility, or regs:

1. Public proposal (diff)  
2. Cost and citizen-impact note  
3. Comment window (scaled to impact)  
4. Named decision  
5. Version bump + changelog  
6. Ledger event  

Emergency changes allowed with **automatic expiry** and retroactive public PR.

### 5.2 Software releases

- Tagged releases  
- Changelog  
- Rollback plan  
- Eval scores for AI systems  

### 5.3 Deprecation

Programs and processes announce deprecation windows like APIs. No zombie programs forever.

---

## 6. Citizen role (not cosplay legislature)

Citizens and researchers are **auditors and contributors**, not a second cabinet:

| Allowed | Not the model |
|---------|----------------|
| File issues with evidence | Random veto of lawful decisions |
| Propose process patches | Mobs replacing courts |
| Run ledger replicas and verify | Doxxing private persons |
| Claim bug bounties | Harassment of public servants doing lawful work |
| Fork open tools for provinces/civil society | Foreign hostile “contribution” without security review |

Parliament and responsible government remain the **merge authority** for law. Open source culture improves **quality and integrity** of what they merge.

---

## 7. Security vs transparency — resolved

| Domain | Default |
|--------|---------|
| Civilian money, process, software | Open + hardened |
| Private citizen data | Confidential |
| Military operations | Closed (carve-out) |
| Secret police / intel ops | Closed (carve-out) |
| Credentials / unpatched exploit detail | Closed until fixed |
| Post-incident civilian lessons | Open |

**Doctrine:** *Transparency for power. Privacy for people. Secrecy only for war and covert security — not for bureaucracy.*

---

## 8. Lean integrity scoreboard (publish quarterly)

| Metric | Direction |
|--------|-----------|
| % non-exempt outflow $ fully Traced (incl. all benefits) | → 100% |
| Benefit $ as anonymized public events | → 100% |
| Program total vs ledger sum breaks | → 0 |
| % non-exempt processes with public README + SLA | → 100% |
| % gov custom software lines open source | → 100% (non-exempt) |
| Critical vuln mean time to patch | ↓ |
| Bug bounty material finds resolved | Track |
| Admin cost per case (by process family) | ↓ |
| Processes deprecated/killed per year | Healthy turnover |
| Duplicate program clusters remaining | ↓ |
| Ledger replica independent operators | ↑ |
| Carve-out abuse findings | → 0 |

---

## 9. Institutional owners

| Role | Duty |
|------|------|
| Chief Open State Officer | Ledger + MPR + public portals |
| Chief AI Officer | AI on every non-exempt process |
| Chief Software Freedom Officer (or under Open State) | OSS default, SBOM, bounties |
| Process CODEOWNERS | Named human per process |
| Independent integrity board | Witness ledger; abuse of carve-outs |

---

## 10. Legislative skeleton

1. **Government as Open Source Act** (default open license + repo duties)  
2. Tie-ins already planned: Open State, Process Registry, Maple Ledger, AI State, Software Freedom  
3. **Vulnerability Disclosure and Bug Bounty Act** (civilian systems)  
4. **Public Changelog and Regulatory Diff Act**  

---

## 11. Relationship to other pillars

| Pillar | Link |
|--------|------|
| `05` Open State | Ledger + MPR = the “repo and history” |
| `08` AI State | CI/CD + automated review for the whole process graph |
| `07` Hard CAD | Trust premium: open, lean, hard-money country |
| `03` Capital magnet | Global capital prefers high-integrity, inspectable jurisdictions |
| Health / tax / etc. | Each program ships as a versioned, measured module |

---

## 12. One-line summary

> **Run Canada like the best open source project on Earth: fully transparent and open source where it is not military or secret intel, engineered for maximum security, ruthlessly lean, and integrity-maximal — every non-exempt commit visible, every maintainer accountable, every dead module deleted.**
