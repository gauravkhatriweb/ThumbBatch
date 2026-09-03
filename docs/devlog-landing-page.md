# Devlog — ThumbBatch Landing Page

**Date:** September 3, 2026
**Project:** [ThumbBatch](https://github.com/gauravkhatriweb/ThumbBatch)
**Mission:** Hack Club Stardance — *Frictionless*

---

## What I Built

The extension was done. But nobody would find it, understand it, or trust it without a great landing page. So today I built one — from scratch.

The goal: a page that makes a visitor think *"why wasn't this built into Chrome already?"*

---

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (`@theme` config)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Components:** Radix UI primitives (Accordion, Slot)

---

## Design

Strict monochrome — near-black background, white text, `#737373` gray — with *surgical* use of YouTube red (`#FF0000`) as the only accent. Geist font. No fake testimonials. No stock photos. No buzzwords.

> The product is simple. The design should say that.

---

## Sections Built

- [x] Sticky glassmorphism navbar
- [x] Hero with animated extension popup simulation
- [x] "Old Way" — 9-step pain diagram vs 3-step ThumbBatch flow
- [x] Features grid (Bulk mode highlighted as key differentiator)
- [x] Personas — Creators, Designers, Researchers
- [x] How it works — 3 steps
- [x] **Bulk Mode Showcase** — *fully interactive*: click to select thumbnails, watch real ZIP progress animation
- [x] Privacy — 4 trust pillars + open source callout
- [x] Pricing — giant `$0`, no table, no tiers
- [x] Installation guide + simulated Chrome extensions mockup
- [x] Technical credibility (Manifest V3, local ZIP, smart fallback)
- [x] Open Source — GitHub file tree mockup
- [x] FAQ accordion (7 technically accurate answers)
- [x] Final CTA + footer
- [x] Custom favicon — `TB` icon with red accent underline
- [x] SEO metadata + Open Graph
- [x] Production build ✅ — `npm run build` exits `0`

---

## Bugs Fixed

Two icon import mismatches in `lucide-react` (version didn't export `Github`, `BarChart2Off`, `Infinity`) — swapped for valid alternatives. One Turbopack crash from unescaped quotes inside a string literal in `Install.tsx`.

---

## Dev Server

```bash
cd web && npm run dev
# → http://localhost:3000
```

*Less software. More solved.*
