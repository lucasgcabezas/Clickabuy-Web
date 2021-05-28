import './sofia.css'
import Home from './pages/Home'
import './styles.css'
import './css/lucas.css'
import Category from "./pages/Category"
import Store from './pages/Store'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/category" component={Category}/>
        <Route path="/store" component={Store}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
