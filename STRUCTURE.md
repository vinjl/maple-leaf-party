# Structure — website + open government

## Dual product

| Path | Deployed to Cloudflare? | Role |
|------|-------------------------|------|
| `website/` | **Yes** (only this) | Fast public site |
| `government/` | No | Open model of Government of Canada |
| `party-platform/` | No | Full policy / law design depth |
| `projects/` | No | Party launch ops |
| `legal/` | No | Charter research tracks |

## Rule

Never set Pages root to repo root. Never bulk-copy `government/` into `website/`.  
Site summarizes; GitHub holds every detail.

## Ministry → platform links

Each `government/executive/*/README.md` points at the numbered `party-platform/NN-*.md` files.

## Expanding a ministry

1. Deepen `party-platform/` markdown.  
2. Add ops/legislation notes under `government/executive/<ministry>/`.  
3. Keep `website/plan/` as a short summary + link to GitHub.
