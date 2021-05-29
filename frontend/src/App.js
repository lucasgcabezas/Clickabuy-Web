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
import "react-toastify/dist/ReactToastify.css";
import Buys from './pages/Buys'

const App = () => {
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
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
