export function BookmarkList({ bookmarks, onRemove, onSelect, lastRefreshed }) {
  if (bookmarks.length === 0) {
    return (
      <div className="bookmarks-panel">
        <h3 className="panel-title">Bookmarks</h3>
        <p className="empty-text">No bookmarks yet. Search for a user and click ☆ to save.</p>
      </div>
    )
  }

  return (
    <div className="bookmarks-panel">
      <div className="panel-header">
        <h3 className="panel-title">Bookmarks ({bookmarks.length})</h3>
        {lastRefreshed && (
          <span className="refresh-time">
            Refreshed: {new Date(lastRefreshed).toLocaleTimeString()}
          </span>
        )}
      </div>

      <ul className="bookmark-list">
        {bookmarks.map(user => (
          <li key={user.login} className="bookmark-item">
            <button className="bookmark-select" onClick={() => onSelect(user.login)}>
              <img src={user.avatar_url} alt={user.login} className="bookmark-avatar" />
              <div className="bookmark-info">
                <span className="bookmark-name">{user.name || user.login}</span>
                <span className="bookmark-login">@{user.login}</span>
              </div>
            </button>
            <button
              className="bookmark-remove"
              onClick={() => onRemove(user.login)}
              title="Remove bookmark"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
