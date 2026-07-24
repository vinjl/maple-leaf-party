# Structure — open government prototype

This repository is organized like a **small government design shop** that also ships a public site.

## Layers

```
┌─────────────────────────────────────────┐
│  website/     Public interface (EN/FR)  │  ← Cloudflare Pages / GitHub Pages
├─────────────────────────────────────────┤
│  party-platform/   Policy & state OS    │  ← Source of truth for law design
├─────────────────────────────────────────┤
│  projects/    Launch, registration, ops │
├─────────────────────────────────────────┤
│  legal/       Charter & research tracks │
└─────────────────────────────────────────┘
```

## Naming

| Folder | Role |
|--------|------|
| `website/` | Static HTML/CSS/JS. **Deploy root.** |
| `party-platform/` | Numbered policy modules (00–19). Government “source code.” |
| `projects/party-foundation/` | How to launch and register. |
| `legal/` | Legal pathways (Charter, research). |
| `ideas/` `notes/` `research/` | Scratch space; not public canon. |
| Root `README.md` | Map for humans and GitHub. |

## Platform numbering convention

- **00–09** — Operating system of the state (principles, open books, money, AI, federalism).  
- **10–17** — Nation-facing pillars (contract, food, family, defence, speech, corporate).  
- **18+** — Extensions (borders, projections, future modules).  

When you add a pillar: new `NN-name.md`, link from `party-platform/README.md` and the website plan.

## Website routes (public)

| Route | Purpose |
|-------|---------|
| `/` | Who we are · join |
| `/plan/` | Full plan, law change, timeline, math |
| `/values/` | The standard |
| `/participate/join.html` | Join list |
| `/fr/**` | French |

## Deploy

Set static host **root** = `website/`. No build step.
