# 03 — Tailwind CSS

A complete reference for learning Tailwind CSS utility-first styling, with 10 production components and a full Dev Dashboard capstone project.

---

## What Is Tailwind CSS?

Tailwind is a **utility-first CSS framework**. You style elements by composing small, single-purpose classes directly in your JSX — instead of writing separate CSS files.

```jsx
// Old way — you write CSS, then use it
// styles.css
.card { padding: 16px; border-radius: 8px; background: white; box-shadow: ... }

// JSX
<div className="card">...</div>

// Tailwind way — style inline, no CSS file needed
<div className="p-4 rounded-lg bg-white shadow-sm">...</div>
```

**Why utility-first wins in React:**
- No context switching between `.jsx` and `.css` files
- No naming classes (the hardest part of CSS)
- No specificity conflicts
- Dead code eliminated automatically (unused classes are purged in production build)
- The spacing/color system from UI/UX primitives is enforced by default

---

## Connection to Previous Modules

| Module | What You Learned | How It Connects to Tailwind |
|--------|-----------------|----------------------------|
| 01 — Custom Hooks | `useToggle`, `useLocalStorage`, `useDebounce`, `useFetch` | Dark mode toggle, persisted theme, debounced search, data fetching |
| 02 — UI/UX Primitives | Spacing system, type scale, 60-30-10 color rule, states | Tailwind's `p-4`, `text-xl`, `bg-blue-600` ARE these primitives |
| 03 — Tailwind CSS | Utility classes, components, dark mode, responsive design | Puts everything together into a real component library |

**Key insight:** Tailwind's spacing scale is literally the base-4 system from Primitive 1.
`p-4` = 16px, `p-6` = 24px, `gap-8` = 32px. You already know the system.

---

## Setup (Vite + React + Tailwind v3)

```bash
# 1. Create project
npm create vite@latest tailwind-playground -- --template react
cd tailwind-playground
npm install

# 2. Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Install routing
npm install react-router-dom
```

**`tailwind.config.js`** (replace generated content):
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',   // class-based dark mode — add/remove 'dark' on <html>
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
}
```

**`src/index.css`** (replace everything):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
}
```

---

## Core Concepts

### 1. Spacing System

Tailwind's scale = the base-4 system from UI/UX Primitives module:

| Class | Value | Use |
|-------|-------|-----|
| `p-1` | 4px | Tight icon padding |
| `p-2` | 8px | Small gaps |
| `p-4` | 16px | Standard padding ← most used |
| `p-5` | 20px | Card padding |
| `p-6` | 24px | Generous card padding |
| `p-8` | 32px | Section spacing |
| `p-12` | 48px | Hero sections |
| `p-16` | 64px | Large separations |

**Directional variants:**
```
px-4   = left + right       py-4   = top + bottom
pt-4   = top only           pb-4   = bottom only
pl-4   = left only          pr-4   = right only
mt-4   = margin top         mb-4   = margin bottom
mx-auto = center horizontally (auto left + right margin)
gap-4  = gap in flex/grid   space-y-4 = vertical spacing between children
```

---

### 2. Flexbox

```jsx
// Row (default) — items side by side
<div className="flex items-center gap-4">

// Space between items
<div className="flex items-center justify-between">

// Column — items stacked
<div className="flex flex-col gap-3">

// Center everything (perfect centering)
<div className="flex items-center justify-center min-h-screen">

// Wrapping (items wrap to next line)
<div className="flex flex-wrap gap-2">

// One item grows to fill space
<div className="flex">
  <div className="w-64">Sidebar</div>
  <div className="flex-1">Main content grows</div>
</div>
```

---

### 3. Grid

```jsx
// Responsive card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Fixed columns
<div className="grid grid-cols-4 gap-4">

// 2-column layout
<div className="grid grid-cols-3 gap-6">
  <div className="col-span-1">Sidebar</div>
  <div className="col-span-2">Main</div>
</div>

// Auto-fit (fills available space with min 200px items)
<div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
```

---

### 4. Typography

```jsx
// Sizes (matches the type scale from Primitive 2)
<p className="text-xs">12px — captions, labels</p>
<p className="text-sm">14px — secondary text</p>
<p className="text-base">16px — body text (never go smaller for body)</p>
<p className="text-lg">18px — slightly emphasized</p>
<h3 className="text-xl">20px — card titles</h3>
<h2 className="text-2xl">24px — section headings</h2>
<h1 className="text-4xl">36px — page headings</h1>
<h1 className="text-5xl">48px — hero text</h1>

// Weight
<p className="font-normal">400 — body</p>
<p className="font-medium">500 — labels, nav</p>
<p className="font-semibold">600 — card titles, buttons</p>
<p className="font-bold">700 — headings, CTAs</p>

// Color
<p className="text-gray-900">Primary — darkest readable</p>
<p className="text-gray-500">Secondary — descriptions</p>
<p className="text-gray-400">Muted — timestamps, captions</p>
<p className="text-blue-600">Accent — links, highlighted</p>
<p className="text-red-500">Error</p>
<p className="text-green-600">Success</p>

// Line height
<p className="leading-tight">1.25 — headings</p>
<p className="leading-relaxed">1.625 — body paragraphs (more readable)</p>
<p className="leading-snug">1.375 — in between</p>

// Overflow control
<p className="truncate">Single line, cut off with ellipsis...</p>
<p className="line-clamp-2">Maximum 2 lines, then ellipsis</p>
<p className="break-words">Break long words that overflow</p>
```

---

### 5. Colors & Backgrounds

Tailwind's color scale: **50** (lightest tint) → **950** (darkest shade).

```jsx
// Backgrounds
<div className="bg-white">Pure white</div>
<div className="bg-gray-50">Off-white surface</div>
<div className="bg-gray-100">Light gray</div>
<div className="bg-slate-800">Dark surface</div>
<div className="bg-slate-900">Very dark</div>
<div className="bg-blue-500">Accent</div>
<div className="bg-blue-600">Darker accent</div>
<div className="bg-black/50">Black with 50% opacity</div>

// Borders
<div className="border border-gray-200">Light border</div>
<div className="border border-gray-300">Standard border</div>
<div className="border-2 border-blue-500">Thick accent border</div>
<div className="divide-y divide-gray-100">Dividers between children</div>
```

**The 60-30-10 rule in Tailwind classes (from Primitive 3):**
```
60% bg-white / dark:bg-slate-900       ← page background
30% bg-gray-50 / dark:bg-slate-800    ← cards, panels
10% text-blue-600 / bg-blue-500       ← accent, buttons, links
```

---

### 6. Border Radius

```jsx
<div className="rounded">4px — barely rounded</div>
<div className="rounded-md">6px — standard</div>
<div className="rounded-lg">8px — cards</div>
<div className="rounded-xl">12px — modern cards</div>
<div className="rounded-2xl">16px — large cards, modals</div>
<div className="rounded-full">9999px — pills, avatars, tags</div>
```

**Rule of thumb:** Use `rounded-lg` for inputs and small elements, `rounded-xl` for cards, `rounded-2xl` for modals/panels, `rounded-full` for badges and avatars.

---

### 7. Shadows

```jsx
<div className="shadow-sm">Subtle — for cards in light mode</div>
<div className="shadow">Standard</div>
<div className="shadow-md">Medium — hover state for cards</div>
<div className="shadow-lg">Large — dropdowns, popovers</div>
<div className="shadow-xl">Extra large — modals</div>
<div className="shadow-none">Remove shadow</div>

// Shadow on hover
<div className="shadow-sm hover:shadow-md transition-shadow duration-200">
  Card that lifts on hover
</div>
```

---

### 8. Interactive States

```jsx
// Hover
<button className="bg-blue-600 hover:bg-blue-700 text-white">

// Focus (for accessibility — never remove outline without replacing it)
<input className="border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

// Active (pressed state)
<button className="active:scale-95 transition-transform">Feels clickable</button>

// Disabled
<button className="disabled:opacity-50 disabled:cursor-not-allowed" disabled>

// Group hover (hover a parent to style children)
<div className="group hover:bg-gray-50">
  <p className="text-gray-400 group-hover:text-gray-900 transition-colors">
    Styled by parent hover
  </p>
</div>
```

---

### 9. Responsive Design

Tailwind is **mobile-first**. No prefix = mobile. Prefix = applies from that breakpoint AND UP.

```
sm:   640px+   (large phone / small tablet)
md:   768px+   (tablet)
lg:   1024px+  (laptop)
xl:   1280px+  (desktop)
2xl:  1536px+  (wide screen)
```

```jsx
// Grid: 1 col → 2 col → 3 col
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Text grows at breakpoints
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">

// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile only</div>

// Padding increases with screen size
<div className="px-4 md:px-8 lg:px-16">

// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
```

---

### 10. Dark Mode

Set `darkMode: 'class'` in `tailwind.config.js`. Dark mode activates when the `<html>` (or any ancestor) has class `dark`.

```jsx
// Toggle dark mode by adding/removing 'dark' from <html>
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark)
}, [isDark])

// Components respond automatically with dark: prefix
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
  <p className="text-gray-500 dark:text-slate-400">Secondary text</p>
  <div className="border-gray-200 dark:border-slate-700 border">
    Card border
  </div>
</div>
```

**Dark mode pairs to memorize:**
```
bg-white          ↔   dark:bg-slate-900    (page background)
bg-gray-50        ↔   dark:bg-slate-800    (card background)
bg-gray-100       ↔   dark:bg-slate-700    (subtle surface)
text-gray-900     ↔   dark:text-slate-100  (primary text)
text-gray-500     ↔   dark:text-slate-400  (secondary text)
text-gray-400     ↔   dark:text-slate-500  (muted text)
border-gray-200   ↔   dark:border-slate-700 (borders)
border-gray-100   ↔   dark:border-slate-800 (subtle borders)
```

**Persist dark mode with hooks from module 01:**
```jsx
// App.jsx
const [isDark, setIsDark] = useLocalStorage('theme-dark', false)

useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark)
}, [isDark])
```

---

### 11. Transitions & Animations

```jsx
// Smooth color change
<button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200">

// Smooth everything
<div className="transition-all duration-300 ease-in-out">

// Scale on hover (lift effect)
<div className="hover:scale-105 transition-transform duration-200">

// Press effect on click
<button className="active:scale-95 transition-transform">

// Fade in (needs custom keyframe in tailwind.config.js)
<div className="animate-fade-in">Appears smoothly</div>

// Built-in animations
<div className="animate-spin">    Rotating (loading icons)</div>
<div className="animate-pulse">   Pulsing (skeleton loading)</div>
<div className="animate-bounce">  Bouncing</div>
<div className="animate-ping">    Ping effect (notification dots)</div>
```

---

### 12. Positioning & Layout

```jsx
// Sticky nav bar
<nav className="sticky top-0 z-40 bg-white border-b">

// Fixed bottom corner (toast notifications)
<div className="fixed bottom-4 right-4 z-50">

// Full-screen overlay (modal backdrop)
<div className="fixed inset-0 bg-black/50">

// Center in overlay
<div className="fixed inset-0 flex items-center justify-center">

// Absolute positioned badge on a card
<div className="relative">
  <img ... />
  <span className="absolute top-2 right-2 ...">New</span>
</div>

// Z-index layers (use sparingly, stick to these)
// z-10  — dropdowns
// z-40  — navbar
// z-50  — modals, toasts
```

---

## The 10 Components

All live in `tailwind-playground/src/components/`. These cover 90% of what real production apps need.

---

### 1. Button

**File:** [tailwind-playground/src/components/Button.jsx](tailwind-playground/src/components/Button.jsx)

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`  
Sizes: `sm`, `md`, `lg`  
States: default, hover (`hover:`), active (`active:scale-95`), disabled (`disabled:opacity-50`), loading (spinner)

```jsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

**Key Tailwind patterns:**
- `active:scale-95 transition-transform` — micro press animation
- `disabled:opacity-50 disabled:cursor-not-allowed` — disabled state in one line
- `focus:ring-2 focus:ring-offset-2` — accessibility focus ring

---

### 2. Input

**File:** [tailwind-playground/src/components/Input.jsx](tailwind-playground/src/components/Input.jsx)

```jsx
<Input label="Email" placeholder="you@example.com" />
<Input label="Name" error="Name is required" />
<Input label="Bio" helperText="Max 160 characters" />
<Input disabled placeholder="Can't type here" />
```

**Key Tailwind patterns:**
- `focus:ring-2 focus:ring-blue-100 focus:border-blue-500` — custom focus ring
- `border-red-400 focus:ring-red-200` — error state ring color changes
- `disabled:bg-gray-50 disabled:cursor-not-allowed` — disabled style

---

### 3. Badge

**File:** [tailwind-playground/src/components/Badge.jsx](tailwind-playground/src/components/Badge.jsx)

```jsx
<Badge>Default</Badge>
<Badge variant="blue">New</Badge>
<Badge variant="green">Active</Badge>
<Badge variant="red">Error</Badge>
<Badge variant="yellow">Warning</Badge>
<Badge variant="purple">Premium</Badge>
```

**Key Tailwind pattern:** `rounded-full px-2.5 py-0.5 text-xs font-medium` — pill badge

---

### 4. Card

**File:** [tailwind-playground/src/components/Card.jsx](tailwind-playground/src/components/Card.jsx)

```jsx
<Card title="Article Title" description="Description text..." />
<Card title="With image" image="/photo.jpg" badge="New" badgeVariant="blue" />
<Card
  title="With footer"
  footer={<Button size="sm">Read more</Button>}
/>
```

**Key Tailwind patterns:**
- `hover:shadow-md transition-shadow duration-200` — card lift effect
- `overflow-hidden` — so image fills top without breaking rounded corners
- `line-clamp-2` — limits description to 2 lines

---

### 5. Skeleton

**File:** [tailwind-playground/src/components/Skeleton.jsx](tailwind-playground/src/components/Skeleton.jsx)

Use instead of spinners during loading. Shows the shape of content before it loads.

```jsx
<SkeletonCard />        // rectangular card skeleton
<SkeletonText lines={3} />  // paragraph skeleton
<SkeletonAvatar />     // circle avatar skeleton
<SkeletonUserCard />   // avatar + text lines
```

**Key Tailwind pattern:** `animate-pulse bg-gray-200` — pulsing gray placeholder

---

### 6. Modal

**File:** [tailwind-playground/src/components/Modal.jsx](tailwind-playground/src/components/Modal.jsx)

Uses `useClickOutside` from module 01. Closes on Escape key and outside click. Locks body scroll when open.

```jsx
const [isOpen, toggle] = useToggle(false)

<Button onClick={toggle}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={toggle} title="Confirm action"
  footer={
    <>
      <Button variant="ghost" onClick={toggle}>Cancel</Button>
      <Button variant="danger" onClick={handleConfirm}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

**Key Tailwind patterns:**
- `fixed inset-0 bg-black/50 backdrop-blur-sm` — dimmed overlay
- `fixed inset-0 flex items-center justify-center` — center the panel
- `z-50` — above everything else

---

### 7. Navbar

**File:** [tailwind-playground/src/components/Navbar.jsx](tailwind-playground/src/components/Navbar.jsx)

Sticky top nav with active link highlighting, dark mode toggle, and mobile hamburger menu.

**Key Tailwind patterns:**
- `sticky top-0 z-40` — sticks to top on scroll
- `bg-white/80 backdrop-blur` — frosted glass effect
- `hidden md:flex` — hide on mobile, show on desktop
- `md:hidden` — show on mobile, hide on desktop

---

### 8. Toast

**File:** [tailwind-playground/src/components/Toast.jsx](tailwind-playground/src/components/Toast.jsx)

Auto-dismissing notifications. Uses the `useToast()` hook defined in the same file.

```jsx
const { toasts, toast, remove } = useToast()

// Trigger a toast from anywhere
toast('Profile saved!', 'success')
toast('Something went wrong', 'error')
toast('Check your email', 'warning')
toast('New message received', 'info')

// Render the container (put in App or page root)
<ToastContainer toasts={toasts} onRemove={remove} />
```

**Key Tailwind patterns:**
- `fixed bottom-4 right-4 z-50` — corner positioning
- `transition-all opacity-0 translate-y-2` → `opacity-100 translate-y-0` — slide-in animation

---

### 9. EmptyState

**File:** [tailwind-playground/src/components/EmptyState.jsx](tailwind-playground/src/components/EmptyState.jsx)

Show this instead of a blank screen when there's no data.

```jsx
<EmptyState
  icon={<svg ...>search icon</svg>}
  title="No results found"
  description="Try a different search term."
  action={<Button onClick={clearSearch}>Clear search</Button>}
/>

// Pre-built variants
<SearchEmptyState query={debouncedQuery} />
<BookmarkEmptyState />
```

---

### 10. Sidebar Layout

Used in the Dashboard page. A collapsible sidebar + main content layout.

**Key Tailwind patterns:**
- `flex h-screen` — full height flex container
- `w-64 flex-shrink-0` — fixed width sidebar
- `flex-1 overflow-auto` — main content fills rest, scrollable

---

## Responsive Design Patterns

### Pattern 1: Centered Content (landing pages)
```jsx
<div className="max-w-4xl mx-auto px-4 py-16">
  content
</div>
```

### Pattern 2: Card Grid (responsive)
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Pattern 3: Sidebar + Main (dashboard)
```jsx
<div className="flex min-h-screen">
  <aside className="w-64 flex-shrink-0 bg-slate-900">sidebar</aside>
  <main className="flex-1 overflow-auto p-6">content</main>
</div>
```

### Pattern 4: Sticky Nav + Scrollable Page
```jsx
<nav className="sticky top-0 z-40 ...">nav</nav>
<main>...long content...</main>
```

---

## Tailwind Config Customization

Add your own design tokens in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      brand: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        900: '#1e3a5f',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    animation: {
      'fade-in': 'fadeIn 0.15s ease-out',
      'slide-in': 'slideIn 0.2s ease-out',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: '0', transform: 'translateY(4px)' },
        to:   { opacity: '1', transform: 'translateY(0)' },
      },
      slideIn: {
        from: { transform: 'translateX(-100%)' },
        to:   { transform: 'translateX(0)' },
      }
    }
  },
}
```

**What `extend` means:** You add ON TOP of Tailwind's defaults. Without `extend`, you'd REPLACE them (losing all default colors, spacing, etc.).

---

## Quick Reference Cheatsheet

| Category | Common classes |
|----------|---------------|
| **Spacing** | `p-4 px-4 py-2 pt-2 m-4 mx-auto gap-4 space-y-4` |
| **Width** | `w-full w-64 w-1/2 min-w-0 max-w-md max-w-4xl` |
| **Height** | `h-full h-screen h-16 min-h-screen` |
| **Flex** | `flex items-center justify-between flex-col flex-1 flex-wrap` |
| **Grid** | `grid grid-cols-3 gap-6 col-span-2` |
| **Text** | `text-sm text-xl font-semibold text-gray-900 leading-relaxed truncate line-clamp-2` |
| **Background** | `bg-white bg-gray-50 bg-blue-600 bg-black/50` |
| **Border** | `border border-gray-200 border-2 rounded-lg rounded-full` |
| **Shadow** | `shadow-sm shadow-md shadow-lg hover:shadow-md` |
| **Position** | `fixed sticky relative absolute inset-0 top-0 z-50` |
| **Display** | `hidden block flex lg:block md:hidden` |
| **Overflow** | `overflow-hidden overflow-auto` |
| **Transition** | `transition-all duration-200 transition-colors transition-shadow` |
| **Transform** | `hover:scale-105 active:scale-95 -translate-x-full` |
| **Opacity** | `opacity-50 hover:opacity-100 disabled:opacity-50` |
| **Dark mode** | `dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700` |
| **Responsive** | `sm:grid-cols-2 md:text-4xl lg:block md:hidden` |
| **States** | `hover:bg-gray-100 focus:ring-2 active:scale-95 disabled:cursor-not-allowed` |

---

## The Final Project: Dev Dashboard

**Location:** `tailwind-playground/`

A 4-page React app that combines everything from all three modules.

### Pages

| Page | Route | What It Shows |
|------|-------|---------------|
| Landing | `/` | Hero, feature cards, tech badges |
| Dashboard | `/dashboard` | Stats, dev cards, remove modal |
| Search | `/search` | Debounced GitHub API search, bookmark toggle, toasts |
| Settings | `/settings` | Dark mode toggle, profile input, clear bookmarks |

### Hooks Used

| Hook | Where Used |
|------|-----------|
| `useLocalStorage` | Dark mode persistence, bookmarks, username |
| `useDebounce` | Search input (500ms delay) |
| `useFetch` | GitHub API calls (with AbortController) |
| `useClickOutside` | Modal close on outside click |
| `useToggle` | Mobile menu open/close |

### Running the project

```bash
cd tailwind-playground
npm install
npm run dev
# Opens at http://localhost:5173
```

The Vite dev server proxies `/gh-api` → `https://api.github.com` to bypass CORS.

---

## Checklist — Mark Off As You Complete

**Setup**
- [ ] Vite + React project created
- [ ] Tailwind v3 installed and configured
- [ ] `@tailwind base/components/utilities` in index.css
- [ ] darkMode: 'class' in tailwind.config.js
- [ ] Custom animation (fade-in) added in config
- [ ] Verified with a test `text-3xl font-bold text-blue-600` heading

**Components (build all 10)**
- [ ] Button — all 5 variants, 3 sizes, loading + disabled states, dark mode
- [ ] Input — default, focus, error, disabled states, dark mode
- [ ] Badge — all 6 color variants, dark mode
- [ ] Card — with image, badge, footer, hover shadow, dark mode
- [ ] Skeleton — SkeletonCard, SkeletonText, SkeletonAvatar, SkeletonUserCard
- [ ] Modal — click-outside close, Escape key close, scroll lock, dark mode
- [ ] Navbar — sticky, active link, dark mode toggle, mobile hamburger
- [ ] Toast + useToast — all 4 types, auto-dismiss, slide-out animation
- [ ] EmptyState — generic, SearchEmptyState, BookmarkEmptyState
- [ ] Sidebar — collapsible, with nav items (used in Dashboard page)

**Pages**
- [ ] Landing page — hero, 3 feature cards, tech badge row
- [ ] Dashboard page — stats row, dev card grid, remove bookmark modal
- [ ] Search page — debounced input, skeleton loading, error state, bookmark toggle, toasts
- [ ] Settings page — dark mode toggle, username input with avatar preview, clear bookmarks

**Quality**
- [ ] Dark mode works on ALL components
- [ ] Responsive: looks good on mobile (375px), tablet (768px), desktop (1280px)
- [ ] GitHub search works (no CORS errors — using Vite proxy)
- [ ] Dark mode persists across page refreshes (useLocalStorage)
- [ ] Bookmarks persist across page refreshes
