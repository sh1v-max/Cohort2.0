const TYPE_SCALE = [
  { name: 'xs',  size: '12px', weight: '400', use: 'Captions, badges, labels' },
  { name: 'sm',  size: '14px', weight: '400', use: 'Secondary text, helper text' },
  { name: 'base',size: '16px', weight: '400', use: 'Body text (never go below this)' },
  { name: 'lg',  size: '18px', weight: '500', use: 'Slightly emphasized text' },
  { name: 'xl',  size: '20px', weight: '600', use: 'Card titles, small headings' },
  { name: '2xl', size: '24px', weight: '600', use: 'Section headings' },
  { name: '3xl', size: '30px', weight: '700', use: 'Page sub-headings' },
  { name: '4xl', size: '36px', weight: '700', use: 'Major headings' },
  { name: '5xl', size: '48px', weight: '700', use: 'Hero text' },
]

export function TypographyScale() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">02</span>
        <div>
          <h2 className="section-title">Typography Scale</h2>
          <p className="section-desc">Use a fixed scale — each step is a ratio larger than the previous. Never invent new sizes.</p>
        </div>
      </div>

      {/* Scale */}
      <div className="card">
        <h3 className="card-label">The Scale</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TYPE_SCALE.map(({ name, size, weight, use }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <span style={{ fontSize: size, fontWeight: weight, color: 'var(--text)', lineHeight: 1.2, minWidth: '180px' }}>
                The quick fox
              </span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <code style={{ fontSize: '11px', background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 6px', borderRadius: '4px' }}>text-{name}</code>
                <code style={{ fontSize: '11px', background: 'var(--surface-alt)', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '4px' }}>{size}</code>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{use}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weight reference */}
      <div className="card">
        <h3 className="card-label">Font Weight Rules</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { w: '400', name: 'Regular', use: 'Body text, descriptions' },
            { w: '500', name: 'Medium',  use: 'Labels, nav items, table cells' },
            { w: '600', name: 'Semibold',use: 'Card titles, buttons, emphasis' },
            { w: '700', name: 'Bold',    use: 'Page headings, CTAs, numbers' },
          ].map(({ w, name, use }) => (
            <div key={w} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontWeight: w, fontSize: '16px', minWidth: '120px', color: 'var(--text)' }}>
                {name} ({w})
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Good vs bad */}
      <div className="compare-grid">
        <div className="compare-bad">
          <div className="compare-badge bad">Bad — arbitrary sizes</div>
          <div style={{ background: 'var(--surface)', borderRadius: '8px', padding: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '17px', marginBottom: '6px' }}>Blog Post Title</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>Jun 22, 2026 · 5 min read</p>
            <p style={{ fontSize: '15px' }}>The article body starts here and continues for a while, giving the reader lots of content to enjoy.</p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Posted by Shiv</p>
          </div>
          <p className="compare-note">17px, 13px, 15px, 11px — off the scale. Nothing feels intentional.</p>
        </div>

        <div className="compare-good">
          <div className="compare-badge good">Good — using the scale</div>
          <div style={{ background: 'var(--surface)', borderRadius: '8px', padding: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>Blog Post Title</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>Jun 22, 2026 · 5 min read</p>
            <p style={{ fontSize: '16px', lineHeight: 1.6 }}>The article body starts here and continues for a while, giving the reader lots of content to enjoy.</p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '12px' }}>Posted by Shiv</p>
          </div>
          <p className="compare-note">20px (xl), 12px (xs), 16px (base), 14px (sm) — all on the scale. Clear hierarchy.</p>
        </div>
      </div>
    </section>
  )
}
