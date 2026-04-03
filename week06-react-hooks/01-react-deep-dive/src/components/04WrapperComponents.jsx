export default function WrapperComponents() {
  return (
    <div className="card">
      <h2>4. Wrapper Components (Children Prop)</h2>
      <p>passing components inside other components.</p>

      <div className="wrong-example card">
        <h3>Common Mistake (Prop Drilling for UI)</h3>
        {/* passing raw ui strings into props is inflexible */}
        <BadCard title="Warning" content="This is an error message." />
      </div>

      <div className="correct-example card">
        <h3>Correct (Using Children)</h3>
        {/* passing jsx between the opening and closing tags */}
        <GoodCard title="Success">
          <p>this is a highly customizable message.</p>
          <button>Click to claim reward</button>
        </GoodCard>
      </div>
    </div>
  );
}

// ❌ wrong way: hard to customize the inside of the card. 
// what if we want a button inside the content? we can't easily do it.
function BadCard({ title, content }) {
  return (
    <div style={{ padding: 10, border: '1px solid gray' }}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

// ✅ correct way: the component just provides the "shell", 
// and renders whatever is passed as `children` inside it.
function GoodCard({ title, children }) {
  return (
    <div style={{ padding: 10, border: '1px solid gray' }}>
      <h4>{title}</h4>
      <div style={{ padding: '10px', backgroundColor: '#444' }}>
        {children}
      </div>
    </div>
  );
}
