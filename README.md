# The Maple Leaf — Open Government of Canada (model) + Public Website

**Love & Logic for Canada**

This repository is **two products in one**:

| Product | Where | For whom |
|---------|--------|----------|
| **Public website** | [`website/`](website/) | Fast citizen front door — who we are, the plan, join |
| **Open government model** | [`government/`](government/) | Browse Canada’s branches & ministries like open source |
| **Policy source code** | [`party-platform/`](party-platform/) | Every detail of laws, tax, health, borders, projections |

> **Status:** Living draft. **Not** the legal Government of Canada. **Not yet** registered with Elections Canada.  
> **Supreme priority:** Logic and critical thought in every decision — **safer, smarter, stronger, richer lives for Canadian citizens first.**

---

## How Cloudflare + GitHub work (site stays fast)

```
GitHub monorepo (everything)
        │
        ├─ website/  ──Cloudflare Pages (root = website)──►  mapleleafparty.ca
        │                 only HTML/CSS/JS · no build
        │
        └─ government/ + party-platform/  ──GitHub UI / git clone──►  full depth
```

| Edit this | Site redeploy? | Deep readers |
|-----------|----------------|--------------|
| `website/*` | Yes | See site |
| `government/*` or `party-platform/*` | **No** | See GitHub immediately |

**Cloudflare:** Root directory = `website` · Build command empty · Output `/`.  
See [docs/DEPLOY.md](docs/DEPLOY.md).

---

## Start here

### 1. Citizen (website)

```bash
cd website && python3 -m http.server 8080
# http://localhost:8080/
```

Live: your Pages / custom domain.

### 2. Open the government (GitHub)

Start at **[government/README.md](government/README.md)** then open a ministry, e.g.:

- **[Health](government/executive/health/)** → full covenant in [platform 04](party-platform/04-health-covenant.md)  
- **[Finance](government/executive/finance/)** → tax + [projections 19](party-platform/19-national-projections.md)  
- **[Immigration & Borders](government/executive/immigration-borders/)** → [18](party-platform/18-borders-immigration.md)  
- **[Defence & National Service](government/executive/defence-service/)** → service instead of grade 10  
- **[Open State](government/open-state/)** → Public Treasury & Trace  

### 3. Propose a law (prototype)

Pull requests = draft bills. Issues = proposals. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Repository map

```
maple-leaf-party/
├── website/                 # ONLY folder Cloudflare deploys
├── government/              # Open Canada: branches + ministries
│   ├── constitution/
│   ├── executive/health/ …  # Browse like departments
│   ├── legislative/         # Issues/PRs as lawmaking
│   ├── judicial/
│   ├── federalism/
│   ├── open-state/
│   ├── sovereign-wealth/
│   └── timeline/
├── party-platform/          # Deep policy modules 00–19
├── projects/party-foundation/
├── legal/
├── CONTRIBUTING.md
└── docs/DEPLOY.md
```

Full notes: [STRUCTURE.md](STRUCTURE.md)

---

## Platform modules (policy source code)

See **[party-platform/README.md](party-platform/README.md)** for the full table (open state, tax, health, food, borders, service, projections, …).

---

## License

MIT — see [LICENSE](LICENSE).  
This is a design prototype, not legal advice, not formal party registration.
