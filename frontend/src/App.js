import "./sofia.css";
import Home from "./pages/Home";
import "./styles.css";
import "./css/lucas.css";
import Category from "./pages/Category";
import Store from "./pages/Store";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
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

export default App;
