# The Maple Leaf Party of Canada

**Love & Logic for Canada**

**Ultimate governance:** every material decision under [Universal Decision Logic](party-platform/20-universal-decision-logic.md) — extreme logic, full steelman, truth-seeking AI under a human council, **Canadian citizens first**.

| Product | Path | Audience |
|---------|------|----------|
| **Public website** | [`website/`](website/) · [**Open Government Explorer**](website/open/) | Citizens — method, plan, interactive demo |
| **Open government model** | [`government/`](government/) | Full branches & ministries as open source |
| **Policy source** | [`party-platform/`](party-platform/) | **UDL headliner** + laws, tax, health, borders |

> **Status:** Living draft. **Not** the legal Government of Canada. **Not yet** registered with Elections Canada.

**Live site:** [www.mapleleafparty.ca](https://www.mapleleafparty.ca) · always-on Pages URL: [mapleleafparty.pages.dev](https://mapleleafparty.pages.dev)

---

## Deploy (Cloudflare Pages)

Only the public site is deployed. Policy depth stays on GitHub so deploys stay fast.

| Setting | Value |
|---------|--------|
| Root directory | `website` |
| Build command | *(empty)* |
| Output directory | `/` |

Details: [docs/DEPLOY.md](docs/DEPLOY.md)

---

## Start here

### Website (local)

```bash
cd website && python3 -m http.server 8080
# http://localhost:8080/
```

### Open government (GitHub)

Start at **[government/README.md](government/README.md)** — e.g. [Health](government/executive/health/), [Finance](government/executive/finance/), [Borders](government/executive/immigration-borders/), [Open State](government/open-state/).

### Policy modules

**[party-platform/README.md](party-platform/README.md)** — modules 00–19 (open state, tax, health, family, borders, projections, …).

### Propose a change

Pull requests and issues welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Repository map

```
maple-leaf-party/
├── website/              # Cloudflare Pages only
├── government/           # Open model of the state
├── party-platform/       # Policy / law design (00–19)
├── projects/             # Party launch & legal pathways
│   ├── party-foundation/
│   └── charter-pathway-25-law/
├── legal/                # Legal research notes
├── ideas/                # Captured framing ideas
├── docs/DEPLOY.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## Contact

- Public: [contact@mapleleafparty.ca](mailto:contact@mapleleafparty.ca)
- Press: [press@mapleleafparty.ca](mailto:press@mapleleafparty.ca)

---

## License

MIT — see [LICENSE](LICENSE).  
Platform text is a design prototype, not legal or tax advice, and not formal party registration.
