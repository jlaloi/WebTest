import React from 'react';
import { Link } from 'react-router';

const Header = () => (
    <div className="header">
        <h1>Header</h1>
        <Link to="/">Home</Link> - <Link to="/example/1">Home 1</Link> - <Link to="/example/2">Home 2</Link> - <Link to="/user">User</Link> - <Link to="/store">Store</Link> - <a href="/logout"><em>Logout</em></a>
    </div>
);

const Layout = (props) => (
    <div>
        <Header />
        <div className="uiview">
            {props.children}
        </div>
    </div>
);

export default Layout;
