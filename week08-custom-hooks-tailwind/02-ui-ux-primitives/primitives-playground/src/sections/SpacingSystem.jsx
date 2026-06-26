const SCALE = [
  { token: '4px',  label: 'p-1', use: 'Icon padding, tight gaps' },
  { token: '8px',  label: 'p-2', use: 'Small gaps, input padding' },
  { token: '12px', label: 'p-3', use: 'Compact component padding' },
  { token: '16px', label: 'p-4', use: 'Standard padding (most used)' },
  { token: '24px', label: 'p-6', use: 'Card padding, section gaps' },
  { token: '32px', label: 'p-8', use: 'Large section gaps' },
  { token: '48px', label: 'p-12', use: 'Hero sections, page padding' },
  { token: '64px', label: 'p-16', use: 'Very large separations' },
]

export function SpacingSystem() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">01</span>
        <div>
          <h2 className="section-title">Spacing System</h2>
          <p className="section-desc">Never pick spacing values randomly. Use a base-4 scale. Every value is a multiple of 4px.</p>
        </div>
      </div>

      {/* Scale visualized */}
      <div className="card">
        <h3 className="card-label">The Scale</h3>
        <div className="spacing-scale">
          {SCALE.map(({ token, label, use }) => (
            <div key={token} className="spacing-row">
              <div className="spacing-bar-wrap">
                <div className="spacing-bar" style={{ width: token, height: '20px', background: 'var(--accent)', borderRadius: '3px', minWidth: '4px' }} />
              </div>
              <code className="spacing-token">{token}</code>
              <code className="spacing-label">{label}</code>
              <span className="spacing-use">{use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Good vs Bad */}
      <div className="compare-grid">
        <div className="compare-bad">
          <div className="compare-badge bad">Bad — random spacing</div>
          <div style={{ padding: '7px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '13px', fontWeight: 600 }}>Card Title</div>
            <div style={{ marginBottom: '5px', fontSize: '14px', color: 'var(--text-muted)' }}>Some description text here that goes on for a bit.</div>
            <div style={{ marginTop: '11px', display: 'flex', gap: '7px' }}>
              <button className="btn-demo">Action</button>
              <button className="btn-demo ghost">Cancel</button>
            </div>
          </div>
          <p className="compare-note">7px, 13px, 5px, 11px — no system. Feels off even if you can't explain why.</p>
        </div>

        <div className="compare-good">
          <div className="compare-badge good">Good — base-4 scale</div>
          <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>Card Title</div>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Some description text here that goes on for a bit.</div>
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <button className="btn-demo">Action</button>
              <button className="btn-demo ghost">Cancel</button>
            </div>
          </div>
          <p className="compare-note">16px, 8px, 8px, 16px — all multiples of 4. Feels clean and intentional.</p>
        </div>
      </div>

      <div className="insight-box">
        <strong>Tailwind connection:</strong> Tailwind's spacing scale IS this system. <code>p-4</code> = 16px, <code>p-6</code> = 24px, <code>gap-8</code> = 32px. When you use Tailwind in module 03, you're using this scale automatically.
      </div>
    </section>
  )
}
