export function UserCard({ user, isBookmarked, onBookmark }) {
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-avatar"
      />

      <div className="user-info">
        <div className="user-header">
          <div>
            <h2 className="user-name">{user.name || user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="user-login"
            >
              @{user.login}
            </a>
          </div>

          <button
            onClick={() => onBookmark(user)}
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>

        {user.bio && <p className="user-bio">{user.bio}</p>}

        <div className="user-stats">
          <span className="stat">
            <strong>{user.public_repos}</strong> repos
          </span>
          <span className="stat">
            <strong>{user.followers}</strong> followers
          </span>
          <span className="stat">
            <strong>{user.following}</strong> following
          </span>
        </div>

        <div className="user-meta">
          {user.location && <span>📍 {user.location}</span>}
          {user.blog && (
            <a href={user.blog} target="_blank" rel="noreferrer">
              🔗 {user.blog}
            </a>
          )}
          {user.company && <span>🏢 {user.company}</span>}
        </div>
      </div>
    </div>
  )
}
