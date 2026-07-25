# Security — mapleleafparty.ca

Static site on **Cloudflare Pages** (`website/`). No application server, no auth, no database.

## Headers (`website/_headers`)

Applied by Cloudflare Pages to all routes:

| Header | Purpose |
|--------|---------|
| `Content-Security-Policy` | Restrict scripts, styles, fonts, connect, frames |
| `Strict-Transport-Security` | HTTPS only (1 year, includeSubDomains, preload-ready) |
| `X-Frame-Options: DENY` | Clickjacking |
| `frame-ancestors 'none'` | CSP double-lock |
| `X-Content-Type-Options: nosniff` | MIME sniffing |
| `Referrer-Policy: strict-origin-when-cross-origin` | Limit referrer leak |
| `Permissions-Policy` | Disable unused device APIs |
| `Cross-Origin-Opener-Policy: same-origin` | Isolate browsing context |

### CSP notes

- Scripts: `'self'` + `'unsafe-inline'` for JSON-LD blocks (`type="application/ld+json"`).
- Styles: `'self'` + `'unsafe-inline'` (small inline styles) + Google Fonts CSS.
- Fonts: `fonts.gstatic.com` until fonts are self-hosted.
- `connect-src 'self'` — Open Explorer only fetches same-origin JSON.
- `form-action 'self' mailto:` — join forms use mailto.

## Verify live

```bash
curl -sI https://www.mapleleafparty.ca/ | grep -iE \
  'content-security|strict-transport|x-frame|permissions-policy|x-content-type|referrer-policy'
```

## Other controls

| Control | Status |
|---------|--------|
| Public emails | Only `contact@` and `press@` (ImprovMX forward) |
| Join forms | Mailto only; no server store |
| XSS in Explorer | `esc()` on dynamic strings; first-party JSON |
| External links | `rel="noopener noreferrer"` |
| `security.txt` | `/.well-known/security.txt` |

## Residual

- Google Fonts still loads from Google (privacy / third-party). Self-host to remove.
- `Access-Control-Allow-Origin: *` may still appear from Pages defaults on some assets; not sensitive for this public site.
- Demo `localStorage` in Explorer is browser-only sample chat/issues.
