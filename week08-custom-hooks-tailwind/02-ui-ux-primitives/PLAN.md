# 02 — UI/UX Primitives

## Why a Dev Needs to Know This

You don't need to be a designer. But you need to know enough to:
- Build UIs that don't look amateur
- Understand what a designer is asking for
- Not need a designer for every small component
- Know WHY something looks bad and how to fix it

This module is theory + checklist. Take notes in `design-notes.md` as you go.

---

## Primitive 1: Spacing System

**The rule:** Never pick spacing values randomly. Use a base-8 (or base-4) scale.

```
Base unit: 4px

Scale:
  4px   (1 unit)   — tight spacing, icon padding
  8px   (2 units)  — small gaps, input padding
  12px  (3 units)  — compact component padding
  16px  (4 units)  — standard padding (most common)
  24px  (6 units)  — section gap, card padding
  32px  (8 units)  — large gaps between sections
  48px  (12 units) — hero sections, page padding
  64px  (16 units) — very large separations
```

**Why this matters:** Consistent spacing makes UI feel intentional. Random spacing feels cheap.

**Tailwind connection:** Tailwind's spacing scale IS this system. `p-4` = 16px, `p-6` = 24px, `gap-8` = 32px.

**Exercise:** Open any website you admire (Linear, Vercel, Stripe). Inspect their spacing. You'll see multiples of 4 everywhere.

---

## Primitive 2: Typography Scale

**The rule:** Use a modular scale — each size is a ratio larger than the previous.

```
Common scale (use these, don't invent new ones):

  xs   — 12px  — captions, labels, badges
  sm   — 14px  — secondary text, helper text
  base — 16px  — body text (NEVER go below 16px for body)
  lg   — 18px  — slightly emphasized text
  xl   — 20px  — card titles, small headings
  2xl  — 24px  — section headings
  3xl  — 30px  — page sub-headings
  4xl  — 36px  — major headings
  5xl  — 48px  — hero text
```

**Font weight rules:**
- Regular (400) — body text
- Medium (500) — labels, nav items
- Semibold (600) — card titles, buttons
- Bold (700) — page headings, CTAs

**Line height rules:**
- Headings: line-height 1.1–1.3 (tight)
- Body text: line-height 1.5–1.7 (loose, for readability)
- UI elements (buttons, labels): line-height 1.0–1.25

**Exercise:** Pick one of your existing React projects. Fix all the font sizes to follow this scale. Notice how much more professional it looks.

---

## Primitive 3: Color Theory

### The 60-30-10 Rule

```
60% — Dominant/Background color  (usually neutral: white, gray, near-black)
30% — Secondary color             (surface color: light gray, dark gray)
10% — Accent color                (your brand color: blue, violet, green)
```

**Example (dark theme):**
```
60% — #0f172a  (dark navy background)
30% — #1e293b  (card/surface background)
10% — #6366f1  (indigo accent for buttons, links, highlights)
```

### Color Roles (for UI specifically)

| Role | Purpose | Example |
|------|---------|---------|
| **Background** | Page base | #ffffff / #0f172a |
| **Surface** | Cards, panels | #f8fafc / #1e293b |
| **Border** | Dividers, outlines | #e2e8f0 / #334155 |
| **Text Primary** | Main content | #0f172a / #f1f5f9 |
| **Text Secondary** | Descriptions, meta | #64748b / #94a3b8 |
| **Accent/Primary** | Buttons, links, focus | #6366f1 |
| **Success** | Success states | #22c55e |
| **Warning** | Warning states | #f59e0b |
| **Error** | Error states | #ef4444 |

### Contrast Rule (Accessibility)

- Normal text on background: minimum **4.5:1** contrast ratio
- Large text / UI components: minimum **3:1** contrast ratio
- **Never** put light gray text on white background — it fails contrast

**Tool:** Use `https://webaim.org/resources/contrastchecker/` to verify your color combos.

---

## Primitive 4: Visual Hierarchy

**The rule:** The user's eye should move through your page in a clear order. Control this through:

1. **Size** — bigger = more important
2. **Weight** — bolder = more important
3. **Color** — higher contrast = more important
4. **Position** — top-left gets attention first (F-pattern reading)
5. **Space** — more surrounding space = more importance

**Example: A card component**

```
BAD:
  Title       (16px, regular)
  Description (16px, regular)
  Price       (16px, regular)
  Button      (16px, regular)
  → Everything looks the same. User doesn't know what to look at.

GOOD:
  Title       (20px, semibold, dark)       ← primary attention
  Description (14px, regular, gray)        ← secondary
  Price       (24px, bold, accent color)   ← draws eye back
  Button      (14px, semibold, filled)     ← clear CTA
  → Clear hierarchy. Eye flows naturally.
```

**Exercise:** Take your Todo app and fix the card hierarchy. Title should be most prominent. Done state should be visually de-emphasized (lighter, strikethrough).

---

## Primitive 5: White Space

**The rule:** When in doubt, add more space. Cramped UI feels cheap. Spacious UI feels premium.

**Common mistakes:**
- Padding too small (p-1, p-2 on cards) — always use at least p-4 (16px) for cards
- Items too close together — cards and list items need breathing room
- Full-width text blocks — long lines of text are hard to read; cap at ~65 characters (max-w-prose in Tailwind)
- No gap between sections — use at least 48px between major sections

**The "squint test":** Squint at your UI so it blurs. Can you still tell what the main content is? If not, hierarchy and spacing are wrong.

---

## Primitive 6: Consistency

**The rule:** Every similar element must look and behave the same way.

Checklist:
- [ ] All primary buttons look the same (same color, same padding, same border-radius)
- [ ] All secondary buttons look the same
- [ ] All error messages appear in the same location and color
- [ ] All inputs have the same height and padding
- [ ] Border-radius is consistent (don't mix sharp and very round corners)
- [ ] Icon sizes are consistent (don't mix 16px and 20px icons in same context)

**Why this matters:** Inconsistency makes the UI feel handmade in a bad way. Consistency is what separates a "built by a developer" UI from a polished product.

---

## Primitive 7: Feedback & States

Every interactive element needs **states**. Users need to know when something is happening.

### Required States for Buttons

```
Default   — normal appearance
Hover     — slightly lighter/darker, cursor: pointer
Active    — slightly pressed (scale down or darker)
Disabled  — reduced opacity (0.5), cursor: not-allowed
Loading   — spinner or "..." inside button, disabled interaction
```

### Required States for Inputs

```
Default   — base border color
Focus     — highlight border (accent color ring), no outline bug
Error     — red border + error message below
Disabled  — gray background, reduced opacity
```

### Required States for Async Operations

```
Loading   — skeleton or spinner (never just blank)
Empty     — empty state illustration/message (never just blank)
Error     — error message with retry option
Success   — success confirmation
```

**Exercise:** Go through your existing projects. Find every button and input. Add all missing states.

---

## Primitive 8: Layout Patterns

### The Most Common Layouts You'll Build

**1. Centered content layout**
```
Max-width container + horizontal auto margin
Used for: landing pages, auth pages, blog posts
Tailwind: max-w-4xl mx-auto px-6
```

**2. Sidebar + main layout**
```
Flex row: fixed-width sidebar + flex-1 main area
Used for: dashboards, admin panels, settings pages
Tailwind: flex h-screen → w-64 sidebar + flex-1 main
```

**3. Card grid layout**
```
Responsive grid that adapts columns to screen size
Used for: product listings, blog posts, user galleries
Tailwind: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
```

**4. Sticky header + scrollable content**
```
Fixed top nav + main content below
Used for: almost every app
Tailwind: fixed top-0 inset-x-0 z-50 → pt-16 on main content
```

---

## Components to Analyze

Go to these sites and inspect their design decisions:

1. **Linear** (linear.app) — spacing, typography, dark theme
2. **Vercel** (vercel.com) — card design, color hierarchy
3. **Stripe** (stripe.com) — visual hierarchy, CTA placement
4. **Tailwind UI** (tailwindui.com) — how Tailwind implements these primitives

For each: note the spacing, color palette, type scale, and how states are handled.

---

## Design Notes Template

As you study these sites, fill in `design-notes.md` using this template:

```markdown
## Site: [Name]

### Spacing
- Body padding: 
- Card padding:
- Section gap:

### Typography
- Body font:
- Heading size/weight:
- Secondary text color:

### Colors
- Background: 
- Surface: 
- Accent: 

### What I Learned
- 
```

---

## Checklist — Mark Off As You Complete

- [ ] Read Primitive 1 (Spacing) + opened a site and inspected spacing
- [ ] Read Primitive 2 (Typography) + fixed type scale in an existing project
- [ ] Read Primitive 3 (Color) + built a color palette for your dashboard project
- [ ] Read Primitive 4 (Visual Hierarchy) + fixed one existing component
- [ ] Read Primitive 5 (White Space) + applied "squint test" to a project
- [ ] Read Primitive 6 (Consistency) + audited one project for inconsistencies
- [ ] Read Primitive 7 (States) + added all states to one component
- [ ] Read Primitive 8 (Layouts) + sketched layout for final project
- [ ] Analyzed 2+ real sites and filled design-notes.md
