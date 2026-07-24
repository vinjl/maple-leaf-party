# Structure

## Dual product

| Path | Cloudflare Pages? | Role |
|------|-------------------|------|
| `website/` | **Yes** (only this) | Fast public site |
| `government/` | No | Open model of Government of Canada |
| `party-platform/` | No | Full policy / law design |
| `projects/` | No | Party foundation & legal pathways |
| `legal/` | No | Legal research notes |
| `ideas/` | No | Framing notes |

## Deploy rule

Never set Pages root to the repo root. Never bulk-copy `government/` into `website/`.  
The site summarizes; GitHub holds depth.

## Ministry → platform

Each `government/executive/*/README.md` links to the matching `party-platform/NN-*.md` modules.

## Expanding policy

1. Deepen markdown under `party-platform/`.  
2. Add ministry notes under `government/executive/<ministry>/`.  
3. Keep `website/plan/` short; link to GitHub for detail.
