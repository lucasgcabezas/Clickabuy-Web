import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Categories from "./Categories";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import productsActions from "../redux/actions/productsActions";
import "../../src/gracia.css";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTags } from 'react-icons/fa'

const Header = (props) => {
  const { userLogged } = props
  // const usuarioImage = userLogged ? <div style={{ backgroundImage: "url('./assets" + userLogged.userImg + "')" }} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>
  const usuarioImage = userLogged ? <div style={{ backgroundImage: `url('${userLogged.userImg.url}')` }} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>
  const { pathname } = useLocation();
  const [productFilter, setProductFilter] = useState('')
  console.log('Soy producFilter', productFilter)
  console.log('Soy todos los productos', props.products)

  function handleFilter(e) {
    setProductFilter(e.target.value)
    let productosFiltrados = props.products.filter((producto) => {
      return (
        producto.nameProduct = e.target.value
      )
    })
    console.log(productosFiltrados)
  }

  return (
    <header className="headerContainer">
      <div className="contenedorFlexHome">
        <Link className="linkLogoHome">
          <div className="contenedorLogo">
            <FaTags className="logoHome" />
            <h1>clickabuy</h1>
          </div>
        </Link>
        <div className="contenedorNavs">
          <NavLink exact to="/" className="navegadores">Home</NavLink>
          {!userLogged ?
            <>
              <NavLink to="/signUp" className="navegadores">Sign Up</NavLink>
              <NavLink to="/SignIn" className="navegadores">Sign In</NavLink>
            </>
            :
            <>
              <Link to="/" className="navegadores"><span onClick={() => props.logOut()}>Sign Out</span></Link>
            </>
          }
          <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined iconCart">shopping_cart</span></NavLink>
          <Link to="/favorites" className="navegadores"><FaRegHeart className="iconFavoritesHome" /></Link>
          <div>{usuarioImage}</div>
        </div>
      </div>
      <div className="contenedorSearch">
        <Categories />
        <div className={pathname === "/" ? "contenedorFiltro" : "contenedorFiltro2"}>
          <input type="text" className="filtroHome" placeholder="Search products" onChange={(e) => handleFilter(e)}></input>
          <NavLink to="/products"><span className="material-icons-outlined iconSearchHome">search</span></NavLink>
        </div>
        {userLogged && <Link to="/SignUpStore" className="linkRegisterStore">Register your Store</Link>}
        {/* <Link to="/myStoresView"></Link> */}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    userLogged: state.authReducer.userLogged,
    filterProducts: state.productReducer.filterProducts
  };
};

const mapDispatchToProps = {
  logOut: authActions.logOutUser,
  filtrar: productsActions.filterProducts,
  getAllProducts: productsActions.getAllProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
