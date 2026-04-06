import { useState } from 'react';

export default function HelperComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items] = useState(['React', 'Vue', 'Angular']);
  const [isLoading, setIsLoading] = useState(false);

  // simulate a loading state
  function handleFetch() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="card">
      <h2>10. Helper Components</h2>
      <p>small, reusable components that handle common UI patterns like conditional rendering, loading states, and list rendering.</p>

      {/* ✅ Correct: dedicated helper components */}
      <div className="correct-example card">
        <h3>Using Helper Components</h3>

        {/* 1. Conditional rendering helper */}
        <ShowIf condition={isLoggedIn}>
          <p style={{ color: 'lightgreen' }}>✅ Welcome back, user!</p>
        </ShowIf>
        <ShowIf condition={!isLoggedIn}>
          <p style={{ color: 'salmon' }}>❌ Please log in.</p>
        </ShowIf>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          toggle login
        </button>

        <hr style={{ margin: '12px 0', borderColor: '#555' }} />

        {/* 2. Loading state helper */}
        <button onClick={handleFetch} style={{ marginBottom: 8 }}>
          simulate fetch
        </button>
        <Loader isLoading={isLoading}>
          <p>✅ Data loaded successfully!</p>
        </Loader>

        <hr style={{ margin: '12px 0', borderColor: '#555' }} />

        {/* 3. List rendering helper */}
        <h4>Frameworks:</h4>
        <EachItem
          items={items}
          render={(item) => (
            <li key={item} style={{ padding: '2px 0' }}>
              {item}
            </li>
          )}
        />
      </div>

      {/* ❌ Wrong: inline spaghetti without helpers */}
      <div className="wrong-example card">
        <h3>Without Helpers (Messy Inline Logic)</h3>
        <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
{`// ❌ This gets unreadable fast:
{isLoading ? <Spinner /> : error ? <Error /> : data ? <Table /> : null}

// ✅ Instead, use a helper:
<Loader isLoading={isLoading}>
  <Table data={data} />
</Loader>`}
        </pre>
        <p>helper components keep your JSX clean. extract repeated patterns into small, focused components.</p>
      </div>
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────

// ShowIf: renders children only when condition is true
// avoids messy ternaries scattered across JSX
function ShowIf({ condition, children }) {
  if (!condition) return null;
  return <>{children}</>;
}

// Loader: shows a loading message while waiting, then renders children
function Loader({ isLoading, children }) {
  if (isLoading) {
    return <p style={{ color: '#aaa', fontStyle: 'italic' }}>⏳ Loading...</p>;
  }
  return <>{children}</>;
}

// EachItem: a render-prop helper for mapping over a list
// keeps the parent component clean by abstracting the .map() call
function EachItem({ items, render }) {
  if (!items || items.length === 0) {
    return <p style={{ color: '#aaa' }}>No items to display.</p>;
  }
  return <ul style={{ paddingLeft: 20 }}>{items.map(render)}</ul>;
}
