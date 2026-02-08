# Dark Agent Design System

A design system for dark-mode mobile interfaces, extracted from real-world property listing UI patterns. Optimized for iPhone Safari, 430px max-width.

---

## 1. Design Tokens

### Backgrounds

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#0b0f14` | Page background, sticky bars |
| `--bg-card` | `#1a1e25` | Card surfaces, inputs |
| `--bg-card-elevated` | `#242930` | Nested elements inside cards (info banners, tab tracks, tag fills) |

**Rule:** Max 3 background layers. Primary → Card → Elevated. Never stack deeper.

### Text

| Token | Value | Use |
|---|---|---|
| `--text-primary` | `#ffffff` | Headlines, card titles, key values |
| `--text-secondary` | `#a0a4ab` | Body copy, descriptions, specs |
| `--text-tertiary` | `#6b7078` | Labels, captions, metadata, dates |
| `--text-inverse` | `#0b0f14` | Text on filled buttons |

**Rule:** Primary for emphasis only. Most body text is secondary. Labels and fine print are tertiary.

### Accents

| Token | Value | Tint (12% opacity) | Use |
|---|---|---|---|
| `--accent-blue` | `#5c9eff` | `rgba(92,158,255,0.12)` | Links, CTAs, active tabs, primary buttons |
| `--accent-teal` | `#3ecfb4` | `rgba(62,207,180,0.1)` | Success, money, positive trends, estimate pills |
| `--accent-orange` | `#ffc554` | `rgba(255,197,84,0.12)` | Warnings, warm urgency |
| `--accent-purple` | `#c084fc` | `rgba(192,132,252,0.12)` | Tertiary category (insurance, calls) |
| `--accent-red` | `#ff5c5c` | `rgba(255,92,92,0.12)` | Errors, required markers, hot urgency, negative trends |

**Rule:** Every accent has a **tint variant** at 10-12% opacity used for badge/tag backgrounds. The solid color is used for text/icons on top of the tint.

### Borders

| Token | Value | Use |
|---|---|---|
| `--border-subtle` | `rgba(255,255,255,0.08)` | Card borders, dividers, timeline rails |
| `--border-medium` | `rgba(255,255,255,0.14)` | Input borders, tag borders, elevated card outlines |

**Rule:** Subtle is default. Medium only for interactive elements or elements that need to be visually distinct from their container.

### Radii

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `0.5rem` (8px) | Badges, small tags, inner elements |
| `--radius-md` | `0.75rem` (12px) | Inputs, image thumbnails, info banners |
| `--radius-lg` | `1rem` (16px) | Cards, buttons, chips |
| `--radius-xl` | `1.25rem` (20px) | Section cards (large containers) |
| `--radius-pill` | `100px` | Pills, tabs, estimate strips, tags |

**Rule:** Larger containers get larger radii. Pill is reserved for elements that should feel like buttons or chips.

### Spacing

| Token | Value |
|---|---|
| `--space-xs` | `0.25rem` (4px) |
| `--space-sm` | `0.5rem` (8px) |
| `--space-md` | `0.75rem` (12px) |
| `--space-lg` | `1rem` (16px) |
| `--space-xl` | `1.25rem` (20px) |
| `--space-2xl` | `1.5rem` (24px) |
| `--space-3xl` | `2rem` (32px) |

**Rule:** Page horizontal padding is always `--space-xl`. Card internal padding is `--space-2xl`. Gaps between cards are `--space-lg`.

### Typography

| Token | Value | Use |
|---|---|---|
| `--text-xs` | `0.6875rem` (11px) | Badges, urgency tags, fine print, MLS IDs |
| `--text-sm` | `0.75rem` (12px) | Metadata, specs, sub-labels |
| `--text-base` | `0.875rem` (14px) | Body copy, form labels, row labels, links |
| `--text-md` | `0.9375rem` (15px) | Card titles (secondary), input text, addresses |
| `--text-lg` | `1.125rem` (18px) | Card titles (primary), prices in grids |
| `--text-xl` | `1.375rem` (22px) | Section card headings, stat values |
| `--text-2xl` | `1.75rem` (28px) | Feature values (payment amounts), greeting |
| `--text-3xl` | `2.25rem` (36px) | Hero price |

**Font weights:**
- `500` — Links, back buttons
- `600` — Secondary emphasis, dates, row values, tab labels
- `700` — Card titles, labels, badges, tags, buttons, links
- `800` — Headlines, prices, section headings, stat values

**Rule:** `800` is for the single most important number or title in a section. `700` is the workhorse weight. `600` is for supporting data. Never use `400` — minimum is `500`.

---

## 2. Component Catalog

### DA-01: HeroImage

**Use:** Full-bleed media header for detail views.

| Element | Spec |
|---|---|
| Container | `width: 100%`, `height: 280px`, `overflow: hidden` |
| Image | Fills container via `object-fit: cover` or gradient placeholder |
| Gradient overlay | `80px` bottom fade from `--bg-primary` to transparent |
| Action buttons | `36px` circle, `rgba(0,0,0,0.5)` bg, `blur(8px)`, icon `18px` |
| Layout | Close button left, action group (heart, share, edit, more) right |
| Safe area | Respects `env(safe-area-inset-top)` |

**Typography:** None — visual only.

---

### DA-02: PriceHeader

**Use:** Primary property info block below hero.

| Element | Token | Weight |
|---|---|---|
| Price | `--text-3xl` | `800` |
| Spec items (beds/baths/sqft) | `--text-base`, `--text-secondary` | — |
| Spec icons | `16px`, `--text-tertiary` | — |
| Address | `--text-md`, `--text-secondary` | — |

**Sub-component: EstimatePill**
- Shape: `--radius-pill`
- Background: `--accent-teal-bg` with `1px solid rgba(62,207,180,0.25)` border
- Padding: `--space-md` / `--space-xl`
- Left: label + bold value (`--text-primary`, `700`)
- Right: link (`--accent-teal`, `700`)

---

### DA-03: SectionCard

**Use:** Primary content container for grouped information.

| Spec | Value |
|---|---|
| Background | `--bg-card` |
| Radius | `--radius-xl` |
| Padding | `--space-2xl` |
| Margin | `0 --space-lg --space-lg` (horizontal page margin + bottom gap) |
| Title | `--text-xl`, `800`, margin-bottom `--space-2xl` |

**Rule:** SectionCard always has a title. Never nest SectionCards inside each other.

---

### DA-04: FactsGrid

**Use:** Key-value pairs with icons, displayed in a 2-column layout.

| Element | Spec |
|---|---|
| Grid | `grid-template-columns: 1fr 1fr`, gap `--space-2xl` |
| Icon | `28px` container, `22px` SVG, `--text-tertiary` |
| Value | `--text-base`, `--text-primary`, `line-height: 1.35` |
| Sub-label | `--text-sm`, `--text-tertiary` |
| Show more link | `--text-base`, `--accent-blue`, `600`, chevron `16px` |

**Rule:** Icons are monochrome tertiary. Each item is `flex` with `align-items: flex-start`.

---

### DA-05: TagCloud

**Use:** Feature highlights, keywords, property amenities.

| Element | Spec |
|---|---|
| Container | `flex-wrap: wrap`, gap `--space-sm` |
| Tag | `--bg-card-elevated`, `1px --border-medium`, `--radius-pill` |
| Tag text | `--text-xs`, `700`, `uppercase`, `letter-spacing: 0.04em` |
| Tag padding | `0.4em 0.85em` |
| Overflow tag | Same shape, `--text-tertiary` color (e.g. "+2 More") |

---

### DA-06: EventCard (Horizontal Scroll)

**Use:** Date-based events in a horizontal scrollable strip.

| Element | Spec |
|---|---|
| Scroll container | `flex`, `overflow-x: auto`, `-webkit-overflow-scrolling: touch`, `scroll-snap-type: x mandatory` |
| Card | `min-width: 180px`, `--bg-card`, `1px --border-medium`, `--radius-lg`, padding `--space-xl` |
| Title (date) | `--text-lg`, `700` |
| Subtitle (time) | `--text-base`, `--text-secondary` |
| Action link | `--text-base`, `--accent-blue`, `600` |

**Rule:** Always hide scrollbar (`::-webkit-scrollbar { display: none }`). Each card snaps.

---

### DA-07: PaymentBreakdown

**Use:** Financial breakdown with proportional visual bar.

| Element | Spec |
|---|---|
| Eyebrow | `--text-base`, `--text-secondary` |
| Info icon | `18px` circle, `1.5px --text-tertiary` border |
| Amount | `--text-2xl`, `800` |
| Row | `flex justify-content: space-between`, padding `--space-sm 0` |
| Row label | `--text-base`, `--text-secondary`, with `10px` color dot |
| Row value | `--text-base`, `--text-primary`, `600` |
| Bar | `height: 8px`, `radius: 4px`, `flex` proportional segments, `2px` gap |
| Bar colors | Teal (principal), Blue (tax), Purple (insurance) |
| Customize link | `--text-base`, `--accent-blue`, `600`, chevron |

---

### DA-08: PillSelector

**Use:** Single-select option group (offer strength, filter modes).

| Element | Spec |
|---|---|
| Container | `flex`, gap `--space-sm` |
| Pill (default) | `--radius-pill`, `1.5px --border-medium`, transparent bg, `--text-primary` |
| Pill (active) | `--text-primary` bg, `--text-inverse` text, border matches bg |
| Pill text | `--text-base`, `700` |
| Padding | `0.45em 1em` |

**Interaction:** `transition: all 0.15s ease`. Only one pill active at a time.

---

### DA-09: TabToggle

**Use:** Binary content switcher (price/tax history).

| Element | Spec |
|---|---|
| Track | `--bg-card-elevated`, `--radius-pill`, `3px` padding |
| Tab (default) | `--text-base`, `600`, `--text-secondary`, transparent bg |
| Tab (active) | `--accent-blue` bg, `--text-primary`, `--radius-pill` |
| Tab padding | `0.5em 0` |

**Rule:** Always exactly 2 tabs. Each `flex: 1`.

---

### DA-10: DataTable

**Use:** Date/event/value rows for history or transaction data.

| Element | Spec |
|---|---|
| Row | `grid-template-columns: 1fr 1fr 1fr`, padding `--space-lg 0` |
| Divider | `1px --divider` bottom border (none on last row) |
| Date column | `--text-base`, `600` |
| Event column | `--text-base`, `--text-secondary` |
| Value column | `--text-base`, `600`, `text-align: right` |

---

### DA-11: PropertyCard

**Use:** Listing preview in a 2-column grid.

| Element | Spec |
|---|---|
| Grid | `grid-template-columns: 1fr 1fr`, gap `--space-lg` |
| Image | `aspect-ratio: 4/3`, `--radius-md` |
| Favorite button | `32px` circle, `rgba(0,0,0,0.35)` + `blur(4px)`, top-right |
| Badge (optional) | `rgba(0,0,0,0.6)` + `blur(4px)`, `--radius-sm`, top-left |
| Price | `--text-lg`, `800`, `--accent-blue` |
| Fees | `--text-xs`, `--text-tertiary` |
| Specs | `--text-sm`, `--text-secondary` |
| Address | `--text-sm`, `--text-secondary`, `line-height: 1.3` |
| Status | `--text-sm`, `600`, `--text-primary` |
| MLS fine print | `0.625rem`, `--text-tertiary` |

---

### DA-12: ContactForm

**Use:** Lead capture / inquiry form.

| Element | Spec |
|---|---|
| Info banner | `--bg-card-elevated`, `--radius-md`, `--space-lg` padding |
| Info icon | `24px` circle, `1.5px --text-tertiary` border |
| Info text | `--text-base`, `--text-secondary` |
| Label | `--text-base`, `700`, margin-bottom `--space-sm` |
| Required marker | `--color-error` |
| Input | `--bg-input`, `1.5px --bg-input-border`, `--radius-md` |
| Input text | `--text-md`, `--text-primary` |
| Input padding | `--space-lg` |
| Placeholder | `--text-tertiary` |
| Focus state | `border-color: --accent-blue` |
| Textarea | Same as input + `resize: vertical`, `min-height: 100px` |

---

### DA-13: StickyBottomBar

**Use:** Persistent CTA bar fixed to bottom of screen.

| Element | Spec |
|---|---|
| Container | `fixed bottom`, `--bg-primary`, `1px --border-subtle` top |
| Padding | `--space-md` sides, `env(safe-area-inset-bottom)` bottom |
| Layout | `flex`, gap `--space-md` |
| Outline button | `1.5px --accent-blue` border, transparent bg, `--accent-blue` text |
| Primary button | `--accent-blue` bg, `--text-inverse` text, `flex: 1` |
| Button text | `--text-md`, `700` |
| Button subtitle | `--text-xs`, `500`, `opacity: 0.8` |
| Button radius | `--radius-lg` |
| Button padding | `0.85em 1.25em` |

---

### DA-14: CircleActionButton

**Use:** Floating icon buttons over images (hero, favorites).

| Variant | Size | Background |
|---|---|---|
| Hero action | `36px` | `rgba(0,0,0,0.5)` + `blur(8px)` |
| Card favorite | `32px` | `rgba(0,0,0,0.35)` + `blur(4px)` |

**Icon:** White, stroke-width 2, centered.
**Interaction:** `-webkit-tap-highlight-color: transparent`.

---

### DA-15: ShowMoreLink

**Use:** Inline expand trigger at the bottom of truncated content.

| Element | Spec |
|---|---|
| Text | `--text-base`, `--accent-blue`, `600` |
| Chevron | `16px`, same color |
| Layout | `inline-flex`, `align-items: center`, gap `0.25rem` |
| Margin | `margin-top: --space-2xl` |

---

## 3. Layout Rules

1. **Max width:** `430px` centered. Matches iPhone Pro viewport.
2. **Page padding:** `--space-xl` (20px) horizontal.
3. **SectionCard margin:** Uses its own `--space-lg` horizontal margin (separate from page padding).
4. **Section spacing:** `--space-2xl` (24px) between major sections.
5. **Scroll containers:** Bleed to edges. Horizontal padding on items, not container.
6. **Sticky bar:** Always reserves `env(safe-area-inset-bottom)` for home indicator.

## 4. Interaction Patterns

- **Tap feedback:** `:active { opacity: 0.7 }` on buttons/links.
- **Transitions:** `all 0.15s ease` on interactive state changes.
- **Scroll snap:** `scroll-snap-type: x mandatory` on horizontal scrolls, `scroll-snap-align: start` on items.
- **No hover states:** Touch-first. Skip `@media (hover: hover)` blocks.
- **Focus:** Inputs get `border-color: --accent-blue` on focus.
- **Pill/tab toggle:** JS class swap, not CSS-only. One active at a time.

## 5. Image Placeholders

When real images aren't available, use CSS gradient stand-ins:

```css
.img-placeholder-1 { background: linear-gradient(135deg, #5a7a52, #8a9a7e); }
.img-placeholder-2 { background: linear-gradient(135deg, #7a8a6e, #bac4a8); }
.img-placeholder-3 { background: linear-gradient(135deg, #6b7a60, #a4b89a); }
.img-placeholder-4 { background: linear-gradient(135deg, #8e7c6a, #c4b8a4); }
.img-placeholder-5 { background: linear-gradient(135deg, #5c6f7a, #8ea8b8); }
.img-placeholder-6 { background: linear-gradient(135deg, #7a6a5c, #b4a494); }
```

Muted, organic tones. No saturated colors. Gradients at 135deg.

---

*Dark Agent Design System v1.0 — Feb 2026*
