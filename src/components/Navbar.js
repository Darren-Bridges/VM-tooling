import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar primary-navbar navbar-expand-lg navbar-light bg-white sticky-top" style={{ borderBottom: '1px solid #F0F0F0' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <small className="text-muted">VM Translations</small>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
