import { showToast, showTostError500 } from "../../helpers/myToast";
import axios from "axios";
import API from "../../helpers/api";

const storeActions = {
  addStore: (product) => {
    return (dispatch) => {
      try {
        const { data } = axios.get(API + "/stores");
        // console.log("data", data);
      } catch (err) {
        console.log(err);
        showTostError500();
      }

      dispatch({ type: "ADD_PRODUCT_TO_CART", payload: product });
    };
  },
  increaseQuantity: (idItem, number) => {
    return (dispatch) => {
      dispatch({ type: "INCREASE_QUANTITY", payload: { idItem, number } });
    };
  },

  deleteProductFromCart: (product) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_PRODUCT_FROM_CART", payload: product });
    };
  },
  clearCart: () => {
    return (dispatch) => {
      dispatch({ type: "CLEAR_CART" });
    };
  },
  reloadCartLS: (cartLS) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/reloadCartLS", { cartLS });
        if (data.success) dispatch({ type: "RELOAD_CART", payload: data.response });
        else {
          showToast("error", "reload Cart fail --> " + data.error);
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },

  rateStore: (storeId, numberRate, token) => {
    return (dispatch) => {

      // console.log(token)

      try {
        const response = axios.put(API + "/storeRate/" + storeId, {numberRate}, {
          headers:{
              'Authorization': 'Bearer ' +token 
          }
        }
        )
        console.log("respuesta de rate", response.data);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  
};

export default storeActions;
