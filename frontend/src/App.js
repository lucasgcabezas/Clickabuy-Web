import './css/sofia.css'
import './css/julio.css'
import "./css/lucas.css";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Category from "./pages/Category";
import Store from "./pages/Store";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import authActions from "./redux/actions/authActions";
import SignUpStore from "./components/SignUpStore";
import SignInAdmin from "./components/SignInAdmin";
import Buys from './pages/Buys'
import {connect} from 'react-redux'
// import reloadCartLS from './redux/actions/cartActions'
import cartActions from './redux/actions/cartActions';

const App = ({cart,reloadCartLS, loginForced}) => {
  
  if(cart.length === 0){
    const cartLS = localStorage.getItem("cartLS");
    if(cartLS !== "undefined" || cartLS !== null){
      
      reloadCartLS(cartLS);
    }
  }

  const token = localStorage.getItem("token");
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage

  if (!props.userLogged && token && token !== "undefined") {
    alert("foreceLogn");
    loginForced(JSON.parse(token), props.history);
    return null;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/category/:id" component={Category} />
        <Route path="/store/:id" component={Store} />
        <Route path="/buys" component={Buys} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/SignUpStore" component={SignUpStore} />
        <Route path="/SignInAdmin" component={SignInAdmin} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    cart : state.cartReducer.cart,
    userLogged: state.authReducer.userLogged,
  }
}
const  mapDispatchToProps = {
  reloadCartLS : cartActions.reloadCartLS,
  loginForced: authActions.loginForced
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

