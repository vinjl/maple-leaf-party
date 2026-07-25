# Email — mapleleafparty.ca

Public addresses on the site:

| Address | Purpose |
|---------|---------|
| `contact@mapleleafparty.ca` | Public contact, join/volunteer mailto |
| `press@mapleleafparty.ca` | Media |

## How it works

Inbound mail is **forwarded** via [ImprovMX](https://improvmx.com) (free tier is enough for a living draft).  
DNS is on **Route 53** (not Cloudflare). Personal destination inbox stays **off** the public repo.

```
Sender → MX mapleleafparty.ca (ImprovMX) → your personal inbox
```

## DNS (already applied in hosted zone)

Hosted zone: `Z03595963F5SKUVVNJK1X`

| Type | Name | Value |
|------|------|--------|
| MX | `@` | `10 mx1.improvmx.com` |
| MX | `@` | `20 mx2.improvmx.com` |
| TXT | `@` | `v=spf1 include:spf.improvmx.com ~all` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contact@mapleleafparty.ca` |

Do not remove apex A/AAAA (CloudFront redirect) or `www` CNAME when editing email records.

## One-time setup (you)

1. Create a free account: https://app.improvmx.com/signup  
2. **Add domain** `mapleleafparty.ca`  
3. Wait until DNS shows **verified** (MX/SPF green)  
4. Create aliases:
   - `contact` → your personal email  
   - `press` → same (or a second inbox later)  
5. Optional: catch-all → personal email for typos  

**Never commit the personal destination address to git.**

## Verify

```bash
dig mapleleafparty.ca MX +short
# Expect:
# 10 mx1.improvmx.com.
# 20 mx2.improvmx.com.

# From a non-self address (or friend), email contact@mapleleafparty.ca
# Check inbox + spam. ImprovMX dashboard → Logs if missing.
```

## Forms on the website

Join / volunteer open the visitor’s **mail app** to `contact@` (no server-side list).  
Once ImprovMX aliases point at your inbox, those messages arrive there when the visitor hits Send.

## Sending *as* contact@ (optional, later)

Receiving does not require this. To reply from Gmail *as* `contact@mapleleafparty.ca`:

1. ImprovMX **SMTP** (paid tier on some plans) or Google Workspace  
2. Gmail → Settings → Accounts → “Send mail as”  
3. Align SPF/DKIM with whatever SMTP you use  

Until then: reply from your personal address is fine; recipients already wrote to `contact@`.

## Change destination

ImprovMX dashboard → alias → edit forward-to. No DNS change needed.
