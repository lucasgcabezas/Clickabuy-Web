import "./sofia.css";
import Home from "./pages/Home";
import "./styles.css";
import "./css/lucas.css";
import Category from "./pages/Category";
import Store from "./pages/Store";
/* import ShopCart from "./components/ShopCart"; */

const App = () => {
  return (
    <>
      {/*  <ShopCart /> */}
      <Category />
      <Home />
      <Store />
    </>
  );
};

export default App;
