# Gozdarstvo Kurnik – Spletna stran

Poslovna spletna stran za **Gozdarstvo Kurnik** (Blaž Kurnik, dopolnilna dejavnost, Zgornja Voličina). Narejeno kot celovita, stroškovno optimalna rešitev za stranko.

---

## Ideja za stranko: brezplačni hosting + cenovna domena

Cilj je bil stranki zagotoviti profesionalno spletno prisotnost ob **minimalnih letnih stroških** – samo cena domene.

### Kako deluje

1. **Koda je na GitHubu** (ta repozitorij, javen) – brezplačno
2. **Hosting na Vercelu** – Vercel brezplačno hosta statične Next.js strani direkt iz GitHub repozitorija; ob vsakem pushu se stran samodejno posodobi
3. **Domena** – kupljena na [hitrost.com](https://hitrost.com), nato v Vercel dashboardu dodana kot custom domain (DNS nastavitve se nastavijo na hitrost.com)

**Stranka letno plača samo domeno** (~10–15 EUR/leto). Vse ostalo je brezplačno.

---

## Projekt

Migracija obstoječe statične HTML strani v **Next.js 16** z App Routerjem, TypeScriptom in Tailwind CSS. Ohranjen original dizajn – dark zelena tema s Playfair Display in Inter fonti.

### Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS + globalni CSS z `:root` spremenljivkami |
| Animacije | GSAP 3 + `@gsap/react` (ScrollTrigger) |
| Mailing | Resend API |
| Hosting | Vercel (free tier) |
| Domena | hitrost.com → Vercel custom domain |

### Struktura

```
src/
├── app/
│   ├── api/contact/route.ts   # POST endpoint → Resend (pošlje mail stranki)
│   ├── globals.css            # :root CSS spremenljivke + globalni stili
│   ├── layout.tsx             # Metadata, SEO, JSON-LD LocalBusiness, fonti
│   └── page.tsx               # Root stran – importa vse komponente
└── components/
    ├── Navbar.tsx             # Fiksen navbar + hamburger meni + scroll-to-top
    ├── Hero.tsx               # Hero sekcija, GSAP text reveal ob nalaganju
    ├── About.tsx              # O podjetju, ScrollTrigger animacija
    ├── Services.tsx           # 6 storitev + modal popup za vsako
    ├── Gallery.tsx            # Foto galerija (bento layout) + lightbox
    ├── Contact.tsx            # Kontaktni form → API route
    └── Footer.tsx             # Footer z navigacijo
```

### Dizajn

Dark zelena tema, originalni barvni sistem:

```css
--green-dark:   #1a2e1a
--green-mid:    #2d5016
--green-accent: #4a7c2f
--green-light:  #6aab3a
--brown:        #8b5e3c
--cream:        #f5f0e8
```

### SEO

- Polni `metadata` objekt v `layout.tsx` (title, description, keywords, OpenGraph)
- JSON-LD `LocalBusiness` schema za Google
- Semantični HTML tagi po vseh sekcijah

### Kontaktni form

Ob oddaji forme se pošlje email na strankin naslov via Resend API. Ključ je v `.env.local` (ni v repozitoriju).

---

## Moje delo

Projekt je nastal kot demonstracija celovite rešitve za stranko – migracija obstoječe statične HTML strani v moderno tehnologijo z brezplačnim hostingom in minimalnimi letnimi stroški za stranko.

**Tadej Čuš**
