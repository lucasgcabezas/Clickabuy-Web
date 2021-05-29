import React from "react";
import { NavLink, Link } from "react-router-dom";
import Categories from "./Categories";
const Header = () => {
  return (
    <header className="headerContainer">
      <div className="contenedorLogo">
        <div className="clickabuyLogo" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/clickabuylogo.png')" }}></div>
        <h1>clickabuy</h1>
      </div>
      <div className="contenedorFiltro">
        <input type="text" className="filtroHome" placeholder="Find your perfect product"></input>
        <span className="material-icons-outlined iconSearchHome">search</span>
      </div>
      <div className="contenedorNavs">
        <NavLink exact to="/" className="navegadores">Home</NavLink>
        {/* {props.userLogged && <> */}
        <div className="categoriesDropdown">Categories</div>
        <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined">shopping_cart</span></NavLink>
        {/* <Link to="/" className="navegadores"><span >Log out</span></Link> */}
        {/* onClick={() => props.signOut()} */}
        {/* </>} */}
        {/* {!props.userLogged && <> */}
        <NavLink to="/signUp" className="navegadores">Account</NavLink>
        {/* </>} */}
        <Categories/>
      </div>
    </header>
  );
};

export default Header;
