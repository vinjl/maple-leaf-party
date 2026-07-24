# The Maple Leaf Party of Canada

**Love & Logic for Canada**

A complete, open prototype of **logic-based government for Canadian citizens first**:
platform, public website, jurisdiction map, open-state architecture, fiscal projections,
and foundation ops — published as a readable government design, not a slogan pack.

> **Status:** Platform draft. **Not yet registered** with Elections Canada.  
> **Supreme priority:** Every decision tested by logic and critical thought so Canadian citizens live **safer, smarter, stronger, and richer** lives.

---

## Start here

| Path | What it is |
|------|------------|
| **[website/](website/)** | Public bilingual site (EN/FR) — who we are, the plan, join |
| **[party-platform/](party-platform/)** | Full government OS & policy framework (00–19) |
| **[party-platform/10-citizen-contract.md](party-platform/10-citizen-contract.md)** | People-facing deal |
| **[party-platform/19-national-projections.md](party-platform/19-national-projections.md)** | Fiscal / debt / CAD / second-order math (batch 1) |
| **[projects/party-foundation/](projects/party-foundation/)** | Mission, launch playbook, registration research |

### Preview the site locally

```bash
cd website
python3 -m http.server 8080
# open http://localhost:8080/
```

### Deploy (free)

- **Cloudflare Pages** (or GitHub Pages / Netlify): set **root directory** to `website/`, no build command.
- Point your domain (e.g. Route 53) CNAME / Cloudflare nameservers at the host. See [website/README.md](website/README.md).

---

## Repository map — a government in the open

```
04-Maple-Leaf-Party/          ← this repo
│
├── website/                  PUBLIC FACE
│   ├── index.html            Home — who we are, join
│   ├── plan/                 Complete plan, law change, 1·5·10 years, math
│   ├── values/               The standard (citizens first)
│   ├── participate/          Join · volunteer · share
│   ├── about/ contact/ faq/ media/
│   └── fr/                   French parity
│
├── party-platform/           GOVERNMENT DESIGN (source of truth)
│   ├── 00–09                 Core OS: principles, open state, tax, health, CAD, AI
│   ├── 10–17                 Citizen contract, food, family, defence, speech, corporate
│   ├── 18-borders-immigration.md
│   └── 19-national-projections.md
│
├── projects/
│   └── party-foundation/     LAUNCH & OPS
│       ├── mission.md
│       ├── launch-playbook.md
│       └── registration-research.md
│
├── legal/                    Charter / research pathways
├── academic/                 University / research pathway notes
├── ideas/ notes/ research/   Working notes
└── assets/                   Brand source material
```

Think of it as three layers:

1. **Doctrine** — what government is for (citizens first; logic; auditability).  
2. **Architecture** — open state, federalism, money, health, borders, service.  
3. **Public interface** — the website people actually read and join from.

---

## Platform index (government OS)

### Core OS (00–09)

| # | Document | Content |
|---|----------|---------|
| 00 | [First principles](party-platform/00-first-principles.md) | Non-negotiables |
| 01 | [Governing doctrine](party-platform/01-governing-doctrine.md) | How the state runs |
| 02 | [Policy platform index](party-platform/02-policy-platform.md) | Full pillar map |
| 03 | [Capital magnet tax](party-platform/03-capital-magnet-tax.md) | Tax / family / capital |
| 04 | [Health covenant](party-platform/04-health-covenant.md) | Conditional catastrophic care |
| 05 | [Open state architecture](party-platform/05-open-state-architecture.md) | Every $ + process on ledger |
| 06 | [Jurisdiction map](party-platform/06-jurisdiction-map.md) | Federal vs provincial |
| 07 | [Currency & resources](party-platform/07-currency-resources.md) | Hard CAD, sovereign saving |
| 08 | [AI state](party-platform/08-ai-state.md) | AI on non-exempt functions |
| 09 | [Gov as open source](party-platform/09-gov-as-open-source.md) | OSS culture of government |

### Nation & people (10–19)

| # | Document | Content |
|---|----------|---------|
| 10 | [Citizen contract](party-platform/10-citizen-contract.md) | Public deal |
| 11 | [Food & health nation](party-platform/11-food-health-nation.md) | Food, ads, substances, porn |
| 12 | [Family, education, service](party-platform/12-family-education-service.md) | Kids tax, fitness, **NSY** |
| 13 | [Home defence](party-platform/13-home-defence.md) | Castle, carry tools |
| 14 | [Maple Seed → Tree](party-platform/14-maple-seed-tree.md) | Child capital path |
| 15 | [Free speech](party-platform/15-free-speech.md) | Violence-only criminal speech |
| 16 | [Citizen issues](party-platform/16-citizen-issues.md) | Bug tracker, fraud, referendums |
| 17 | [Corporate tax Canada-first](party-platform/17-corporate-tax-canada-first.md) | Reinvest / pay Canadians |
| 18 | [Borders & immigration](party-platform/18-borders-immigration.md) | Secure borders, skill, law |
| 19 | [National projections](party-platform/19-national-projections.md) | Deficit, CAD, second-order effects |

---

## Public plan highlights (website)

What visitors see first (noticeable law):

- **Food** — full disclosure; **total ban** on ads for ultra-processed / unhealthy food  
- **Vice** — commercial porn ban; gambling ads banned  
- **Service** — **one year mandatory national service instead of grade 10**  
- **Open government** — Public Treasury, Trace IDs, open contracts  
- **Borders** — capacity, skilled gap-only, violent non-citizens removed  
- **Tax** — 3 dependent kids + married/common-law → **zero income tax for both parents**  
- **Timeline** — 1 · 5 · 10 years: surplus → sovereign wealth, stronger CAD, higher **GDP per capita**, lower crime  

---

## Contributing

This is a living draft. Prefer clear edits to platform markdown and the static site.

```bash
git clone https://github.com/vincetjl/maple-leaf-party.git
cd maple-leaf-party/website && python3 -m http.server 8080
```

Issues and PRs welcome for clarity, bilingual fixes, and costed projections (batch 2+).

---

## License

MIT — see [LICENSE](LICENSE).  
Political status, branding, and Elections Canada registration are separate from the code license.

---

## Contact (placeholders)

- Public: `contact@themapleleaf.ca`  
- Press: `press@themapleleaf.ca`  

Update these when production email is live.
