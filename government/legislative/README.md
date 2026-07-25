# Legislative branch (model)

**Slogan:** For the people, by the people.

## How law is made in this prototype

| Real world | In this repo / under Maple |
|------------|----------------------------|
| Motion / petition | GitHub **Issue** |
| Draft bill | **Pull request** |
| Committee review | PR review + discussion |
| Public debate | **Public Chamber** live stream (chat, call-in, analysis summary) |
| Decision Package | Official reasons + UDL + analysis prompts/analysis + Trace |
| Royal assent (symbolic) | Merge to `main` + optional **Release** tag |

## Public Chamber

Whenever Parliament debates a material act, the people are in the room.

| Channel | Role |
|---------|------|
| **Live chat** | Identity-checked citizens chime in during debate |
| **Call-in** | Queued voice, fair rotation, recorded and transcribed |
| **analysis summary** | Clusters views in real time; prompts and method public; not a substitute for UDL or a vote count |
| **Decision Package** | Steelman and math still decide; named humans still sign |

Demo on the site: [Open Government → Public Chamber](../../website/open/#/chamber)

## Rules

1. Citizens-first test in the PR or bill description.  
2. Link affected `party-platform/` modules.  
3. Flag Charter risk with `[VERIFY / counsel]`.  
4. Prefer small, reviewable PRs.  
5. Public Chamber input is transparent; lobby-only closed debate is not the Maple default.

## Templates

See `.github/ISSUE_TEMPLATE/` and `CONTRIBUTING.md`.
