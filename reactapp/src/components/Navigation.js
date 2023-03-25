// Navigation Component
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    return (
        <div>
            <h2>Navigation</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                {props.isLoggedIn && <li><Link to="/logout">Logout</Link></li>}
            </ul>
        </div>
    );
}

export default Navigation;