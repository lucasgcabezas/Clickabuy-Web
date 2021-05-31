import Home from '../pages/Home'
import Category from '../pages/Category'
import Store from '../pages/Store'
import Buys from '../pages/Buys'
//import SignIn from '../pages/SignIn'
//import SignUp from '../pages/SignUp'

import { Route, Switch, Redirect } from "react-router-dom";

const routesProtected = {
    routerUserDontLogged: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/category/:id" component={Category} />
                <Route path="/store/:id" component={Store} />
                <Route path="/buys" component={Buys} />
                {/*<Route path="/SignIn" component={SignIn} />
                <Route path="/SignUp" component={SignUp} />*/}
                
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
                <Redirect to="/" />
            </Switch>
        )
    },

    routerUserLoggedAdminStore: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/category/:id" component={Category} />
                <Route path="/store/:id" component={Store} />
                <Route path="/buys" component={Buys} />
                <Route path="/SignUpStore" component={SignUpStore} />
                <Redirect to="/" />
            </Switch>
        )
    }
}

const getRoutesByRole = (role) => {
    if (role === "notLogged || commonUser")
        return routesProtected.routerUserDontLogged();
    if (role === "student" || role === "coach" || role === "noRole")
        return routesProtected.routerUserLoggedCommon();
    if (role === "admin")
        return routesProtected.routerUserLoggedAdmin();
}


export default getRoutesByRole;