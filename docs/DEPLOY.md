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
| A/AAAA alias | `@` (apex) | CloudFront `d2w40lxegfcox9.cloudfront.net` (301 → www) |

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

# Apex should 301 to www
curl -sI https://mapleleafparty.ca | head -10
```

---

## Apex domain (`mapleleafparty.ca` without www)

Route 53 cannot CNAME the apex to `pages.dev`. **Implemented (2026-07-24):** HTTPS apex redirect via AWS only.

| Piece | Value |
|-------|--------|
| ACM cert (us-east-1) | `mapleleafparty.ca` (+ `www` SAN) |
| CloudFront distribution | `E3BI3MNMJYSSF9` → `d2w40lxegfcox9.cloudfront.net` |
| CloudFront Function | `mapleleafparty-apex-to-www` (viewer-request 301 → `https://www.mapleleafparty.ca` + path/query) |
| Route 53 | Apex A + AAAA alias → that CloudFront domain |

`www` stays on Cloudflare Pages. Apex only redirects; it does not host content.

To tear down later: disable/delete the CloudFront distribution, remove apex A/AAAA, delete the function and ACM cert if unused.

---

## Checklist

- [x] Registration nameservers = current hosted zone NS
- [x] Hosted zone: `www` CNAME → `mapleleafparty.pages.dev`
- [x] Hosted zone: apex A/AAAA → CloudFront 301 → www
- [ ] Wait for public DNS cache (minutes; rarely longer)
- [ ] Cloudflare Pages: `www.mapleleafparty.ca` **Active**
- [ ] NextDNS allowlist if needed
- [ ] SEO meta uses `https://www.mapleleafparty.ca/...`
)
