import React from 'react';
import './index.css';

function UserCard(props) {
    return (
        <div className="user-card">
            <h3>{props.name}</h3>
            <p className="role">Role: {props.role}</p>
            <p className="email">Email: {props.email}</p>
        </div>
    );
}

function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Company Directory</h1>
            <p>Below are reusable `UserCard` components!</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <UserCard name="Alice Johnson" role="Software Engineer" email="alice@example.com" />
                <UserCard name="Bob Smith" role="Product Manager" email="bob@example.com" />
                <UserCard name="Charlie Davis" role="UX Designer" email="charlie@example.com" />
            </div>
        </div>
    );
}

export default App;