import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <NavbarAuth />
  </nav>
);

const NavbarAuth =() => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/recipe/add">Add Recipe</NavLink>
    </li>
    <li>
      <NavLink to="/profile">Profile</NavLink>
    </li>
    <li>
      <button>SignOut</button>
    </li>
  </ul>
)
const NavbarUnAuth = () => (
  <ul>
    <li className="nav-links">
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li className="nav-links">
      <NavLink to="/search">Search</NavLink>
    </li>
    <li className="nav-links">
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li className="nav-links">
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

export default Navbar;
