export function StatusBar({ width, height, isDark, tick }) {
  const breakpoint =
    width < 640  ? 'Mobile'  :
    width < 1024 ? 'Tablet'  :
                   'Desktop'

  return (
    <div className="status-bar">
      <span className="status-item">
        📐 {width} × {height}px — <strong>{breakpoint}</strong>
      </span>
      <span className="status-item">
        {isDark ? '🌙 Dark' : '☀️ Light'} mode
      </span>
      <span className="status-item">
        🔄 Auto-refresh tick #{tick}
      </span>
    </div>
  )
}
