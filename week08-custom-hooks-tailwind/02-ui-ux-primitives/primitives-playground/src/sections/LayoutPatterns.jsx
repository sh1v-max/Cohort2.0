import { useState } from 'react'

const PATTERNS = [
  {
    id: 'centered',
    name: 'Centered Content',
    use: 'Landing pages, auth pages, blog posts',
    css: 'max-width container + mx-auto + px-6',
    preview: () => (
      <div style={{ background: 'var(--bg)', padding: '8px', borderRadius: '8px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '320px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ height: '10px', background: 'var(--accent)', borderRadius: '4px', width: '60%', marginBottom: '8px' }} />
          <div style={{ height: '8px', background: 'var(--surface-alt)', borderRadius: '4px', marginBottom: '4px' }} />
          <div style={{ height: '8px', background: 'var(--surface-alt)', borderRadius: '4px', width: '80%' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'sidebar',
    name: 'Sidebar + Main',
    use: 'Dashboards, admin panels, settings pages',
    css: 'flex h-screen → w-64 sidebar + flex-1 main',
    preview: () => (
      <div style={{ background: 'var(--bg)', padding: '8px', borderRadius: '8px', minHeight: '120px', display: 'flex', gap: '8px' }}>
        <div style={{ width: '60px', background: '#1e293b', borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[1,2,3,4].map(i => <div key={i} style={{ height: '6px', background: '#334155', borderRadius: '3px' }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ height: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }} />)}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cardgrid',
    name: 'Card Grid',
    use: 'Product listings, blog posts, user galleries',
    css: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
    preview: () => (
      <div style={{ background: 'var(--bg)', padding: '8px', borderRadius: '8px', minHeight: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ height: '30px', background: 'var(--surface-alt)' }} />
              <div style={{ padding: '6px' }}>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', marginBottom: '4px' }} />
                <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', width: '70%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'stickynav',
    name: 'Sticky Header',
    use: 'Almost every app — nav stays visible while content scrolls',
    css: 'fixed top-0 inset-x-0 z-50 → pt-16 on main',
    preview: () => (
      <div style={{ background: 'var(--bg)', borderRadius: '8px', overflow: 'hidden', minHeight: '120px', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <div style={{ width: '40px', height: '8px', background: 'var(--accent)', borderRadius: '4px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1,2,3].map(i => <div key={i} style={{ width: '24px', height: '6px', background: 'var(--border)', borderRadius: '3px' }} />)}
          </div>
        </div>
        <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[1,2,3].map(i => <div key={i} style={{ height: '12px', background: 'var(--surface-alt)', borderRadius: '4px', width: `${70 + i * 5}%` }} />)}
        </div>
      </div>
    ),
  },
]

export function LayoutPatterns() {
  const [active, setActive] = useState('centered')
  const current = PATTERNS.find(p => p.id === active)

  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">08</span>
        <div>
          <h2 className="section-title">Layout Patterns</h2>
          <p className="section-desc">4 layouts cover 90% of what you'll ever build. Know these and you'll never start from scratch.</p>
        </div>
      </div>

      {/* Pattern selector */}
      <div className="card">
        <h3 className="card-label">Common Patterns</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {PATTERNS.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                padding: '6px 14px', fontSize: '13px', borderRadius: '20px', cursor: 'pointer',
                fontWeight: active === p.id ? 600 : 400,
                background: active === p.id ? 'var(--accent)' : 'var(--surface-alt)',
                color: active === p.id ? '#fff' : 'var(--text-muted)',
                border: active === p.id ? 'none' : '1px solid var(--border)',
                transition: 'all 0.15s',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        <current.preview />

        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Use for:</span>
            <span style={{ fontSize: '13px', color: 'var(--text)' }}>{current.use}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tailwind:</span>
            <code style={{ fontSize: '12px', background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px' }}>{current.css}</code>
          </div>
        </div>
      </div>

      {/* Responsive strategy */}
      <div className="card">
        <h3 className="card-label">Responsive Strategy — mobile-first</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Design for mobile first, then enhance for larger screens. Tailwind's breakpoints are additive: no prefix = all screens, <code style={{ fontSize: '12px', background: 'var(--accent-light)', color: 'var(--accent)', padding: '1px 5px', borderRadius: '4px' }}>sm:</code> = 640px+, <code style={{ fontSize: '12px', background: 'var(--accent-light)', color: 'var(--accent)', padding: '1px 5px', borderRadius: '4px' }}>lg:</code> = 1024px+.
          </p>
          <div style={{ background: 'var(--surface-alt)', borderRadius: '8px', padding: '12px' }}>
            {[
              { size: '< 640px', cols: 1, label: 'Mobile', color: '#2563eb' },
              { size: '640px+',  cols: 2, label: 'Tablet (sm:)', color: '#7c3aed' },
              { size: '1024px+', cols: 3, label: 'Desktop (lg:)', color: '#059669' },
            ].map(({ size, cols, label, color }) => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ minWidth: '80px', fontSize: '12px', color, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', minWidth: '70px' }}>{size}</div>
                <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
                  {Array.from({ length: cols }).map((_, i) => (
                    <div key={i} style={{ flex: 1, height: '24px', background: color, opacity: 0.2, borderRadius: '4px' }} />
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cols} col{cols > 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insight-box">
        <strong>Most common mistake:</strong> designing desktop-first, then trying to squish it into mobile. Start with mobile — it forces you to prioritize. Adding things on desktop is easy; removing things on mobile is hard.
      </div>
    </section>
  )
}
