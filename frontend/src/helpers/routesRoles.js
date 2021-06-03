
import Home from "../pages/Home";
import Category from "../pages/Category";
import Store from "../pages/Store";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SignUpStore from "../pages/SignUpStore";
import SignInAdmin from "../pages/SignInAdmin";
import Buys from "../pages/Buys";
import MyStores from "../pages/MyStores";
import MyStoreView from "../pages/MyStoreView";
import ProductPage from "../pages/ProductPage";
import MyFilters from "../components/MyFilters";
import MyProgressBar from "../components/MyProgressBar";
import Favorites from "../pages/Favorites";
import FilterProductsStore from '../components/FilterProductsStore'
import AdminApp from '../pages/AdminApp'


import { Route, Switch, Redirect } from "react-router-dom";

const routesProtected = {
    routerUserDontLogged: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/category/:id" component={Category} />
                <Route path="/store/:id" component={Store} />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="/buys" component={Buys} />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/SignUp" component={SignUp} />
                
                {/*<Route path="/SignInAdmin" component={SignInAdmin} />*/}
                
                <Route path="/myFilters" component={MyFilters} />
                <Route path="/products" component={FilterProductsStore} />
                <Route path="/myProgressBar" component={MyProgressBar} />
                
                <Redirect to="/" />

            </Switch>
        )
    },
    routerUserLoggedCommon: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/category/:id" component={Category} />
                <Route path="/store/:id" component={Store} />
                <Route path="/buys" component={Buys} />
                <Route path="/SignInAdmin" component={SignInAdmin} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/SignUpStore" component={SignUpStore} />
                <Route path="/myStores" component={MyStores} />
                <Route path="/myStoreView" component={MyStoreView} />
                <Route path="/myFilters" component={MyFilters} />
                <Redirect to="/" />
            </Switch>
        )
    },

    routerUserLoggedAdminStores: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/category/:id" component={Category} />
                <Route path="/store/:id" component={Store} />
                <Route path="/buys" component={Buys} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/SignUpStore" component={SignUpStore} />
                <Route path="/myStores" component={MyStores} />
                <Route path="/myStoreView" component={MyStoreView} />
                <Route path="/myFilters" component={MyFilters} />
                <Redirect to="/" />
            </Switch>
        )
    },

    routerUserLoggedAdminApp: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/category/:id" component={Category} />
                <Route path="/store/:id" component={Store} />
                <Route path="/buys" component={Buys} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/SignUpStore" component={SignUpStore} />
                <Route path="/myStores" component={MyStores} />
                <Route path="/myStoreView" component={MyStoreView} />
                <Route path="/myFilters" component={MyFilters} />
                <Route path="/adminApp" component={AdminApp} />
                <Redirect to="/" />
            </Switch>
        )
    }
}

const getRoutesByRole = (role) => {
    if (role === "notLogged")
        return routesProtected.routerUserDontLogged();
    if (role === "commonUser" )
        return routesProtected.routerUserLoggedCommon();
    if (role === "adminStores")
        return routesProtected.routerUserLoggedAdminStores();
    if (role === "adminApp")
        return routesProtected.routerUserLoggedAdminApp();
}


export default getRoutesByRole;