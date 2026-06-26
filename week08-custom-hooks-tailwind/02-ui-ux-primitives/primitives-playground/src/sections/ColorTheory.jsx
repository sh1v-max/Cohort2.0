const LIGHT_PALETTE = [
  { role: 'Background',     hex: '#f8fafc', label: 'Page base' },
  { role: 'Surface',        hex: '#ffffff', label: 'Cards, panels' },
  { role: 'Surface Alt',    hex: '#f1f5f9', label: 'Hover bg, tags' },
  { role: 'Border',         hex: '#e2e8f0', label: 'Dividers, outlines' },
  { role: 'Text Primary',   hex: '#0f172a', label: 'Main content' },
  { role: 'Text Secondary', hex: '#64748b', label: 'Descriptions, meta' },
  { role: 'Accent',         hex: '#2563eb', label: 'Buttons, links, focus' },
  { role: 'Success',        hex: '#16a34a', label: 'Confirmations' },
  { role: 'Warning',        hex: '#d97706', label: 'Cautions' },
  { role: 'Error',          hex: '#dc2626', label: 'Errors, destructive' },
]

const DARK_PALETTE = [
  { role: 'Background',     hex: '#0f172a', label: 'Page base' },
  { role: 'Surface',        hex: '#1e293b', label: 'Cards, panels' },
  { role: 'Surface Alt',    hex: '#334155', label: 'Hover bg, tags' },
  { role: 'Border',         hex: '#334155', label: 'Dividers, outlines' },
  { role: 'Text Primary',   hex: '#f1f5f9', label: 'Main content' },
  { role: 'Text Secondary', hex: '#94a3b8', label: 'Descriptions, meta' },
  { role: 'Accent',         hex: '#3b82f6', label: 'Buttons, links, focus' },
  { role: 'Success',        hex: '#4ade80', label: 'Confirmations' },
  { role: 'Warning',        hex: '#fbbf24', label: 'Cautions' },
  { role: 'Error',          hex: '#f87171', label: 'Errors, destructive' },
]

function Swatch({ hex, role, label }) {
  const isLight = (h) => {
    const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16)
    return (r*299 + g*587 + b*114) / 1000 > 128
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '8px',
        background: hex,
        border: '1px solid rgba(0,0,0,0.08)',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '10px', color: isLight(hex) ? '#0f172a' : '#fff', fontWeight: 600, fontFamily: 'monospace' }}>
          {hex}
        </span>
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{role}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</div>
      </div>
    </div>
  )
}

export function ColorTheory() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">03</span>
        <div>
          <h2 className="section-title">Color Theory</h2>
          <p className="section-desc">The 60-30-10 rule: 60% background, 30% surface, 10% accent. Every color has a semantic role.</p>
        </div>
      </div>

      {/* 60-30-10 visual */}
      <div className="card">
        <h3 className="card-label">60 — 30 — 10 Rule</h3>
        <div style={{ display: 'flex', gap: '8px', height: '48px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ flex: 60, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#64748b' }}>60% bg</div>
          <div style={{ flex: 30, background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#475569' }}>30% surface</div>
          <div style={{ flex: 10, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff', fontWeight: 600 }}>10% accent</div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Most UIs look busy because the accent color is overused. The accent should feel <em>special</em> — use it only for the most important interactive elements.
        </p>
      </div>

      {/* Palettes */}
      <div className="compare-grid">
        <div className="card">
          <h3 className="card-label">Light Palette</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {LIGHT_PALETTE.map(s => <Swatch key={s.role} {...s} />)}
          </div>
        </div>
        <div className="card" style={{ background: '#1e293b', border: '1px solid #334155' }}>
          <h3 className="card-label" style={{ color: '#94a3b8' }}>Dark Palette</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {DARK_PALETTE.map(s => <Swatch key={s.role} {...s} />)}
          </div>
        </div>
      </div>

      {/* Contrast demo */}
      <div className="card">
        <h3 className="card-label">Contrast — Pass vs Fail</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {[
            { bg: '#2563eb', text: '#ffffff', result: 'pass', ratio: '8.6:1', label: 'Blue bg / white' },
            { bg: '#f8fafc', text: '#0f172a', result: 'pass', ratio: '19:1',  label: 'White bg / dark text' },
            { bg: '#f8fafc', text: '#94a3b8', result: 'fail', ratio: '2.5:1', label: 'White bg / light gray' },
            { bg: '#e2e8f0', text: '#cbd5e1', result: 'fail', ratio: '1.4:1', label: 'Gray bg / lighter gray' },
          ].map(({ bg, text, result, ratio, label }) => (
            <div key={label} style={{ background: bg, borderRadius: '8px', padding: '12px', border: `2px solid ${result === 'pass' ? '#16a34a' : '#dc2626'}` }}>
              <div style={{ color: text, fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: result === 'pass' ? '#16a34a' : '#dc2626', fontWeight: 700, background: '#fff', borderRadius: '4px', padding: '1px 6px' }}>
                  {result === 'pass' ? '✓ PASS' : '✗ FAIL'} {ratio}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text. Never put light gray on white.
        </p>
      </div>
    </section>
  )
}
