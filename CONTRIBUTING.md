# Contributing to the open government model

Thank you for improving the Maple Leaf design of government.

## Two products

1. **`website/`** — public site (keep it fast and clear).  
2. **`government/` + `party-platform/`** — open model of the state (full depth).

Cloudflare deploys **only** `website/`. Edits to government docs do not slow the site.

## Propose a change to the plan (a “bill”)

1. Open an **Issue** describing the problem and citizens-first benefit.  
2. Branch and open a **Pull request** that edits:
   - `party-platform/` for policy depth, and/or  
   - `government/` for ministry structure/ops.  
3. In the PR body include:
   - Citizens-first test  
   - Links to affected modules  
   - Charter / legal risk flags `[VERIFY / counsel]` if any  

## Edit the website

Keep summaries short. Link to GitHub for depth. Do not paste entire platform files into HTML.

## Tone

Proud, clear, no comparing to other parties. No empty political jargon. Citizens first.

## Local site preview

```bash
cd website && python3 -m http.server 8080
```
