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

const Header = (props) => {
  // const usuarioImage = props.userLogged ? <div style={{backgroundImage: "url('./assets" + props.userLogged.userImg + "')"}} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>
  const { pathname } = useLocation();
  const [productFilter, setProductFilter] = useState('')
  console.log('Soy producFilter', productFilter)
  console.log('Soy todos los productos', props.products)

  function handleFilter(e){
    setProductFilter(e.target.value)
    let productosFiltrados = props.products.filter((producto)=>{
      return(
        producto.nameProduct = e.target.value
      )
    })
    console.log(productosFiltrados)
  } 

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
      <div className={pathname === "/" ? "contenedorFiltro" : "contenedorFiltro2"}>
        <input type="text" className="filtroHome" placeholder="Search products" onChange={(e) => handleFilter(e)}></input>
        <NavLink to="/products"><span className="material-icons-outlined iconSearchHome">search</span></NavLink>

      </div>
      <div className="contenedorNavs">
        <NavLink exact to="/" className="navegadores">Home</NavLink>
        <Categories />
        <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined iconCart">shopping_cart</span></NavLink>
        <UserDropdown/>
        {/* onClick={() => props.signOut()} */}
        {/* </>} */}
        {/* {!props.userLogged && <> */}
        {/* <NavLink to="/signUp" className="navegadores">{usuarioImage}</NavLink>
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Categories
        </Dropdown.Toggle>
            <Dropdown.Menu>
                {props.categories.length === 0
                    ? <span>No Categories</span>
                    : props.categories.map((category, index) => {
                        return (
                            <div onClick={()=> getCurrentCategory(category._id)}>
                                <Link to={`/category/${category._id}`} className="nameCategory" key={index}><span>{category.nameCategory}</span></Link>
                            </div>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown> */}
        {/* </>} */}
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
