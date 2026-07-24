# Contributing to open government

This repository is the Maple Leaf design of government in public files.
You are not only a visitor. You can propose laws, fixes, and waste cuts the way open source works.

## What lives here

| Path | Role |
|------|------|
| `website/` | Public site only. Cloudflare deploys this folder. |
| `government/` | Map of the state, ministries, branches. |
| `party-platform/` | Full policy depth and decision method. |

## Take part in three steps

1. **See how it works** on the site: [Open Government Explorer](https://www.mapleleafparty.ca/open/) (state map, Treasury flow, Decision Packages).  
2. **Speak in the Public Chamber** during debate: [live demo](https://www.mapleleafparty.ca/open/#/chamber) (chat, call-in queue, AI view summary). For the people, by the people.  
3. **Propose on GitHub**
   - [New issue](https://github.com/vinjl/maple-leaf-party/issues/new/choose) for a problem, idea, or waste report.  
   - Pull request to edit `party-platform/` or `government/` when you have a concrete change.  
4. **Clear the logic gate** so maintainers can test your idea.

## The logic gate

A serious proposal should answer, in plain language:

1. **Citizens first** — how it makes Canadian citizens safer, smarter, stronger, or richer, including their children.  
2. **Steelman** — best case for and against, not slogans.  
3. **Math** — full cost, who pays, what prior spend or history shows.  
4. **Data** — sources, and whether claims are replicable.  
5. **Foreign interest** — who outside Canada gains if this passes or fails.  
6. **Kill criteria** — how it dies if it fails.

Full method: [`party-platform/20-universal-decision-logic.md`](party-platform/20-universal-decision-logic.md).

If the math and logic hold and it serves citizens, it can move into the plan and, under a Maple government, toward implementation.  
If it fails, that failure should stay public with reasons.

## Issue and PR tips

**Issue body**

- Problem in one sentence  
- Who is harmed or helped among Canadian citizens  
- Your proposed fix  
- Rough cost or savings if known  
- Links to platform files if any  

**Pull request body**

- Same as above, plus files changed  
- Charter or legal risk flags as `[VERIFY / counsel]` when needed  
- No empty party-comparison rhetoric  

## Website edits

Keep the site short. Link to GitHub for depth. Do not paste entire platform files into HTML.

## Local preview

```bash
cd website && python3 -m http.server 8080
```

## Tone

Clear, proud, citizens first. No empty political jargon.
