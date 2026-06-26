export function WhiteSpace() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">05</span>
        <div>
          <h2 className="section-title">White Space</h2>
          <p className="section-desc">When in doubt, add more space. Cramped UI feels cheap and stressful. Spacious UI feels premium and calm.</p>
        </div>
      </div>

      {/* padding comparison */}
      <div className="card">
        <h3 className="card-label">Card Padding — how much is right?</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {[
            { p: '4px',  label: 'p-1 (4px)',  verdict: '✗ too tight' },
            { p: '8px',  label: 'p-2 (8px)',  verdict: '✗ still cramped' },
            { p: '16px', label: 'p-4 (16px)', verdict: '✓ minimum for cards' },
            { p: '24px', label: 'p-6 (24px)', verdict: '✓ comfortable' },
            { p: '32px', label: 'p-8 (32px)', verdict: '✓ premium feel' },
          ].map(({ p, label, verdict }) => (
            <div key={p} style={{ flex: '1 1 140px' }}>
              <div style={{
                padding: p,
                background: 'var(--surface)',
                border: `1px solid ${verdict.startsWith('✓') ? 'var(--border)' : '#fca5a5'}`,
                borderRadius: '8px',
                marginBottom: '6px',
              }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>Card</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Some text here.</div>
              </div>
              <code style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</code>
              <div style={{ fontSize: '11px', color: verdict.startsWith('✓') ? 'var(--success)' : '#dc2626', fontWeight: 600 }}>{verdict}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Line length */}
      <div className="card">
        <h3 className="card-label">Line Length — don't let text stretch too wide</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', marginBottom: '6px', textTransform: 'uppercase' }}>✗ Too wide (no max-width)</div>
            <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, background: 'var(--surface-alt)', padding: '12px', borderRadius: '8px', border: '1px solid #fca5a5' }}>
              When lines of text are too long, the reader's eye has to travel far to the right and then find the start of the next line. This creates fatigue. Studies show that optimal line length for body text is between 50 and 75 characters per line. Beyond that, readability drops significantly.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', marginBottom: '6px', textTransform: 'uppercase' }}>✓ Capped at ~65 characters (max-width: 65ch)</div>
            <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, maxWidth: '65ch', background: 'var(--surface-alt)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              When lines of text are too long, the reader's eye has to travel far to the right and then find the start of the next line. This creates fatigue. Studies show that optimal line length for body text is between 50 and 75 characters per line.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>In Tailwind: <code style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '1px 5px', borderRadius: '4px', fontSize: '11px' }}>max-w-prose</code></p>
          </div>
        </div>
      </div>

      {/* Section spacing */}
      <div className="card">
        <h3 className="card-label">Section Spacing — separate sections visually</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ padding: '12px', background: 'var(--surface)', border: '1px solid #fca5a5', borderRadius: '8px 8px 0 0' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Section A</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Content here</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--surface)', border: '1px solid #fca5a5', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Section B</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Content here</div>
          </div>
        </div>
        <p style={{ fontSize: '12px', color: '#dc2626', margin: '6px 0 16px' }}>✗ Sections are glued together — hard to visually separate.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Section A</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Content here</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Section B</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Content here</div>
          </div>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '6px' }}>✓ 48px gap — sections breathe. Each feels like a distinct unit.</p>
      </div>

      <div className="insight-box">
        <strong>Premium brands use more space, not less.</strong> Compare Apple.com to a cluttered e-commerce page. Same elements — completely different feel. Space signals confidence.
      </div>
    </section>
  )
}
