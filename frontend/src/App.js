import "./sofia.css";
import Home from "./pages/Home";
import "./styles.css";
import "./css/lucas.css";
import Category from "./pages/Category";
import Store from "./pages/Store";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import authActions from "./redux/actions/authActions";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App = (props) => {
  const token = localStorage.getItem("token");
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage
  if (!props.userLogged && token && token !== "undefined") {
    alert("foreceLogn");
    props.loginForced(JSON.parse(token), props.history);
    return null;
  }

  /* let role = "notLogged";
  if (props.userLogged) role = props.userLogged.role; */

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/category" component={Category} />
        <Route path="/store" component={Store} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    userLogged: state.authReducer.userLogged,
  };
};
const mapDispatchToProps = {
  loginForced: authActions.loginForced,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/* export default App; */
