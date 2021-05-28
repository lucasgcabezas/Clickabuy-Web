import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
        return(
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
                                <h2>Sign Up</h2>
                                <h2>Sign In</h2>
                            </>
                    </nav>
                </div>
                <NavLink to="/buys"><h3>Buys</h3></NavLink>
            </header>   
        )
}

export default Header 