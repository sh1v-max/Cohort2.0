import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { Button }        from '../components/Button'
import { Badge }         from '../components/Badge'
import { Modal }         from '../components/Modal'
import { ToastContainer, useToast } from '../components/Toast'
import { SkeletonCard, SkeletonUserCard, SkeletonText, SkeletonAvatar } from '../components/Skeleton'

// ─── mini Card for the showcase (not the real Card component, keeps deps small) ─
function ShowCard({ title, sub, badge, badgeVariant = 'blue' }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="h-24 bg-gradient-to-br from-blue-400 to-purple-500" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">{title}</h3>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500">{sub}</p>
      </div>
    </div>
  )
}

// ─── mini Input for the showcase ─
function ShowInput({ label, placeholder, error, disabled }) {
  const [val, setVal] = useState('')
  return (
    <div className="space-y-1">
      {label && <label className="text-xs font-medium text-gray-600 dark:text-slate-300">{label}</label>}
      <input
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          'block w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all',
          'bg-white dark:bg-slate-800',
          'text-gray-900 dark:text-slate-100',
          'placeholder:text-gray-400 dark:placeholder:text-slate-500',
          disabled
            ? 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 cursor-not-allowed text-gray-400'
            : error
              ? 'border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
              : 'border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500',
        ].join(' ')}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Components() {
  const [modalOpen, setModalOpen]       = useState(false)
  const [confirmOpen, setConfirmOpen]   = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const { toasts, toast, remove }       = useToast()

  return (
    <section id="components">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Components</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">
        Real reusable components built from Tailwind classes — each one is a lesson in combining utilities.
      </p>

      {/* ── Button ─────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Button</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Button.jsx</code>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 space-y-5">
          {/* variants */}
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-3">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>
          {/* sizes */}
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          {/* states */}
          <div>
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-3">States</p>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
          <CodeBlock>{'<Button variant="primary" size="md" loading={false}>Click me</Button>'}</CodeBlock>
        </div>
      </div>

      {/* ── Badge ──────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Badge</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Badge.jsx</code>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="blue">Blue</Badge>
            <Badge variant="green">Success</Badge>
            <Badge variant="red">Error</Badge>
            <Badge variant="yellow">Warning</Badge>
            <Badge variant="purple">Purple</Badge>
          </div>
          <CodeBlock>{'<Badge variant="green">Success</Badge>  // rounded-full pill'}</CodeBlock>
        </div>
      </div>

      {/* ── Card ───────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Card</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Card.jsx</code>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ShowCard title="Design System" sub="Tailwind CSS v3 component" badge="New" badgeVariant="blue" />
          <ShowCard title="React Hooks" sub="Custom hooks deep dive" badge="In Progress" badgeVariant="yellow" />
          <ShowCard title="TypeScript" sub="Type-safe React apps" badge="Done" badgeVariant="green" />
        </div>
        <p className="mt-3 text-xs text-gray-400 dark:text-slate-500 font-mono">
          shadow-sm hover:shadow-md transition-shadow → card lift pattern
        </p>
      </div>

      {/* ── Input ──────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Input</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Input.jsx</code>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <ShowInput label="Default" placeholder="Type something…" />
          <ShowInput label="Error state" placeholder="Invalid email" error="Enter a valid email address" />
          <ShowInput label="Disabled" placeholder="Can't type here" disabled />
          <ShowInput label="Focus (click it)" placeholder="Click to see focus ring" />
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Modal</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Modal.jsx</code>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 space-y-3">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Info Modal</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>Open Confirm Modal</Button>
          </div>
          <ul className="text-xs text-gray-400 dark:text-slate-500 space-y-1 list-disc list-inside">
            <li>Click outside or press Escape to close</li>
            <li><code className="text-blue-400">fixed inset-0 bg-black/50 backdrop-blur-sm</code> — the overlay</li>
            <li><code className="text-blue-400">animate-fade-in</code> — custom keyframe entrance</li>
            <li>Body scroll is locked while modal is open</li>
          </ul>
        </div>
      </div>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Toast</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Toast.jsx + useToast</code>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary"   size="sm" onClick={() => toast('Changes saved successfully!', 'success')}>Success</Button>
            <Button variant="danger"    size="sm" onClick={() => toast('Something went wrong.', 'error')}>Error</Button>
            <Button variant="secondary" size="sm" onClick={() => toast('Low disk space warning.', 'warning')}>Warning</Button>
            <Button variant="outline"   size="sm" onClick={() => toast('New version available.', 'info')}>Info</Button>
          </div>
          <CodeBlock>{"const { toast, toasts, remove } = useToast()\ntoast('Saved!', 'success')  // auto-dismisses after 3.5s"}</CodeBlock>
        </div>
      </div>

      {/* ── Skeleton ───────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Skeleton</p>
          <code className="text-[10px] font-mono text-gray-300 dark:text-slate-600">components/Skeleton.jsx</code>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant={showSkeleton ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => setShowSkeleton(v => !v)}
            >
              {showSkeleton ? 'Show content' : 'Show skeleton'}
            </Button>
            <span className="text-xs text-gray-400 dark:text-slate-500">
              {showSkeleton ? 'animate-pulse placeholder' : 'real content loaded'}
            </span>
          </div>

          {showSkeleton ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonCard />
              <SkeletonUserCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 space-y-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Tailwind Playground</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">An interactive tool to learn every Tailwind concept with live controls and real-time previews.</p>
                <p className="text-xs text-gray-400 dark:text-slate-500">Built with React 19 + Vite</p>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 flex gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Harkirat Singh</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">@harkirat</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Building 100xDevs — teaching full-stack development to engineers worldwide.</p>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 dark:text-slate-500">
            <code className="text-blue-400">animate-pulse</code> on gray boxes matches the exact layout of real content — better UX than spinners.
          </p>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal Pattern"
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        <p className="mb-3">This modal uses three Tailwind patterns:</p>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><code className="text-blue-500">fixed inset-0</code> — fills the full screen</li>
          <li><code className="text-blue-500">bg-black/50 backdrop-blur-sm</code> — semi-transparent blurred overlay</li>
          <li><code className="text-blue-500">animate-fade-in</code> — smooth entrance via custom keyframe</li>
        </ol>
      </Modal>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete this item?"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { setConfirmOpen(false); toast('Item deleted', 'error') }}>Delete</Button>
          </>
        }
      >
        <p>This action cannot be undone. The item will be permanently removed.</p>
      </Modal>

      <ToastContainer toasts={toasts} onRemove={remove} />
    </section>
  )
}
