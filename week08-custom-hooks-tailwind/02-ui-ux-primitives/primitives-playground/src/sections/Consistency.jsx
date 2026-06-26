export function Consistency() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">06</span>
        <div>
          <h2 className="section-title">Consistency</h2>
          <p className="section-desc">Every similar element must look and behave identically. Inconsistency signals that nobody was paying attention.</p>
        </div>
      </div>

      {/* Border radius consistency */}
      <div className="card">
        <h3 className="card-label">Border Radius — pick one and stick with it</h3>
        <div className="compare-grid" style={{ margin: 0 }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', marginBottom: '8px', textTransform: 'uppercase' }}>✗ Inconsistent — mixed radii</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={{ padding: '8px 16px', border: 'none', borderRadius: '2px', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>Save</button>
              <button style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '20px', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
              <div style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Card</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Content</div>
              </div>
              <input style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '50px', background: 'var(--surface)', color: 'var(--text)', fontSize: '13px', outline: 'none' }} defaultValue="Input field" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', marginBottom: '8px', textTransform: 'uppercase' }}>✓ Consistent — 8px everywhere</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>Save</button>
              <button style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
              <div style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Card</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Content</div>
              </div>
              <input style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface)', color: 'var(--text)', fontSize: '13px', outline: 'none' }} defaultValue="Input field" />
            </div>
          </div>
        </div>
      </div>

      {/* Button consistency */}
      <div className="card">
        <h3 className="card-label">Button Hierarchy — same type, same look</h3>
        <div className="compare-grid" style={{ margin: 0 }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', marginBottom: '8px', textTransform: 'uppercase' }}>✗ Three "primary" buttons — all different</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Save</button>
              <button style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 400, cursor: 'pointer', fontSize: '13px' }}>Submit</button>
              <button style={{ padding: '12px 24px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '20px', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>Confirm</button>
            </div>
            <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '8px' }}>Different colors, sizes, radius, weights. User is confused about what "primary" means.</p>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', marginBottom: '8px', textTransform: 'uppercase' }}>✓ All primary buttons identical</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Save</button>
              <button style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Submit</button>
              <button style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Confirm</button>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '8px' }}>Same color, size, radius, weight. User instantly knows this is a "do the main thing" button.</p>
          </div>
        </div>
      </div>

      {/* Consistency checklist */}
      <div className="card">
        <h3 className="card-label">Consistency Checklist — audit your projects</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            'All primary buttons: same color, padding, border-radius, font weight',
            'All secondary buttons: same style (outline or ghost — pick one)',
            'All inputs: same height, padding, border style, focus ring',
            'All error messages: same color (red), same position (below the field)',
            'All card border-radius values: identical',
            'All icon sizes within the same context: identical (16px OR 20px — not both)',
            'All link colors: one color, same underline behavior',
            'All section headings: same font size and weight',
          ].map((item, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginTop: '2px', accentColor: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--text)' }}>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="insight-box">
        <strong>How to enforce it:</strong> Build a component library (even a small one). When every button in your app is the same <code>&lt;Button&gt;</code> component, consistency is automatic — you can't forget.
      </div>
    </section>
  )
}
