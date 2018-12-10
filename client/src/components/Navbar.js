import React from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Signout';


const Navbar = ({ session }) => (
  <nav>
    {(session && session.getCurrentUser) ? <NavbarAuth session={session}/> : <NavbarUnAuth />}
  </nav>
);

const NavbarAuth =({ session }) => (
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
      <li className="last-li">
        <Signout />
        <div className="sub-text">Signed in as: <strong>{session.getCurrentUser.username}</strong></div>
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
