import { useState } from 'react'

function InteractiveButton() {
  const [state, setState] = useState('default')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['default', 'hover', 'active', 'loading', 'disabled', 'success'].map(s => (
          <button
            key={s}
            onClick={() => setState(s)}
            style={{
              padding: '4px 10px', fontSize: '11px', borderRadius: '6px', cursor: 'pointer',
              background: state === s ? 'var(--accent)' : 'var(--surface-alt)',
              color: state === s ? '#fff' : 'var(--text-muted)',
              border: state === s ? 'none' : '1px solid var(--border)',
              fontWeight: state === s ? 600 : 400,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        disabled={state === 'disabled' || state === 'loading'}
        style={{
          padding: '10px 24px',
          fontSize: '14px',
          fontWeight: 600,
          borderRadius: '8px',
          border: 'none',
          cursor: state === 'disabled' || state === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
          minWidth: '140px',

          ...(state === 'default' && {
            background: 'var(--accent)', color: '#fff',
          }),
          ...(state === 'hover' && {
            background: '#1d4ed8', color: '#fff',
            transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
          }),
          ...(state === 'active' && {
            background: '#1e40af', color: '#fff', transform: 'scale(0.97)',
          }),
          ...(state === 'loading' && {
            background: 'var(--accent)', color: '#fff', opacity: 0.8,
          }),
          ...(state === 'disabled' && {
            background: 'var(--surface-alt)', color: 'var(--text-muted)', opacity: 0.6,
          }),
          ...(state === 'success' && {
            background: '#16a34a', color: '#fff',
          }),
        }}
      >
        {state === 'loading' ? '⟳ Saving...' : state === 'success' ? '✓ Saved!' : 'Save changes'}
      </button>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Click the state labels above to preview each button state.
      </p>
    </div>
  )
}

function InteractiveInput() {
  const [state, setState] = useState('default')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['default', 'focus', 'error', 'disabled'].map(s => (
          <button
            key={s}
            onClick={() => setState(s)}
            style={{
              padding: '4px 10px', fontSize: '11px', borderRadius: '6px', cursor: 'pointer',
              background: state === s ? 'var(--accent)' : 'var(--surface-alt)',
              color: state === s ? '#fff' : 'var(--text-muted)',
              border: state === s ? 'none' : '1px solid var(--border)',
              fontWeight: state === s ? 600 : 400,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>
          Email address
        </label>
        <input
          disabled={state === 'disabled'}
          defaultValue={state === 'error' ? 'not-an-email' : ''}
          placeholder="you@example.com"
          readOnly
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '14px',
            borderRadius: '8px',
            outline: 'none',
            transition: 'all 0.15s',
            ...(state === 'default' && {
              border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)',
            }),
            ...(state === 'focus' && {
              border: '2px solid var(--accent)', background: 'var(--surface)',
              boxShadow: '0 0 0 3px var(--accent-light)', color: 'var(--text)',
            }),
            ...(state === 'error' && {
              border: '1.5px solid #dc2626', background: 'var(--surface)',
              boxShadow: '0 0 0 3px #fee2e2', color: 'var(--text)',
            }),
            ...(state === 'disabled' && {
              border: '1px solid var(--border)', background: 'var(--surface-alt)',
              color: 'var(--text-muted)', cursor: 'not-allowed',
            }),
          }}
        />
        {state === 'error' && (
          <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>Please enter a valid email address.</p>
        )}
        {state === 'focus' && (
          <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '4px' }}>We'll send a confirmation to this address.</p>
        )}
      </div>
    </div>
  )
}

export function FeedbackStates() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-number">07</span>
        <div>
          <h2 className="section-title">Feedback &amp; States</h2>
          <p className="section-desc">Every interactive element needs states. Users must always know what's happening, what's possible, and what went wrong.</p>
        </div>
      </div>

      {/* Interactive button */}
      <div className="card">
        <h3 className="card-label">Button States — interactive demo</h3>
        <InteractiveButton />
      </div>

      {/* Interactive input */}
      <div className="card">
        <h3 className="card-label">Input States — interactive demo</h3>
        <InteractiveInput />
      </div>

      {/* Async operation states */}
      <div className="card">
        <h3 className="card-label">Async Operation States — never leave the user in the dark</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>

          {/* Loading */}
          <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '12px', background: 'var(--surface-alt)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>Loading</div>
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ height: '14px', background: 'var(--surface-alt)', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite' }} />
              <div style={{ height: '12px', background: 'var(--surface-alt)', borderRadius: '4px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
              <div style={{ height: '12px', background: 'var(--surface-alt)', borderRadius: '4px', width: '85%', animation: 'pulse 1.5s ease-in-out infinite' }} />
            </div>
          </div>

          {/* Empty */}
          <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '12px', background: 'var(--surface-alt)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>Empty</div>
            <div style={{ padding: '24px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📭</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>No items yet</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Add something to get started</div>
            </div>
          </div>

          {/* Error */}
          <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '12px', background: 'var(--surface-alt)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>Error</div>
            <div style={{ padding: '16px', background: '#fef2f2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '20px' }}>⚠️</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#dc2626' }}>Failed to load</div>
              <div style={{ fontSize: '12px', color: '#9b1c1c' }}>Check your connection and retry.</div>
              <button style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', alignSelf: 'flex-start' }}>Retry</button>
            </div>
          </div>

          {/* Success */}
          <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '12px', background: 'var(--surface-alt)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>Success</div>
            <div style={{ padding: '16px', background: '#f0fdf4', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '20px' }}>✅</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a' }}>Saved successfully</div>
              <div style={{ fontSize: '12px', color: '#166534' }}>Your changes have been applied.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="insight-box">
        <strong>Never show a blank screen.</strong> Every state needs a UI: loading → skeleton, empty → empty state with CTA, error → error message with retry, success → confirmation. Missing any of these breaks user trust.
      </div>
    </section>
  )
}
