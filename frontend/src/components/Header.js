import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="headerContainer">
      <div className="menu-logo">
        <div className="logo">Logo</div>
        <nav className="menu-options">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Category</NavLink>

          {/* <h2>Categories</h2> */}
        </nav>
      </div>
      <div className="menu-login">
        <div className="user-login">UserImg</div>
        <nav className="login-options">
          <>
            <NavLink to="/SignIn">
              {" "}
              <h2>Sign In</h2>
            </NavLink>

            <NavLink to="/SignUp">
              {" "}
              <h2>Sign Up</h2>
            </NavLink>
          </>
        </nav>
      </div>
    </header>
  );
};

export default Header;
