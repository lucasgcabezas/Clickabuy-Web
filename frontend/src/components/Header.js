import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Categories from "./Categories";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import productsActions from "../redux/actions/productsActions";
import "../../src/gracia.css";
import { useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import Product from './Product'

import 'boxicons'
import { FaHeart, FaRegHeart, FaTags } from 'react-icons/fa'
const Header = (props) => {
  const { userLogged } = props
  const usuarioImage = userLogged ? <div style={{ backgroundImage: "url('./assets" + userLogged.userImg + "')" }} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>

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
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABXUlEQVRYR+3YYVHEMBCG4fcUIAEcgARQABJAAaAAcIADcAA4AAdIQAIOYD7mjhnStLubTed6M+TnTbJ9+iVp2luxsLZamIedAN0Dp8BBIL0P4Bp4Doypdi0TEuYyUfQRuEiMH0zZJ7CXKQikUGVCX0nMZngzygt6A16BM+DQiW5CeUBaEyq+aefAw1woC/SyTqW8/vtcSVmgO+C2koZ+u3GmpG7u6bNAWjcnlQtHEgotdAukYpk1VN6LmZQHpKJKRE9h7bKjwFTVuk6ivKCkYTB8FLUt0OhC3yZIKG0YbZzfVoJ0au/3np+JeoPnXAnSon1aEkiWyNGQtZtT1nJetaLK59tPnalX2DmTqmIs0FzTN4rxgHqjJjFeUC+UiYmAsigXJgpqRbkxLaAoKoRpBXlRYUwGZKGaMFnQGKoZ0wOkGsfA1fr80Kf4n9eJ6LmyE/9+RG+qa///hKw4vwF9Jkkl3/xkYgAAAABJRU5ErkJggg==" /> */}
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
          {/* <div> */}
          <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined iconCart">shopping_cart</span></NavLink>
          <Link to="/favorites" className="navegadores"><FaRegHeart className="iconFavoritesHome" /></Link>
          {/* </div> */}
          <div>{usuarioImage}</div>
        </div>
      </div>
      <div className="contenedorSearch">
        <Categories />
        <div className={pathname === "/" ? "contenedorFiltro" : "contenedorFiltro2"}>
          <input type="text" className="filtroHome" placeholder="Search products" onChange={(e) => handleFilter(e)}></input>
          <NavLink to="/products"><span className="material-icons-outlined iconSearchHome">search</span></NavLink>
        </div>
        {/* <div className="contenedorNavs">
          <NavLink exact to="/" className="navegadores">Home</NavLink>
          <UserDropdown />
        </div> */}
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
  /* forceLogIn: usersActions.actionForceLogIn, */
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
/* export default Header; */
