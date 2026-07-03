import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'

const PATTERNS = [
  { light: 'bg-white',         dark: 'dark:bg-slate-900',    label: 'Page background' },
  { light: 'bg-gray-50',       dark: 'dark:bg-slate-800',    label: 'Card / panel background' },
  { light: 'bg-gray-100',      dark: 'dark:bg-slate-700',    label: 'Subtle background (inputs, badges)' },
  { light: 'text-gray-900',    dark: 'dark:text-slate-100',  label: 'Primary text' },
  { light: 'text-gray-600',    dark: 'dark:text-slate-300',  label: 'Secondary text' },
  { light: 'text-gray-400',    dark: 'dark:text-slate-500',  label: 'Muted / placeholder text' },
  { light: 'border-gray-200',  dark: 'dark:border-slate-700',label: 'Borders & dividers' },
  { light: 'shadow-sm',        dark: 'dark:shadow-none',     label: 'Shadows (less visible in dark)' },
]

function DemoCard({ forceDark }) {
  return (
    <div className={`rounded-xl border p-5 space-y-3 ${
      forceDark
        ? 'bg-slate-800 border-slate-700 text-slate-100'
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="flex items-center justify-between">
        <div className={`text-sm font-semibold ${forceDark ? 'text-slate-100' : 'text-gray-900'}`}>
          Card Title
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
          forceDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'
        }`}>Badge</span>
      </div>
      <p className={`text-xs leading-relaxed ${forceDark ? 'text-slate-400' : 'text-gray-500'}`}>
        This card adapts to dark mode using Tailwind's <code className={forceDark ? 'text-blue-400' : 'text-blue-600'}>dark:</code> prefix.
      </p>
      <div className={`flex gap-2 pt-1 border-t ${forceDark ? 'border-slate-700' : 'border-gray-100'}`}>
        <button className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
          forceDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        } transition-colors`}>
          Primary
        </button>
        <button className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
          forceDark
            ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        } transition-colors`}>
          Secondary
        </button>
      </div>
    </div>
  )
}

export function DarkMode() {
  const [showDark, setShowDark] = useState(true)

  return (
    <section id="darkmode">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Dark Mode</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Tailwind's <code className="text-blue-500">dark:</code> prefix applies a class only when dark mode is active. It's a variant — just like <code className="text-blue-500">hover:</code> or <code className="text-blue-500">md:</code>.
      </p>

      {/* How it works — 3 steps */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">How it works — 3 steps</p>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">Set <code className="text-blue-500">darkMode: 'class'</code> in tailwind.config.js</p>
              <CodeBlock>{'export default { darkMode: \'class\', ... }'}</CodeBlock>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">Toggle the <code className="text-blue-500">dark</code> class on <code className="text-blue-500">&lt;html&gt;</code> from JavaScript</p>
              <CodeBlock>{"document.documentElement.classList.toggle('dark', isDark)"}</CodeBlock>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">Add <code className="text-blue-500">dark:</code> prefix to any class — it activates when <code className="text-blue-500">&lt;html&gt;</code> has class <code className="text-blue-500">dark</code></p>
              <CodeBlock>{'bg-white dark:bg-slate-900  text-gray-900 dark:text-slate-100'}</CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-side demo */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Live Preview</p>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setShowDark(false)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                !showDark ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 shadow-sm' : 'text-gray-500 dark:text-slate-400'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setShowDark(true)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                showDark ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 shadow-sm' : 'text-gray-500 dark:text-slate-400'
              }`}
            >
              Dark
            </button>
          </div>
        </div>
        <div className={`p-6 rounded-xl transition-colors duration-300 ${showDark ? 'bg-slate-950' : 'bg-gray-100'}`}>
          <DemoCard forceDark={showDark} />
        </div>
        <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
          The app's dark mode toggle (top-right) controls the whole app — this preview is independent.
        </p>
      </div>

      {/* Common patterns */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Common Patterns — copy and use these</p>
        <div className="space-y-2">
          {PATTERNS.map(p => (
            <div key={p.label} className="flex flex-wrap items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg">
              <span className="text-xs text-gray-400 dark:text-slate-500 w-44 shrink-0">{p.label}</span>
              <div className="flex gap-2 flex-wrap">
                <code className="text-xs font-mono text-orange-500">{p.light}</code>
                <span className="text-xs text-gray-300 dark:text-slate-600">+</span>
                <code className="text-xs font-mono text-blue-500">{p.dark}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Combining with other variants */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Combining dark: with other variants</p>
        <div className="space-y-2">
          {[
            ['dark:hover:bg-slate-700',    'Hover in dark mode'],
            ['dark:focus:ring-blue-700',   'Focus ring in dark mode'],
            ['dark:md:text-lg',            'Dark mode + breakpoint'],
            ['dark:disabled:opacity-30',   'Disabled in dark mode'],
            ['dark:group-hover:text-white','Group hover in dark mode'],
          ].map(([cls, desc]) => (
            <div key={cls} className="flex gap-3 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs items-center">
              <code className="font-mono text-blue-600 dark:text-blue-400 shrink-0">{cls}</code>
              <span className="text-gray-400 dark:text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* React pattern */}
      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">React pattern used in this app</p>
        <CodeBlock>{`// 1. Store preference
const [isDark, setIsDark] = useLocalStorage('theme-dark', false)

// 2. Apply to <html> on every change
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark)
}, [isDark])

// 3. Toggle button
<button onClick={() => setIsDark(v => !v)}>Toggle</button>`}</CodeBlock>
      </div>
    </section>
  )
}
