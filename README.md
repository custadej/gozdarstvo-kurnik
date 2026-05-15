# Gozdarstvo Kurnik – Business Website

Website for **Gozdarstvo Kurnik** (Blaž Kurnik, forestry services, Zgornja Voličina, Slovenia). Built as an all-in-one, cost-minimal solution for the client.

---

## The deal for the client: free hosting + cheap domain

The goal was a professional web presence at the **lowest possible annual cost** — just the domain.

1. **Code on GitHub** (this repo, public) — free
2. **Hosting on Vercel** — free tier, auto-deploys on every push
3. **Domain** — purchased on [Neoserv](https://www.neoserv.si), connected as a custom domain in Vercel dashboard

**Client pays only the domain** (~€10–15/year). Everything else is free.

---

## Project

Migration of an existing static HTML page to **Next.js 16** with App Router, TypeScript, and Tailwind CSS. Original design preserved — dark green theme with Playfair Display and Inter fonts.

### Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS + global CSS with `:root` variables |
| Animations | GSAP 3 + `@gsap/react` (ScrollTrigger) |
| Email | Resend API |
| Hosting | Vercel (free tier) |
| Domain | Neoserv → Vercel custom domain |

### Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # POST endpoint → Resend (sends email to client)
│   ├── globals.css            # :root CSS variables + global styles
│   ├── layout.tsx             # Metadata, SEO, JSON-LD LocalBusiness, fonts
│   └── page.tsx               # Root page — imports all components
└── components/
    ├── Navbar.tsx             # Fixed navbar + hamburger menu + scroll-to-top
    ├── Hero.tsx               # Hero section, GSAP text reveal on load
    ├── About.tsx              # About section, ScrollTrigger fade-in
    ├── Services.tsx           # 6 services + modal popup per card
    ├── Gallery.tsx            # Photo gallery (bento layout) + lightbox
    ├── Contact.tsx            # Contact form → API route
    └── Footer.tsx             # Footer with navigation
```

### Design

Dark green color system:

```css
--green-dark:   #1a2e1a
--green-mid:    #2d5016
--green-accent: #4a7c2f
--green-light:  #6aab3a
--brown:        #8b5e3c
--cream:        #f5f0e8
```

### SEO

- Full `metadata` object in `layout.tsx` (title, description, keywords, OpenGraph)
- JSON-LD `LocalBusiness` schema for Google
- Semantic HTML tags throughout all sections

### Contact form

On submission, sends an email to the client via Resend API. The API key lives in `.env.local` (not in the repo).

---

**Tadej Čuš**
