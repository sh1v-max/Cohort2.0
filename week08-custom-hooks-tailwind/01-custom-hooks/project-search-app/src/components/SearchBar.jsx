import { usePrevious } from '../hooks/usePrevious'

export function SearchBar({ value, onChange, loading }) {
  const previous = usePrevious(value)

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search GitHub users... (debounced 500ms)"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {loading && <span className="search-spinner">⟳</span>}
      </div>

      {previous && previous !== value && (
        <p className="previous-hint">
          Previous search: <strong>{previous}</strong>
        </p>
      )}
    </div>
  )
}
