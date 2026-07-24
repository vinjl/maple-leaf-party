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

## Domain architecture (Route 53 DNS + Cloudflare Pages)

You do **not** change nameservers *inside* Route 53.  
Route 53 **gives** you four nameservers. You paste those into the **domain registrar** (Gandi).

```
Browser
   ↓
Gandi (registrar) ──nameservers──► Route 53 hosted zone
                                      ↓
                              www CNAME ──► mapleleafparty.pages.dev
                                      ↓
                              Cloudflare Pages (site files)
```

### Why the site died (July 2026)

1. **Lame delegation** — Gandi still pointed at an *old* Route 53 nameserver set that no longer serves this zone (`REFUSED`). The live zone has a *new* set of four AWS nameservers.
2. **NextDNS** on some networks blocks newly registered domains (`nrd~day`) and returns `0.0.0.0`, which looks like the site is “down” even when DNS is fine.

AWS is correct: you cannot edit the NS set of a hosted zone. You only update nameservers at **Gandi**.

---

## Fix: get `www.mapleleafparty.ca` working (keep Route 53)

### 1. At Gandi (registrar) — update nameservers

Domain: **mapleleafparty.ca** → DNS / Nameservers → **Custom**

Replace whatever is there with **exactly** these four (from the current Route 53 hosted zone `Z03595963F5SKUVVNJK1X`):

```
ns-92.awsdns-11.com
ns-1786.awsdns-31.co.uk
ns-861.awsdns-43.net
ns-1388.awsdns-45.org
```

Save. Propagation can take minutes to a few hours (often under 30 minutes for `.ca`).

Do **not** use the old set (`ns-1318…`, `ns-38…`, etc.) — those refuse queries.

### 2. Route 53 records (already set)

Hosted zone: `mapleleafparty.ca` (`Z03595963F5SKUVVNJK1X`)

| Type  | Name | Value |
|-------|------|--------|
| CNAME | `www` | `mapleleafparty.pages.dev` |

No A record at apex is required for www-only. Apex (`mapleleafparty.ca` without www) will not host the site until you choose an option below.

### 3. Cloudflare Pages — custom domain

1. Dashboard → **Workers & Pages** → project **mapleleafparty**
2. **Custom domains** → add **`www.mapleleafparty.ca`**
3. Wait until status is **Active** (SSL issued)

Do not only add the CNAME in Route 53 without this step — Cloudflare will not terminate HTTPS for the hostname.

### 4. If your network uses NextDNS

Allowlist `mapleleafparty.ca` and `www.mapleleafparty.ca`, or temporarily disable the “newly registered domains” block. Otherwise you may still see `0.0.0.0` while the rest of the world works.

### 5. Verify

```bash
# Should show CNAME → mapleleafparty.pages.dev (not REFUSED, not 0.0.0.0)
curl -s "https://dns.google/resolve?name=www.mapleleafparty.ca&type=CNAME"

# Site
curl -sI https://www.mapleleafparty.ca | head -5
curl -sI https://mapleleafparty.pages.dev | head -5
```

---

## Apex domain (`mapleleafparty.ca` without www)

Cloudflare Pages only supports an **apex** custom domain when the domain is a **Cloudflare DNS zone** (nameservers at Cloudflare). Route 53 cannot CNAME the root to `pages.dev`.

### Option A — www only (simplest, stay on Route 53)

- Site: `https://www.mapleleafparty.ca`
- Apex has no website (or you add a redirect later)
- Keep Gandi NS → Route 53 as above

### Option B — apex + www on Cloudflare DNS (recommended if you want bare domain)

1. Cloudflare dashboard → **Add a site** → `mapleleafparty.ca` (Free plan is fine)
2. Cloudflare shows **two nameservers** (e.g. `ada.ns.cloudflare.com` / `bob.ns.cloudflare.com`)
3. At **Gandi**, set nameservers to those Cloudflare nameservers (replace the AWS ones)
4. Pages → Custom domains → add **`mapleleafparty.ca`** and **`www.mapleleafparty.ca`**
5. Cloudflare will create the DNS records for you
6. Route 53 hosted zone becomes unused (you can leave or delete it later)

After this, you manage DNS in Cloudflare, not Route 53.

### Option C — keep Route 53, redirect apex → www (optional later)

Use an S3 website redirect + Route 53 Alias A record for the apex only. More moving parts; only if you must keep AWS DNS and still want bare-domain redirects.

---

## Checklist

- [ ] Gandi nameservers match the **current** Route 53 delegation set (or Cloudflare’s set if Option B)
- [ ] Route 53: `www` CNAME → `mapleleafparty.pages.dev` (if keeping Route 53)
- [ ] Cloudflare Pages: custom domain(s) **Active**
- [ ] NextDNS / adblock allowlist if you use them
- [ ] SEO meta already uses `https://www.mapleleafparty.ca/...`
)
