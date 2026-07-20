# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Next.js dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
```

TypeScript checking: `npx tsc --noEmit` (no dedicated lint command)

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + `tw-animate-css` + shadcn/ui CSS variables
- **Animations**: GSAP 3 (ScrollTrigger) — scroll-driven animations; motion (framer-motion) — React component animations
- **Code highlighting**: prismjs (many languages pre-registered in `animated-code-block.tsx`)

## Architecture

### Pages (App Router, `src/app/`)

| Route | File | Description |
|-------|------|-------------|
| `/` | `page.tsx` | Homepage — GSAP scroll-driven multi-stage animation (hero title, unicorn pixel-art, paper plane, code block) |
| `/vCard` | `vCard/page.tsx` | Digital business card with html2canvas export |
| `/cv` | `cv/page.tsx` | CV/resume with search/filter toolbar |
| `/WechatPublic` | `WechatPublic/page.tsx` | WeChat official account page with QR code |
| `/projects/ppe-safety-detection` | `projects/ppe-safety-detection/page.tsx` | Project showcase page |

### Component layers (`src/components/`)

- **`ui/`** — Reusable primitives: `pixelated-canvas.tsx` (WebGL pixel-art renderer), `animated-code-block.tsx` (code typing animation)
- **`icons/`** — Standalone SVG icon components used by `MobileLinks.tsx` and `VCardContent.tsx`
- **Page-specific** — `CursorGrid.tsx`, `PathAnimation.tsx`, `ShinyText.tsx`, `ScrollIndicator.tsx`, `CvContent.tsx`, `CvToolbar.tsx`, `VCardContent.tsx`, `WechatPublicCard.tsx`, `MobileLinks.tsx`
- **Utilities** — `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge)

### Animation Architecture (Homepage)

GSAP scroll-driven animation on the homepage uses **individual ScrollTrigger + scrub** pattern:

- Each animated element has its own `gsap.to(..., { paused: true })` tween linked to a `ScrollTrigger.create({ animation, scrub: 0.6 })`
- All tweens use function-based `start/end` in pixels (`vh(n) = n/100 * window.innerHeight`) for responsive recalculation
- The `<section>` is `h-[1200vh]` providing 1100vh of scrolling space; sticky container `h-screen` pins the viewport
- `PathAnimation.tsx` (paper plane + link cards) is a child component that also reads `sectionRef` and creates its own ScrollTriggers on the same trigger element
- Paper plane uses a proxy object `{ p: 0 }` driven by `gsap.to()` with `onUpdate` for SVG path position interpolation

Key: **do not** use `+=Nvh` strings in ScrollTrigger start/end (they're parsed as pixels). Use `vh(n)` helper or absolute pixel values.

### Timing layout (homepage scroll, out of 1100vh total)

```
0→180vh   Title: center→top-left, scale 1→0.28
0→260vh   Unicorn: scale 1→0.7
260→440vh Unicorn: x 0→-70vw, opacity 1→0.3
220→260vh Path container: opacity 0→1
260→600vh Paper plane: fly along path (right→left)
450→600vh Link cards: opacity 0→1, y 30→0
660→750vh Group (plane+cards): x 0→-70vw, opacity 1→0.3
760→940vh Code block: y 100vh→0, opacity 0→1 (组结束后 10vh 开始)
```

## Content & Assets

- Public assets in `public/`: `unicorn.webp` (homepage pixel-art source), `projects/yoloe_ppe_流程图.webp` (project page)
- Custom font "ZSFT-342" loaded via external `@font-face` in `globals.css`
- All pages use a dark background `#0a0a14`
- Mobile responsive: desktop-section hidden at ≤768px, `.mobile-page` shown instead
