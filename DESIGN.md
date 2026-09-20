# Design Brief

## Direction

Ramo de Papel — a full-viewport hand-drawn digital greeting card: a portrait card of yellow tulips in brown kraft paper with a pink ribbon, floating on a cream paper scene.

## Tone

Warm hand-drawn bullet-journal / sticker-sheet aesthetic — soft pastel, imperfect, personal; it must feel drawn by hand and given with love, never corporate.

## Differentiation

The whole page is a piece of cream paper, not a UI: faint pink/green/yellow confetti specks, scattered heart and star doodles, and floating hearts drifting around a single centered card that breathes with a slow sway.

## Color Palette

| Token      | OKLCH        | Role                                    |
| ---------- | ------------ | --------------------------------------- |
| background | 0.985 0.014 96 | Cream paper scene (#FDFCF0)           |
| foreground | 0.315 0.028 42 | Dark brown ink text (#3A2E2A)         |
| card       | 0.995 0.008 98 | Card stock, warm off-white            |
| primary    | 0.795 0.085 5  | Soft pink — ribbon + title lettering  |
| accent     | 0.665 0.145 8  | Deeper rose for emphasis ("BONITO")   |
| secondary  | 0.545 0.095 58 | Kraft brown paper wrap (#8B5A2B)      |
| muted      | 0.955 0.018 92 | Pale paper tint for doodle zones      |

Botanical extras: `--tulip` 0.865 0.155 92 (tulip yellow), `--leaf` 0.565 0.135 138 (leaf green), `--paper-wrap` 0.545 0.095 58, `--ribbon` 0.795 0.085 5, `--ink` 0.315 0.028 42.

## Typography

- Display: Nunito — rounded, soft, friendly; titles, headings, buttons, all UI labels
- Body: Nunito — the message text and credit line, sized large for a hand-lettered feel
- Accent: Fraunces (`font-ink`) — organic serif for the ink message block; Instrument Serif italic (`font-script`) for the emphasis word and signature
- Scale: hero `text-5xl md:text-7xl font-extrabold tracking-tight`, h2 `text-3xl md:text-5xl font-bold`, label `text-xs font-semibold tracking-[0.2em] uppercase`, body `text-lg md:text-xl`

## Elevation & Depth

Flat cream paper with one elevated object: the card sits on `shadow-card`, lifting to `shadow-lift` on hover; all shadows are warm brown-tinted and wide-soft, never grey or harsh.

## Structural Zones

| Zone    | Background                        | Border              | Notes                                              |
| ------- | --------------------------------- | ------------------- | -------------------------------------------------- |
| Scene   | `bg-paper` + `.paper-grain` specks | —                  | Full viewport, cream, faint confetti texture        |
| Doodles | transparent                       | —                   | Scattered hearts/stars, low opacity, `animate-float` |
| Card    | `bg-card` + `--gradient-paper`    | none (borderless)   | Portrait, `rounded-[var(--radius)]`, `shadow-card`  |
| Actions | transparent                       | —                   | Share button below card, pink, pill-shaped          |

## Spacing & Rhythm

Scene padding `p-4 sm:p-8`; card internal padding `p-7 sm:p-10`; vertical rhythm inside the card is generous (title → bouquet → message → credit) with `gap-6`/`gap-8`; doodles bleed to the viewport edges.

## Component Patterns

- Buttons: pill (`rounded-full`), `bg-primary` with `text-primary-foreground`, hover lifts to `shadow-lift` + slight `scale-[1.03]`, `transition-smooth`
- Cards: portrait, `rounded-[1.75rem]`, `bg-card`, warm `shadow-card`, no border or frame, max-width ~`26rem`
- Badges: small pill chips in `bg-muted` with `text-muted-foreground`, used for the share confirmation

## Motion

- Entrance: card `animate-pop-in` (fade + scale 0.86→1 + rise), inner elements stagger with `animate-rise-in` at 80–120ms increments
- Hover: card lifts to `shadow-lift` and bouquet sways gently; button scales 1.03
- Decorative: hearts `animate-float` / `animate-float-slow`, bouquet `animate-sway`, all infinite and slow (6–9s); fully disabled under `prefers-reduced-motion: reduce`

## Constraints

- All visible text in Spanish; "BONITO" is the only emphasized word
- No frame or hard border around the card — cream margins only
- Never use raw hex/rgb or arbitrary color classes in components; semantic tokens only
- The bouquet must be drawn as inline SVG (tulips, kraft cone with fold lines, ribbon bow with two loops and two tails)

## Signature Detail

The bouquet is a hand-drawn inline SVG whose tulips sway and whose ribbon tails drift, while loose hearts float across the cream paper — a living sketchbook page rather than a rendered card.
