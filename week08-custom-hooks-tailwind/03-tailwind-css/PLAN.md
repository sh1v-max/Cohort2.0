# 03 — Tailwind CSS

## What Tailwind Is (and What It Isn't)

Tailwind is a **utility-first CSS framework**. Instead of writing CSS classes with declarations inside them, you compose utility classes directly in your HTML/JSX.

**Not Tailwind:**
```css
/* styles.css */
.card {
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

**Tailwind way:**
```jsx
<div className="p-4 rounded-lg bg-white shadow-sm">
```

**Why this is better for React:**
- No switching between files
- No naming classes (naming is the hardest part of CSS)
- No specificity wars
- Dead code elimination built-in — Tailwind purges unused classes
- Consistent spacing/color system enforced automatically

---

## Setup (Vite + React + Tailwind v3)

Create the project:
```bash
npm create vite@latest tailwind-playground -- --template react
cd tailwind-playground
npm install
```

Install Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',   // enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css` (replace everything):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Test it works:
```jsx
// App.jsx
function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600">
      Tailwind is working!
    </h1>
  )
}
```

---

## Core Concepts to Learn

### 1. The Spacing System

Tailwind's spacing scale = the base-4 system from UI/UX primitives:

```
p-1  = 4px    (padding 4px all sides)
p-2  = 8px
p-4  = 16px   ← most used
p-6  = 24px
p-8  = 32px
p-12 = 48px
p-16 = 64px

Same scale for: m- (margin), gap- (flexbox/grid gap), w- h- (width/height)
```

**Directional variants:**
```
px-4  = padding left + right
py-4  = padding top + bottom
pt-4  = padding top only
pl-4  = padding left only
mt-4  = margin top
mb-4  = margin bottom
mx-auto = margin left + right auto (centering trick)
```

---

### 2. Flexbox & Grid

**Flexbox:**
```jsx
// Row layout (default)
<div className="flex items-center gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

// Space between
<div className="flex justify-between items-center">

// Column layout
<div className="flex flex-col gap-2">

// Center everything
<div className="flex items-center justify-center min-h-screen">
```

**Grid:**
```jsx
// Responsive card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

// Fixed columns
<div className="grid grid-cols-4 gap-4">

// Auto-fit (fills available space)
<div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
```

---

### 3. Typography

```jsx
// Size
<p className="text-sm">Small text</p>      // 14px
<p className="text-base">Body text</p>     // 16px
<h3 className="text-xl">Card title</h3>   // 20px
<h2 className="text-2xl">Heading</h2>     // 24px
<h1 className="text-4xl">Hero</h1>        // 36px

// Weight
<p className="font-normal">Regular</p>    // 400
<p className="font-medium">Medium</p>     // 500
<p className="font-semibold">Semi</p>     // 600
<p className="font-bold">Bold</p>         // 700

// Color
<p className="text-gray-900">Primary text</p>
<p className="text-gray-500">Secondary text</p>
<p className="text-gray-400">Muted text</p>
<p className="text-blue-600">Accent text</p>
<p className="text-red-500">Error text</p>

// Line height
<p className="leading-relaxed">Body paragraph</p>   // 1.625
<h1 className="leading-tight">Heading</h1>          // 1.25

// Truncation
<p className="truncate">Very long text that gets cut off...</p>
<p className="line-clamp-2">Text limited to 2 lines max</p>
```

---

### 4. Colors & Backgrounds

Tailwind's color scale goes from 50 (lightest) to 950 (darkest):

```jsx
// Backgrounds
<div className="bg-white">
<div className="bg-gray-50">       // off-white
<div className="bg-gray-100">      // light surface
<div className="bg-slate-800">     // dark surface
<div className="bg-blue-600">      // accent

// Text
<p className="text-slate-900">     // near-black
<p className="text-slate-500">     // muted
<p className="text-blue-600">      // link color

// Borders
<div className="border border-gray-200">
<div className="border-2 border-blue-500">  // focus ring style
```

---

### 5. Border Radius

```jsx
<div className="rounded">       // 4px  - slight rounding
<div className="rounded-md">    // 6px  - standard
<div className="rounded-lg">    // 8px  - cards
<div className="rounded-xl">    // 12px - larger cards
<div className="rounded-2xl">   // 16px - modern cards
<div className="rounded-full">  // 9999px - pills, avatars
```

---

### 6. Shadows

```jsx
<div className="shadow-sm">    // subtle (most used)
<div className="shadow">       // standard
<div className="shadow-md">    // medium
<div className="shadow-lg">    // large, for modals
<div className="shadow-xl">    // large hover states
<div className="shadow-none">  // remove shadow
```

---

### 7. Hover, Focus & Active States

```jsx
// Hover
<button className="bg-blue-600 hover:bg-blue-700">

// Focus (for accessibility)
<input className="border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

// Active
<button className="active:scale-95 transition-transform">

// Disabled
<button className="disabled:opacity-50 disabled:cursor-not-allowed">

// Group hover (hover parent → style child)
<div className="group">
  <div className="group-hover:bg-gray-100">
    Hover the parent to style me
  </div>
</div>
```

---

### 8. Responsive Design

Tailwind is **mobile-first**. No prefix = applies to all sizes. Add a prefix to apply only from that breakpoint up.

```
sm:   640px+
md:   768px+
lg:   1024px+
xl:   1280px+
2xl:  1536px+
```

```jsx
// Mobile: 1 column, tablet: 2, desktop: 3
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// Hidden on mobile, visible on desktop
<div className="hidden lg:block">

// Text size changes at breakpoints
<h1 className="text-2xl md:text-4xl lg:text-5xl">

// Padding increases on larger screens
<div className="px-4 md:px-8 lg:px-16">
```

---

### 9. Dark Mode

Since you set `darkMode: 'class'` in config, dark mode activates when parent has `class="dark"`.

```jsx
// Component that responds to dark mode
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">

// Toggle dark mode (connect to useToggle hook from module 01!)
function App() {
  const [isDark, toggle] = useToggle(false)

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <button onClick={toggle}>Toggle theme</button>
      </div>
    </div>
  )
}
```

---

### 10. Transitions & Animations

```jsx
// Smooth color transitions
<button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200">

// Smooth all transitions
<div className="transition-all duration-300">

// Scale on hover (card lift effect)
<div className="hover:scale-105 transition-transform duration-200">

// Fade in
<div className="opacity-0 animate-fade-in">  // needs custom config

// Built-in animations
<div className="animate-spin">    // spinning (loading icons)
<div className="animate-pulse">   // pulsing (skeleton loading)
<div className="animate-bounce">  // bouncing
<div className="animate-ping">    // notification ping effect
```

---

## Components to Build (in order)

Build each in `tailwind-playground/src/components/`. These cover 90% of what you'll need in real projects.

---

### Component 1: Button System

Create `Button.jsx` with all variants:

```jsx
// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
// States: default, hover, active, disabled, loading

function Button({ variant = 'primary', size = 'md', disabled, loading, children, onClick }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  }
  
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="mr-2 animate-spin">⟳</span>}
      {children}
    </button>
  )
}
```

**What to implement:**
- [ ] All 5 variants visible on one demo page
- [ ] All 3 sizes
- [ ] Disabled state
- [ ] Loading state with spinner

---

### Component 2: Input & Form Elements

```jsx
// Input with label, error, helper text
function Input({ label, error, helperText, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all
          ${error
            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'
          }
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
    </div>
  )
}
```

**What to implement:**
- [ ] Input: default, focus, error, disabled states
- [ ] Textarea (same pattern)
- [ ] Select dropdown (same pattern)
- [ ] Checkbox with label
- [ ] Radio group

---

### Component 3: Card

```jsx
function Card({ title, description, image, badge, footer }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-5">
        {badge && (
          <span className="inline-block mb-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
      {footer && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  )
}
```

**What to implement:**
- [ ] Card with image
- [ ] Card without image
- [ ] Card with badge
- [ ] Card with footer actions
- [ ] Card grid (3 across on desktop, 1 on mobile)

---

### Component 4: Navbar

```jsx
function Navbar() {
  const [menuOpen, setMenuOpen] = useToggle(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="text-xl font-bold text-gray-900">Logo</span>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Projects</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900">Sign in</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Get started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={setMenuOpen} className="md:hidden p-2 rounded-md hover:bg-gray-100">
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <a href="#" className="text-sm text-gray-700 py-2">Home</a>
            <a href="#" className="text-sm text-gray-700 py-2">About</a>
            <a href="#" className="text-sm text-gray-700 py-2">Projects</a>
          </div>
        )}
      </div>
    </nav>
  )
}
```

**What to implement:**
- [ ] Logo + links + CTA on desktop
- [ ] Hamburger menu that opens/closes on mobile
- [ ] Sticky on scroll (stays at top)

---

### Component 5: Badge / Tag

```jsx
function Badge({ variant = 'default', children }) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}
```

---

### Component 6: Skeleton Loader

```jsx
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
    </div>
  )
}
```

**What to implement:** Use this in your `useFetch` loading state instead of a spinner.

---

### Component 7: Modal / Dialog

```jsx
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal panel - stop propagation so clicking inside doesn't close */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  )
}
```

**Use with `useToggle` from module 01!**

---

### Component 8: Sidebar Layout

Build a full dashboard layout:

```jsx
function DashboardLayout({ children }) {
  const [sidebarOpen, toggle] = useToggle(true)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 bg-slate-900 text-white transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {sidebarOpen && <span className="font-bold text-lg">Dashboard</span>}
          <button onClick={toggle} className="p-1 rounded hover:bg-slate-700">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="p-2 flex flex-col gap-1 mt-2">
          {['Home', 'Analytics', 'Users', 'Settings'].map(item => (
            <a
              key={item}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <span>⬜</span>
              {sidebarOpen && <span className="text-sm">{item}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}
```

---

### Component 9: Toast / Notification

```jsx
// Global toast system (simple version)
function Toast({ message, type = 'success', onClose }) {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg ${styles[type]}`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-auto text-current opacity-60 hover:opacity-100">✕</button>
    </div>
  )
}

// Toast container (fixed to screen corner)
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 min-w-72">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}
```

---

### Component 10: Empty State

```jsx
function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-2xl">
        📭
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">{description}</p>
      {action && (
        <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          {action}
        </button>
      )}
    </div>
  )
}
```

---

## Dark Mode for All Components

Once all components are built, add dark mode variants to each.

**Pattern:**
```jsx
// Every bg → add dark:bg-*
// Every text → add dark:text-*
// Every border → add dark:border-*

<div className="bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-700">
  <p className="text-gray-900 dark:text-gray-100">Content</p>
  <p className="text-gray-500 dark:text-slate-400">Secondary</p>
</div>
```

Connect to `useToggle` (module 01) and `useLocalStorage` (module 01) to persist dark mode preference.

---

## Tailwind Config Customization

In `tailwind.config.js`, extend the theme with your own design tokens:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a5f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
}
```

---

## Final Project: Dev Dashboard

Combine everything into one app in `tailwind-playground/`:

**Pages to build:**
1. **Landing page** — hero, feature cards, CTA section
2. **Dashboard** — sidebar layout, stats cards, activity feed
3. **Search page** — search bar (debounced), result cards, skeleton loading
4. **Settings page** — form inputs, toggle switches, dark mode

**Checklist:**
- [ ] Setup complete (Vite + React + Tailwind configured)
- [ ] Button component (all variants + states)
- [ ] Input component (all states + error handling)
- [ ] Card component
- [ ] Navbar (with mobile hamburger)
- [ ] Badge/Tag component
- [ ] Skeleton loader
- [ ] Modal (with useToggle + useClickOutside)
- [ ] Sidebar layout (collapsible)
- [ ] Toast notifications
- [ ] Empty state
- [ ] Dark mode on all components (using useToggle + useLocalStorage)
- [ ] Responsive design verified on mobile, tablet, desktop
- [ ] Landing page built
- [ ] Dashboard page built
- [ ] Search page (with useDebounce + useFetch)
- [ ] Settings page (with form inputs + dark mode toggle)

---

## Tailwind Class Reference Cheatsheet

| Category | Classes |
|----------|---------|
| **Spacing** | `p-4 px-4 py-4 pt-4 m-4 mx-auto gap-4` |
| **Width** | `w-full w-64 w-1/2 min-w-0 max-w-md` |
| **Height** | `h-full h-screen h-16 min-h-screen` |
| **Flex** | `flex items-center justify-between flex-col flex-1` |
| **Grid** | `grid grid-cols-3 gap-6 col-span-2` |
| **Text** | `text-sm text-lg font-semibold text-gray-900 leading-relaxed` |
| **Bg** | `bg-white bg-gray-50 bg-blue-600 bg-black/50` |
| **Border** | `border border-gray-200 border-2 rounded-lg` |
| **Shadow** | `shadow-sm shadow-md shadow-lg` |
| **Position** | `fixed sticky relative absolute inset-0 top-0 z-50` |
| **Display** | `hidden block flex lg:block md:hidden` |
| **Overflow** | `overflow-hidden overflow-auto truncate` |
| **Transition** | `transition-all duration-200 ease-in-out` |
| **Transform** | `hover:scale-105 active:scale-95 rotate-90` |
| **Opacity** | `opacity-50 hover:opacity-100 disabled:opacity-50` |
| **Cursor** | `cursor-pointer cursor-not-allowed` |
