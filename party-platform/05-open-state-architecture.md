# The Maple Leaf — Open State Architecture

**Version:** 0.6  
**Status:** Framework draft — **flagship pillar**  
**Depends on:** `00-first-principles.md`, `01-governing-doctrine.md`  
**Pairs with:** `08-ai-state.md` · `09-gov-as-open-source.md`

---

## 1. Thesis

A logic-based government cannot be trusted on vibes.

**The 100% rule (with two hard carve-outs):**

1. **Every single public dollar** is fully public, trackable, and traceable on blockchain-grade ledger infrastructure — **100%**.  
2. **Every single government process, bureaucratic workflow, and state function** is inventoried, versioned, measurable, time-bounded, publicly described, and ledger-linked — **100%**.  
3. **Except only:**  
   - **Military operations** (and classified military capabilities/sources/methods that would harm defence if public)  
   - **Secret police / intelligence operations** (covert security-intelligence work, sources, methods, active ops)

Everything else — civilian ministries, tax, health admin, immigration admin, ordinary policing admin, procurement of non-exempt goods, HR, IT, grants, benefits, etc. — is **fully 100% Open State**. No third carve-out for “embarrassment,” “cabinet convenience,” or “the consultants prefer opacity.”

**Open State** = radical transparency of the *civilian and non-covert state*, not abolition of private life, and not suicide of national defence.

**Non-negotiable standards:**

> **If it is a non-exempt government dollar — including every benefit payment — a citizen can audit it — 100%.**  
> **Individual recipients appear only as anonymized public data; dollars and programs never go dark.**  
> **If it is a non-exempt government process, a citizen can see what it is, who owns it, how long it takes, what it costs, and where it sits (privacy-tiered) — 100%.**  
> **Military ops and secret police ops stay secret. Nothing else gets to hide.**

Not annual PDFs. Not ATIP in 18 months. **Continuous, machine-readable, ledger-anchored.**

---

## 2. Scope — “literally every government function” (100%, minus two carve-outs)

### 2.1 Universal coverage rule

Anything the federal state does that:

- spends money, **or**
- makes a decision affecting a person/firm, **or**
- creates, moves, or stores an official record, **or**
- regulates, permits, licenses, inspects, enforces, **or**
- hires, procures, or manages public assets, **or**
- runs internal bureaucracy (HR, IT, policy, comms, ATIP, etc.)

…**must** appear in the **Maple Process Registry (MPR)** and emit events to the **Maple Ledger** at **full public 100%** — **unless** it falls strictly inside §2.2 carve-outs.

**No non-exempt process may operate off-registry.** Unregistered non-exempt process = illegal expenditure of staff time and unlawful decision pathway after transition deadline.

### 2.2 The only exemptions from public 100% (closed list)

| Carve-out | In scope of secrecy | Still required (non-public) |
|-----------|---------------------|-----------------------------|
| **Military operations** | Operational plans, deployments, tactics, ROE detail, classified capabilities, weapons performance where disclosure aids adversaries, military intelligence sources/methods | Internal command accountability; statutory cleared auditors; Parliament’s cleared committee channels as law designs |
| **Secret police / security-intelligence operations** | Covert investigations, human sources, intercept methods, active intel ops, identity of covert officers, CSE/CSIS-class operational detail (and equivalents) | Strict legal warrants/authorities where required; independent cleared review bodies; no “secret police” brand for ordinary politics |

**Explicitly NOT exempt** (must be 100% public Open State):

- All civilian departments and agencies in their normal work  
- Ordinary (non-covert) policing administration, budgets structure, non-sensitive procurement  
- Defence **department civilian-style admin** that is not operationally sensitive (e.g. public-facing HR competitions for unclassified roles, non-sensitive base maintenance contracts — default open unless genuinely operational)  
- Grants, benefits, tax ops aggregates/process clocks, immigration admin process performance, permits, etc.  
- Political staff empires, consulting, “strategic initiatives,” climate offices, identity programs — **no special opacity**

**Anti-abuse rule:** A minister may not stamp “military” or “secret police” on a canteen contract, advertising buy, or friends’ consultancy. Misuse of carve-out class is a **hard offence** with public finding when review bodies determine abuse.

### 2.3 Function catalogue (non-exhaustive — inventory is mandatory and complete; 100% of non-exempt)

Every federal entity maps 100% of its work into categories such as:

| Domain | Examples of processes that must be registered |
|--------|-----------------------------------------------|
| **Money** | Appropriations, allotments, commitments, payments, clawbacks, forecasts |
| **Procurement** | RFx, evaluation, award, change orders, vendor performance |
| **Grants & transfers** | Applications, scoring, agreements, reporting, audits |
| **Tax & revenue (CRA ops)** | Filing intake, assessments, objections, collections, rulings — *outcomes public in aggregate; case privacy protected* |
| **Benefits & entitlements** | Intake, eligibility, decision, appeal, payment |
| **Immigration / borders** | Intake, security checks, decisions, removals, appeals — privacy-tiered |
| **Permits & licenses** | Application, completeness, review, decision, conditions, renewal |
| **Regulation & rulemaking** | Proposal, CBA, consultation, gazetting, repeal/sunset |
| **Inspection & enforcement** | Plan, inspect, finding, penalty, appeal |
| **Justice interfaces** | Federal prosecutions admin, victims services, pardon processes (as applicable) |
| **Defence (non-operational)** | Unclassified logistics, public HR, non-sensitive procurement — **100% open**; operational military → carve-out only |
| **Intelligence / secret police ops** | **Carve-out** — not public process detail |
| **Ordinary police admin** | Budgets, non-covert admin processes — open; covert joint intel → carve-out |
| **Diplomacy & trade admin** | Visas abroad, trade remedy process clocks, consular case types |
| **HR / public service** | Job posts, competitions, staffing, discipline workflows, classification |
| **IT & digital** | System change tickets, outages, security patches, AI model deploys |
| **Policy & legislation support** | Briefing chains, MOU drafting, bill costing packages |
| **Communications** | Official campaigns (cost + authority on ledger) — not personal speech |
| **ATIP / privacy ops** | Request clocks, extension reasons, release packages metadata |
| **Real property** | Acquisition, lease, disposal, maintenance work orders |
| **Science & grants councils** | Peer review process clocks, award decisions |
| **Crown interfaces** | Material federal direction, funding, and compliance processes |
| **Elections support** | Registration, voting systems, audit processes (E2E-V) |
| **Internal bureaucracy** | Memo clearances, travel authorities, hospitality, training mandates, committee workflows |

If a clerk does it weekly and it moves a file, **it is a process** and must be in the MPR.

### 2.4 Provincial note

Federal Open State is mandatory for federal entities. Provinces are invited to mirror via compact; federal **transfers** require provincial reporting hooks for federally funded process outcomes.

---

## 3. Maple Process Registry (MPR) — the OS of bureaucracy

### 3.1 Every process has a Process ID

| Field | Required content |
|-------|------------------|
| `process_id` | Stable unique ID |
| Name + plain-language description | Citizen-readable |
| Legal authority | Statute/reg/policy cite |
| Owning official | Named accountable role (not “the department”) |
| Input → steps → output | Machine-readable flowchart |
| SLA / statutory clock | Max time per stage + total |
| Cost model | Fully loaded $ per case / per hour |
| Systems used | Software list (OSS default policy) |
| Data classes | Public / protected / secret |
| Decision rights | Who can approve; dual-control rules |
| Appeal path | If rights/money affected |
| KPI set | Quality, speed, error, cost |
| AI assist status | None / assist / auto-decide (with rules) |
| Sunset / review date | Kill or rejustify |
| Ledger event schema | Which events must post |

### 3.2 Runtime rule

No case file advances without emitting:

`process_id + case_token + stage + timestamp + actor_role + (public|exempt)`

Citizens (or applicants, privacy-tiered) see **where the file is** and **how long each stage has taken**. Managers and AI see bottlenecks in real time. The public sees aggregate queues and SLA breach rates for every process.

### 3.3 Process debt purge

Annually, every process must:

1. Re-justify existence (citizen interest test)  
2. Publish cost and SLA performance  
3. Face **kill / merge / automate** decision  

Two consecutive years of failed KPIs without approved remediation → **automatic sunset proposal** to Treasury Board / Parliament as designed.

---

## 4. Maple Dollar Trace (MDT) — every dollar out of government

### 4.0 Absolute money rule

> **Literally every dollar that leaves (or is committed by) the government is traceable.**  
> **The public gets fully auditable data for 100% of non-exempt outflows.**  
> **Where the payee is a private person (benefits, wages bands, etc.), public data is anonymized — never secret in aggregate, never off-ledger.**

This includes **all government benefits** — EI, OAS, GIS, CPP interactions where federal, CCB, disability, housing supports, student aid, rebates, credits paid as cash, emergency benefits, Indigenous program transfers at the payment event layer, refundable tax benefits when paid, and every future benefit program. **No benefit program is “too sensitive” to Trace.** Only **identity** of individual recipients is protected via anonymization — not the dollar flow.

### 4.1 Unit of accountability

Every outflow / commitment of public money (and material non-cash value) gets a **Trace ID** for life, linked to `process_id` and privacy-safe `case_token` where applicable.

| Stage | Ledger content |
|-------|----------------|
| Appropriation | Vote, program code |
| Allotment | Dept, responsibility centre |
| Commitment | PO / grant / benefit entitlement authority hash |
| Contract / benefit authority | Full text hash + URI where applicable; org beneficial ownership if vendor |
| Invoice / claim / benefit calculation event | Amount, program code, rule version, approver role |
| Payment | Exact amount, timestamp, payment rail ref, **payee class** (see §4.3) |
| Receipt / delivery / attestation | Where applicable |
| Clawback / overpayment recovery | Reverse / linked Trace IDs |
| Outcome | Program metric codes |

**Rule:** No payment clears the federal payment system without a valid Trace ID posting (or queueing within legal SLA) to the Maple Ledger. **Including every benefit cheque, direct deposit, and transfer.**

### 4.2 Zero threshold — full coverage map

| Category | Public on-ledger? | How identity is handled |
|----------|-------------------|-------------------------|
| **All vendor / contractor payments** | **100% full** — any amount | Legal entity named; beneficial ownership |
| **Grants & contributions to organizations** | **100% full** | Org named |
| **Intergovernmental transfers** | **100% full** | Province/muni/entity named |
| **All individual government benefits** | **100% of dollars** as anonymized payment events | Recipient **anonymized** (§4.3–4.4) |
| **Refundable tax benefits / credits paid out** | **100% of dollars** anonymized events | Anonymized |
| **Public servant salary & benefits compensation** | **100% of dollars** | Bands + org unit; senior roles per disclosure law; no mass SIN dump |
| **Crown corp payments (federal control)** | **100%** or comply-or-explain | Entity rules |
| **P-cards / micro-purchases** | **100%** line-item reconstructable | Vendor named |
| **Tax refunds (general)** | **100% of $** as anonymized events | Anonymized (not a “hide the program” hole) |
| **Military ops & secret police ops** | Carve-out — not full public line-item | Cleared audit only (§10) |
| **Literally everything else non-exempt** | **100%** | Org named or person anonymized |

**There is no “benefits are special, keep them dark” exception.** Benefits are the largest citizen-facing dollar flows; they are first-class Trace citizens.

### 4.3 Payee classes (public schema)

Every payment event declares a **payee_class**:

| `payee_class` | Public fields (always) | Private (not on public ledger) |
|---------------|------------------------|--------------------------------|
| `ORG_VENDOR` | Legal name, ID, amount, contract Trace | — |
| `ORG_GRANT` | Legal name, ID, amount, agreement Trace | — |
| `GOV_TRANSFER` | Receiving government entity, amount, purpose code | — |
| `PERSON_BENEFIT` | **Anonymized recipient token**, program code, amount, period, rule version, geo-bin (optional coarse) | Name, SIN, address, DOB, exact identifiers |
| `PERSON_COMPENSATION` | Role band, org unit, amount (or pay period total), classification | Name (except senior disclosure rules), SIN |
| `PERSON_OTHER` | Anonymized token + purpose code + amount | Personal identifiers |
| `EXEMPT_ENVELOPE` | Envelope label + total $ only | Ops detail (military/intel carve-out) |

### 4.4 Anonymized fully public auditable data (benefits & persons)

**Goal:** Any citizen, journalist, or researcher can **recompute program totals**, detect anomalies, and audit integrity **without** learning who received a benefit.

#### Public event fields for `PERSON_BENEFIT` (illustrative minimum)

```
trace_id, parent_trace_id,
program_code, program_name,
benefit_type, rule_version,
amount_cad, currency,
payment_timestamp, period_start, period_end,
anonymized_recipient_id,   // unlinkable to real identity by public
geo_bin,                   // optional: FSA/province-scale only, never street
household_size_bin,        // optional coarse bins if needed for audit research
decision_process_id,
approver_role_id,          // role not personal SIN of clerk
clawback_flag, linked_traces[]
```

#### Hard privacy guarantees

1. **No names, SINs, street addresses, phone, email** on the public ledger for individual recipients.  
2. **`anonymized_recipient_id`** is a keyed pseudonym (or per-program rotating token design) such that the **public cannot reverse** to a person; only authorized internal systems under law can map for admin/appeals/fraud.  
3. **Anti-reidentification:** suppress or bin quasi-identifiers when cell sizes are too small (k-anonymity / differential-privacy style publication rules for sparse slices).  
4. **Citizen self-view:** a recipient can see **their own** payments in a private portal (authenticated) without putting their identity on the public chain.  
5. **Fraud still works:** internal full identity remains available to lawful investigators; public sees patterns (duplicate tokens, impossible amounts, program spikes).

#### What “fully public auditable” means in practice

Anyone can:

| Audit action | Supported? |
|--------------|------------|
| Sum all dollars for program X on day/week/year | **Yes** — matches government totals or flag discrepancy |
| Verify every benefit payment event exists with Trace ID | **Yes** |
| Chart amount distributions, frequency, regional bins | **Yes** (binned) |
| Link benefit payment → program rules version → appropriation | **Yes** |
| Detect outlier amounts / burst patterns / ghost programs | **Yes** |
| Learn that Jane Doe at 123 Main got $N | **No** — anonymized |

**Reproducibility test:** independent replicas must be able to re-derive published program expenditure totals from the public anonymized event stream. If Ministry total ≠ ledger sum, that is a **public integrity incident**.

### 4.5 All benefits — explicit inclusion list (non-exhaustive, inventory mandatory)

Every federal benefit and transfer-to-person stream is enumerated in a public **Benefits Catalogue** with `program_code` and must emit MDT events, including but not limited to:

- Employment Insurance and successors  
- Old Age Security, Guaranteed Income Supplement, allowances  
- Canada Child Benefit and related  
- Disability and caregivers benefits (federal)  
- Student financial assistance disbursements  
- Housing / rental supports paid federally  
- Climate / carbon / rebate-style cash payments  
- Emergency and one-off benefits (CEWS-class successors, disaster cheques, etc.)  
- Refundable tax credit outflows when paid  
- Any new benefit created after this Act — **auto-enrolled** into MDT (no opt-out)

**Provincial benefits** are not federally operated, but **federal dollars** transferred for benefits are fully Traced to the receiving government; provincial compact invites the same anonymized public event standard for their outflows.

### 4.6 Inflows (optional symmetry)

Taxes and other inflows may use anonymized public aggregates for privacy; **outflows are the non-negotiable full-event layer.** (Do not use “tax privacy” rhetoric to darken benefit outflows.)

---

## 5. Maple Ledger architecture (blockchain-grade)

### 5.1 What goes on-chain / on-ledger

| Layer | Content |
|-------|---------|
| **Money events** | **Every** payment & commitment — vendors, transfers, **all benefits (anonymized)**, compensation |
| **Process events** | Stage transitions for every registered process |
| **Document commitments** | Hashes of contracts, decisions, SOPs, model cards |
| **KPI snapshots** | Periodic process performance roots |
| **Election bulletin board** | E2E-V commitments (not secret ballots) |
| **Exemption log** | Legal basis, $ envelope, review date |

### 5.2 Technical posture

- **Permissioned public-read** federal ledger (“Maple Ledger”)  
- Validators: Open Ledger Service + statutory auditors + optional provincial/university witnesses  
- Content-addressed document store for full files  
- Optional header anchoring to widely witnessed public networks  
- Open-source node software; anyone may run a **read replica** and verify  
- Throughput designed for **entire federal event volume** (money + process stages)

### 5.3 Not the policy

- Paying staff in speculative tokens  
- Publishing citizens’ **names** or private case files on the public ledger  
- Hiding benefit **dollars** under privacy theatre  
- Publishing how individuals voted  
- “DAO replaces Parliament”

Blockchain = **integrity infrastructure for all state money (including every benefit dollar) and all state processes**.

---

## 6. Decision transparency (every bureaucratic decision class)

For each process that issues decisions:

| Requirement | Rule |
|-------------|------|
| Decision record | Outcome + authority + timestamp on ledger (privacy-tiered payload) |
| Reasons | Adverse decisions require explainable reasons to the subject |
| Rubrics | Scoring rubrics public when competitive (grants, procurement, jobs) |
| Consistency | AI + audit flag outlier denials/approvals vs rubric |
| Appeals | Clock-bound; appeal process itself registered in MPR |

---

## 7. Service-level law (bureaucracy clocks)

Parliament/Treasury Board sets default maximums where statute is silent, e.g.:

- Completeness check of applications  
- Standard benefit decisions  
- ATIP responses  
- Procurement stage gates  
- Staffing competitions  

**Breach of SLA without lawful extension reason** → public red flag on process dashboard + managerial consequence path. AI State predicts breaches and auto-escalates.

---

## 8. Contracts, software, influence, law — open source project standard

**Full doctrine:** `09-gov-as-open-source.md` — treat the state like a public repo: transparent, open source, secure, lean, integrity-max.

- Every contract/amendment full text + hash  
- Open tender default; published rubrics  
- Government software **open source by default** (non-exempt); SBOM; bug bounties; reproducible builds where feasible  
- Every department/process ships a public **README + CHANGELOG + CODEOWNERS**  
- Public **issue tracker** for SLA breaches and waste  
- Law/regs as versioned **diffs**; policy “pull requests” with comment windows  
- Government AI systems: model cards, evals, binding policies public by default  
- Lobby registry linked to bills, processes, Trace clusters  
- Machine-readable statutes/regs with diffs  

**Security:** civilian systems secure *through* openness + engineering — not obscurity. Military ops and secret intel remain closed carve-outs.  

---

## 9. End-to-end verifiable elections

1. Cast as intended  
2. Recorded as cast  
3. Tallied as recorded  
4. Ballot secrecy preserved  
5. Open-source software  
6. Independent + risk-limiting audits / paper backup  
7. Citizens-only federal franchise integrity  

Election **administration processes** (not just vote crypto) are full MPR citizens: poll worker training, chain of custody, certification — all process-traced.

---

## 10. Exemptions — closed list only

### 10.1 Public Open State does **not** apply (the only full carve-outs)

| Carve-out | Public Maple Ledger / MPR detail |
|-----------|----------------------------------|
| **Military operations** & classified military capabilities/sources/methods | **No** full public trace of ops, targets, methods, sensitive capability line items |
| **Secret police / security-intelligence operations** | **No** full public trace of covert ops, sources, methods, covert identities |

These domains remain under **command authority + statute + independent cleared review** (not public blockchain voyeurism). That is deliberate.

**Optional democratic minimum (policy choice in bill drafting):** a single high-level public envelope total (e.g. “National Defence vote $X”, “Security & intelligence envelope $Y”) **without** operational breakdown — so citizens still see scale of spend, not plans. Line-item public Trace stops at the carve-out boundary.

### 10.2 Not carve-outs — still 100% public (do not confuse)

| Category | Treatment |
|----------|-----------|
| Personal privacy of private citizens | Case **payloads** protected; process still registered; aggregates public |
| Active criminal **prosecution** file details | Subject privacy / fair trial limits on *content*; admin process clocks still exist |
| Pre-award bid secrets | Time-limited; post-award **full** public |
| Cabinet confidences as culture | **Not** a general Open State exemption for money or bureaucracy |
| “National security” sticker on civilian programs | **Invalid** unless truly military ops or secret intelligence ops |

### 10.3 Illegal

- Permanent public black boxes for non-exempt work  
- Using “military” or “secret police” labels to hide ordinary waste or corruption  
- Off-registry non-exempt processes  

**Misuse of carve-out = publishable finding + personnel/legal consequences.**

---

## 11. Privacy of citizens vs transparency of power

| Subject | Rule |
|---------|------|
| Ministers, depts, processes, vendors | Maximum transparency |
| Ordinary private persons / benefit recipients | Strong privacy of **identity**; **dollars fully public as anonymized events** |
| Private case file content | Strong privacy |
| Queues and SLAs | Public aggregates always |
| Employee pay | Bands + org totals; senior disclosure per law |

---

## 12. Institutions

1. **Chief Open State Officer** — Maple Ledger + MPR operator  
2. **Maple Ledger Service** — validators, APIs, citizen UX  
3. **Process Registry Authority** — forces 100% inventory; rejects ghost workflows  
4. **Independent Ledger Integrity Board**  
5. **Public audit bounties** — $ for proven missing processes, false SLAs, off-ledger pay  
6. **Penalties** for off-registry operations and ledger falsification  
7. **Budget condition:** no departmental A-base without MPR completeness certificate  

---

## 12b. Citizen Issues Platform (MCIP)

See **`16-citizen-issues.md`**. Citizens file bugs, suggestions, and fraud against any registered process; public docket; maintainer SLAs; signature thresholds escalate to committee response or lawful referendum. AI State clusters duplicates; humans decide.

## 13. Integration with AI State (`08-ai-state.md`)

AI is not bolted onto three pet projects. **Every registered process** is an AI surface:

- Stage prediction and bottleneck kill  
- Completeness checking  
- Draft decisions under human authority  
- Anomaly detection on money + process graphs  
- Continuous process redesign proposals (human approves kills/merges)  

If a process exists in MPR, AI State has a mandate to **measure it and improve it**.

---

## 14. Phased rollout

| Phase | Deliverable |
|-------|-------------|
| 0 | Statute: every dollar + every process registration mandate |
| 1 | Complete MPR inventory of all federal processes (public catalogue) |
| 2 | Money Trace 100% + top 100 citizen processes live eventing |
| 3 | All external-facing processes (citizen/firm) live stage clocks |
| 4 | All internal bureaucratic processes live (HR, IT, policy clearances) |
| 5 | Auto-sunset engine for failed KPIs; smart escrow on major $ |
| 6 | E2E-V elections track parallel |

**North-star metrics (non-exempt domain):**

- `% of non-exempt federal outflow $ with complete public Trace T+1` → **100%**  
- `% of benefit program dollars with anonymized public payment events` → **100%**  
- `Ledger-sum vs official program total reconciliation breaks` → **0**  
- `% of non-exempt staff time mapped to registered public processes` → **100%**  
- `% of non-exempt processes with public SLA + live queue stats` → **100%**  
- `Off-registry / off-ledger non-exempt incidents` → **0**  
- `Reidentification incidents from public benefit data` → **0**  
- `Carve-out abuse findings` → **0** (and published when found)

---

## 15. Legislative skeleton

1. **Open State and Public Dollar Trace Act**  
2. **Government Process Registry Act** (every function, every workflow)  
3. **Maple Ledger Act**  
4. **Service Level and Decision Accountability Act**  
5. **Government Software and AI Transparency Act**  
6. **Election Verification Act**  

---

## 16. One-line summary

> **Every non-exempt government dollar — including every benefit payment — is ledger-traced and publicly auditable; person-level data is anonymized, never dark. Every non-exempt process is registered and inspectable. Government as open source: transparent, secure, lean, integrity-max. Only military ops and secret police ops stay closed.**
