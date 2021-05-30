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
        <Categories />
        {/* {props.userLogged && <> */}
        {/* <div className="categoriesDropdown">Categories</div> */}
        {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <Categories/>

            </Dropdown.Item>
            {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          {/* </Dropdown.Menu>
        </Dropdown> */}
        <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined iconCart">shopping_cart</span></NavLink>
        {/* <Link to="/" className="navegadores"><span >Log out</span></Link> */}
        {/* onClick={() => props.signOut()} */}
        {/* </>} */}
        {/* {!props.userLogged && <> */}
        <NavLink to="/signUp" className="navegadores"><span className="material-icons-outlined iconUser">account_circle</span></NavLink>
        {/* </>} */}
      </div>
    </header>
  );
};

export default Header;
