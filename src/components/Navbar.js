import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
    <div className="navbar-brand">
      Note App
    </div>

    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to='/' exact className="nav-link">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/about' className="nav-link">
          About
        </NavLink>
      </li>
    </ul>
  </nav>
)

