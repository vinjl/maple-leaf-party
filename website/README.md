# Public website — The Maple Leaf

Static bilingual (EN/FR) site. **No build step.**

## Local

```bash
cd website
python3 -m http.server 8080
# http://localhost:8080/
```

## Deploy (Cloudflare Pages)

1. Connect this GitHub repo to Cloudflare Pages.  
2. **Root directory:** `website`  
3. **Build command:** *(empty)*  
4. **Output directory:** `/`  
5. Custom domain → add DNS (Route 53 CNAME or Cloudflare nameservers).

GitHub Pages: Settings → Pages → deploy from `/website` (or `docs` if you mirror).

## Layout

| Path | Role |
|------|------|
| `/` | Who we are · join |
| `/plan/` | Full plan, law change, timeline, math |
| `/values/` | The standard |
| `/participate/join.html` | Join list |
| `/fr/` | French |

Forms are front-end ready — wire to Formspree / Netlify Forms / your API when live.
