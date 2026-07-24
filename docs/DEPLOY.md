# Deploy

## Cloudflare Pages

| Setting | Value |
|---------|--------|
| Root directory | `website` |
| Build command | *(empty)* |
| Output directory | `/` |

**Only `website/` is published.** Folders `government/`, `party-platform/`, etc. stay on GitHub for deep reading — they do not make the site slower.

Working URL always: **https://mapleleafparty.pages.dev**

---

## Domain architecture (Route 53 Domains + hosted zone + Cloudflare Pages)

You bought the domain in **Route 53 Domains** (AWS console).  
For `.ca`, the *registry label* may still say “Gandi” — that is AWS’s backend registrar. You manage everything in **AWS**, not on gandi.net.

There are **two different Route 53 things**:

| Piece | What it is | Where you change it |
|-------|------------|---------------------|
| **Registered domain** | You own the name | Route 53 → **Registered domains** → nameservers |
| **Hosted zone** | DNS records (A, CNAME, …) | Route 53 → **Hosted zones** → records |

The hosted zone has a **fixed** set of four nameservers (you cannot edit those).  
The **registered domain** must list those same four nameservers. If they diverge (e.g. zone deleted and recreated), the internet gets **lame delegation** and the site dies.

```
Browser
   ↓
Route 53 Domains (nameservers on the registration)
   ↓
Route 53 hosted zone (records)
   ↓  www CNAME → mapleleafparty.pages.dev
Cloudflare Pages
```

### Why the site died (July 2026)

1. **Registration NS ≠ hosted zone NS** — domain still pointed at an *old* AWS nameserver set that `REFUSED` queries. The live zone uses a *new* set.
2. **NextDNS** on some networks blocks newly registered domains (`nrd~day`) and returns `0.0.0.0`.

### Fix applied (2026-07-24)

Registration nameservers were updated via AWS to match hosted zone `Z03595963F5SKUVVNJK1X`:

```
ns-92.awsdns-11.com
ns-1786.awsdns-31.co.uk
ns-861.awsdns-43.net
ns-1388.awsdns-45.org
```

`.ca` parent TTL can keep the **old** NS cached up to ~24 hours. Until public resolvers pick up the new set, the custom domain may still fail while **https://mapleleafparty.pages.dev** works.

**Console path if you need to redo this:**  
Route 53 → **Registered domains** → `mapleleafparty.ca` → **Actions** → **Edit name servers** → paste the four NS from the **Hosted zone** detail page.

---

## Records (hosted zone)

Hosted zone: `mapleleafparty.ca` (`Z03595963F5SKUVVNJK1X`)

| Type  | Name | Value |
|-------|------|--------|
| CNAME | `www` | `mapleleafparty.pages.dev` |

### Cloudflare Pages custom domain

1. Dashboard → **Workers & Pages** → project **mapleleafparty**
2. **Custom domains** → add **`www.mapleleafparty.ca`**
3. Wait until status is **Active** (SSL)

### NextDNS

Allowlist `mapleleafparty.ca` / `www.mapleleafparty.ca`, or disable “newly registered domains” blocking.

### Verify

```bash
# Registration NS (AWS)
aws route53domains get-domain-detail --domain-name mapleleafparty.ca --query 'Nameservers[].Name'

# Public (after .ca propagates) — should CNAME to pages.dev
curl -s "https://dns.google/resolve?name=www.mapleleafparty.ca&type=CNAME"
curl -sI https://www.mapleleafparty.ca | head -5
curl -sI https://mapleleafparty.pages.dev | head -5
```

---

## Apex domain (`mapleleafparty.ca` without www)

Cloudflare Pages only supports apex when the domain is a **Cloudflare DNS zone**. Route 53 cannot CNAME the root to `pages.dev`.

| Choice | Result |
|--------|--------|
| **A. Stay on Route 53** | Use `https://www.mapleleafparty.ca` only |
| **B. Apex + www** | Add domain in Cloudflare DNS; set registration NS to Cloudflare’s two nameservers (Route 53 → Registered domains → Edit name servers) |

---

## Checklist

- [x] Registration nameservers = current hosted zone NS
- [x] Hosted zone: `www` CNAME → `mapleleafparty.pages.dev`
- [ ] Wait for `.ca` NS propagation (minutes to ~24h)
- [ ] Cloudflare Pages: `www.mapleleafparty.ca` **Active**
- [ ] NextDNS allowlist if needed
- [ ] SEO meta uses `https://www.mapleleafparty.ca/...`
)
