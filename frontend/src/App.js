import "./css/sofia.css";
import "./css/julio.css";
import "./css/lucas.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Store from "./pages/Store";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import authActions from "./redux/actions/authActions";
import SignUpStore from "./pages/SignUpStore";
import SignInAdmin from "./pages/SignInAdmin";
import Buys from "./pages/Buys";
import { connect } from "react-redux";
import cartActions from "./redux/actions/cartActions";
import Header from "./components/Header";
import MyStores from "./pages/MyStores";
import MyStoreView from "./pages/MyStoreView";
import MyFilters from "./components/MyFilters";

const App = ({ cart, reloadCartLS, loginForced, userLogged, history }) => {
  if (cart.length === 0) {
    let cartLS = localStorage.getItem("cartLS");

    if (cartLS !== "undefined" && cartLS !== null) {
      cartLS = JSON.parse(cartLS);
      if (cartLS instanceof Array && cartLS.length !== 0) reloadCartLS(cartLS);
    } else localStorage.removeItem("cartLS");
  }

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage

  console.log("userLogged", userLogged);
  console.log("token", token);

  if (!userLogged && token && token !== "undefined") {
    alert("foreceLogn");
    loginForced(JSON.parse(token), email, history);
    return alert("volvi");
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/category/:id" component={Category} />
        <Route path="/store/:id" component={Store} />
        <Route path="/buys" component={Buys} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/SignUpStore" component={SignUpStore} />
        <Route path="/SignInAdmin" component={SignInAdmin} />
        <Route path="/myStores" component={MyStores} />
        <Route path="/myStoreView" component={MyStoreView} />
        <Route path="/myFilters" component={MyFilters} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    userLogged: state.authReducer.userLogged,
  };
};
const mapDispatchToProps = {
  reloadCartLS: cartActions.reloadCartLS,
  loginForced: authActions.loginForced,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
