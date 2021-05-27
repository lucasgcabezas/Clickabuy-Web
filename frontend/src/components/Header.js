import React from 'react'

const Header = () => {
        return(
            <header className="headerContainer">
                <div className="menu-logo">
                    <div className="logo">Logo</div>
                    <nav className="menu-options">
                        <h2>Home</h2>
                        <h2>Categories</h2>
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
            </header>   
        )
}

export default Header 