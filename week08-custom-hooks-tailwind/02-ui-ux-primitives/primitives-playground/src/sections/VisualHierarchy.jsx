export function VisualHierarchy() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">04</span>
        <div>
          <h2 className="section-title">Visual Hierarchy</h2>
          <p className="section-desc">Control the user's eye using size, weight, color, position, and space. Everything competes — you decide what wins.</p>
        </div>
      </div>

      {/* The 5 levers */}
      <div className="card">
        <h3 className="card-label">The 5 Levers of Hierarchy</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              lever: 'Size',
              demo: (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)' }}>Primary</span>
                  <span style={{ fontSize: '18px', color: 'var(--text)' }}>Secondary</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tertiary</span>
                </div>
              ),
              note: 'Bigger = more important. Most powerful lever.'
            },
            {
              lever: 'Weight',
              demo: (
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>Bold</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>Semibold</span>
                  <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text)' }}>Regular</span>
                  <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-muted)' }}>Muted</span>
                </div>
              ),
              note: 'Heavier weight = more important. Same size, different impact.'
            },
            {
              lever: 'Color',
              demo: (
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 600 }}>Accent</span>
                  <span style={{ fontSize: '15px', color: 'var(--text)' }}>Primary</span>
                  <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Secondary</span>
                  <span style={{ fontSize: '15px', color: 'var(--border)' }}>Disabled</span>
                </div>
              ),
              note: 'Higher contrast = more important. Accent color draws the eye first.'
            },
            {
              lever: 'Position',
              demo: (
                <div style={{ background: 'var(--surface-alt)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Top-left gets noticed first (F-pattern) → then top-right → then down the left side
                </div>
              ),
              note: 'Users read in an F-shape. Put the most important thing top-left.'
            },
            {
              lever: 'Space',
              demo: (
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>Spacious</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Content feels premium</div>
                  </div>
                  <div style={{ padding: '4px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)' }}>
                    <div style={{ fontWeight: 600 }}>Cramped</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Feels cheap</div>
                  </div>
                </div>
              ),
              note: 'More space around an element = more visual weight. Isolation = importance.'
            },
          ].map(({ lever, demo, note }) => (
            <div key={lever} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{
                minWidth: '80px', padding: '4px 10px', background: 'var(--accent-light)',
                color: 'var(--accent)', borderRadius: '20px', fontSize: '12px',
                fontWeight: 700, textAlign: 'center', flexShrink: 0, marginTop: '4px'
              }}>
                {lever}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '8px' }}>{demo}</div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card hierarchy good vs bad */}
      <div className="compare-grid">
        <div className="compare-bad">
          <div className="compare-badge bad">Bad — flat, no hierarchy</div>
          <div style={{ background: 'var(--surface)', borderRadius: '10px', padding: '16px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>Product Name</div>
            <div style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--text-muted)' }}>A great product for everyone.</div>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>$49.00</div>
            <button style={{ fontSize: '16px', padding: '8px 16px', background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text)' }}>Buy now</button>
          </div>
          <p className="compare-note">Everything is 16px regular. Eyes don't know where to land.</p>
        </div>

        <div className="compare-good">
          <div className="compare-badge good">Good — clear hierarchy</div>
          <div style={{ background: 'var(--surface)', borderRadius: '10px', padding: '16px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: 'var(--text)' }}>Product Name</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>A great product for everyone.</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)', marginBottom: '16px' }}>$49.00</div>
            <button style={{ fontSize: '14px', fontWeight: 600, padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Buy now</button>
          </div>
          <p className="compare-note">Name 18/bold, desc 14/muted, price 24/bold/accent, CTA filled. Eyes flow naturally.</p>
        </div>
      </div>

      <div className="insight-box">
        <strong>The squint test:</strong> Blur your eyes so the UI becomes fuzzy. Can you still tell what the most important element is? If not, the hierarchy is broken.
      </div>
    </section>
  )
}
