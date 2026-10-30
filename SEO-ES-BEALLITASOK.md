# D-Events – beállítások és SEO teendők

## 1. Ajánlatkérés e-mailben (Resend) – ezek nélkül az űrlap nem küld

1. Regisztrálj a <https://resend.com> oldalon **ugyanazzal a Gmail címmel**, ahová az ajánlatkéréseket várod.
2. Resend → **API Keys → Create API key** (Sending access).
3. Vercel → d-events → **Settings → Environment Variables** (Production + Preview):
   - `RESEND_API_KEY` = az előbbi kulcs
   - `INQUIRY_TO_EMAIL` = a Gmail címed (ha eltér a `NEXT_PUBLIC_CONTACT_EMAIL`-től)
4. Redeploy. Ettől kezdve az ajánlatkérések a Gmailedbe érkeznek, a „Válasz” gomb az ügyfélnek válaszol.

**Visszaigazoló levél az ügyfélnek (ajánlott, később):** Resend → Domains → `d-events.hu` hozzáadása, a kapott DNS rekordokat (TXT/MX/CNAME) fel kell venni a Tárhely.Eu DNS-kezelőjében. Ha a domain „Verified”, állítsd be:
`RESEND_FROM` = `D-Events <ajanlat@d-events.hu>`. Ekkor az érdeklődő automatikus visszaigazolást is kap.

## 2. Konzultáció-foglalás (Cal.com, opcionális)

1. Regisztráció: <https://cal.com>, hozz létre egy „Ingyenes konzultáció (20 perc)” eseménytípust, kösd össze a Google Naptárral.
2. Vercel env: `NEXT_PUBLIC_CAL_LINK` = pl. `d-events/konzultacio` (a cal.com/ utáni rész).
3. Redeploy → megjelenik a `/konzultacio` oldal, és az ajánlatkérés utáni köszönőképernyőn a foglalás gomb.

## 3. Google Search Console

1. <https://search.google.com/search-console> → Tulajdon hozzáadása → **URL-előtag**: `https://d-events.hu`.
2. Ellenőrzés: **HTML-címke** → a `content="…"` értékét másold a Vercel env-be: `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, majd „Ellenőrzés”.
3. Webhelytérképek → beküldés: `https://d-events.hu/sitemap.xml`.
4. URL-ellenőrzés → a főoldal és a 4 szolgáltatásoldal „Indexelés kérése”.

## 4. Google Cégprofil (Google Business Profile) – a helyi találatok kulcsa

1. <https://business.google.com> → Vállalkozás hozzáadása, kategória: **Esküvőszervező** (további: **Rendezvényszervező**).
2. Szolgáltatási terület típus (nincs ügyfélfogadó iroda): Budapest, Pest megye, Szigetszentmiklós …
3. Weboldal: `https://d-events.hu`, telefonszám: **valós** szám.
4. Szolgáltatások: a négy szolgáltatásoldal neve; fotók: saját rendezvényfotók.
5. Kérj értékelést elégedett ügyfelektől – ez a helyi rangsor egyik legerősebb tényezője.

**Fontos:** a név, cím, telefon (NAP) legyen azonos a weboldalon, a Cégprofilban és minden katalógusban.

## 5. Tartalom, ami valós adatra vár (`lib/home-content.ts`, `lib/site.ts`, `lib/portfolio.ts`)

- Telefonszám (`+36 30 123 4567` – helykitöltő).
- Vélemények és partnerek, statisztikák (200+, 10+ év, 98%) – csak valós adat maradjon.
- Galéria: saját fotók a `public/` mappába, Unsplash helyett.
- Közösségi oldalak: `SITE.social` (Instagram, Facebook) – üresen nem jelennek meg.
- Referenciák: `PORTFOLIO` – az első valós bejegyzéstől él a `/referenciak` oldal és a sitemap.
- Új blogcikk: `lib/blog.ts` `POSTS` tömb; havi 1–2 cikk sokat segít.

## Mit tud már az oldal

- 4 szolgáltatásoldal helyi kulcsszavakkal (`/eskuvoszervezes`, `/ceges-rendezvenyszervezes`, `/maganrendezveny-szervezes`, `/dekoracio-es-styling`)
- Angol verzió saját címen: `/en` (hreflang)
- Blog (`/blog`), ajánlatkérő varázsló (`/ajanlatkeres` és minden oldal alján), adatkezelési tájékoztató
- Strukturált adatok: LocalBusiness, WebSite, Service, BlogPosting, BreadcrumbList
- Oldalankénti cím/leírás/canonical, generált megosztási kép, sitemap, robots
