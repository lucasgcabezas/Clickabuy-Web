import React from "react";
import { NavLink, Link } from "react-router-dom";
import Categories from "./Categories";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import "../../src/gracia.css";
const Header = (props) => {
  const usuarioImage = props.userLogged ? <div style={{backgroundImage: "url('./assets" + props.userLogged.userImg + "')"}} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>
  
  return (
    <header className="headerContainer">
      <div className="contenedorLogo">
        <div
          className="clickabuyLogo"
          style={{
            backgroundImage:
              "url('https://webdesing881317710.files.wordpress.com/2021/05/clickabuylogo.png')",
          }}
        ></div>
        <h1>clickabuy</h1>
      </div>
      <div className="contenedorFiltro">
        <input type="text" className="filtroHome" placeholder="Find your perfect product"></input>
        <span className="material-icons-outlined iconSearchHome">search</span>
      </div>
      <div className="contenedorNavs">
        <NavLink exact to="/" className="navegadores">Home</NavLink>
        <Categories />
        <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined iconCart">shopping_cart</span></NavLink>
        <Link to="/" className="navegadores"><span onClick={() => props.logOut()}>Log out</span></Link>
        {/* onClick={() => props.signOut()} */}
        {/* </>} */}
        {/* {!props.userLogged && <> */}
        <NavLink to="/signUp" className="navegadores">{usuarioImage}</NavLink>
        {/* </>} */}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userLogged: state.authReducer.userLogged,
  };
};

const mapDispatchToProps = {
  logOut: authActions.logOutUser,
  /* forceLogIn: usersActions.actionForceLogIn, */
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
/* export default Header; */
