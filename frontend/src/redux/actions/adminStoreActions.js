import { showToast, showTostError500 } from "../../helpers/myToast";
import axios from "axios";
import API from "../../helpers/api";

const adminStoreActions = {
  getStoresByUser: (token) => {
    return  async (dispatch) => {
      try {
        const { data } = await axios.get(API + "/storesByUser", objInputsValues, {
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data.response;//devuelve un array con todas las tiendas que tiene el usuario
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  addStore: (token,objInputsValues) => { //esta adaptado para que el logo se cargue por inputFile
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/stores", objInputsValues, {
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data.response;//devuelve el nuevo store creado 
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  editStore: (token,idStore,objInputsValues) => {
    return async (dispatch) => {
      /* 
        nameStore, description, category  ,storeHero, logoStore;
        para este vas a tener que usar el formData (mirar el signUp) y este seria el 2do parametro
        usar como key (propiedad) esos nombres de variable, solo se van a actualizar aquellas que tengan un valor, si queres podes mandarlo como undefined o null las demas
      */
      try {
        const { data } = await axios.put(API + "/store/" + idStore, objInputsValues, {
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data.response;//devuelve el nuevo store modificado
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  deleteStore: (token,idStore) => {//Cuidado, este borrar el store y los productos que tiene el store
    return async(dispatch) => {
      try {
        const { data } = await axios.delete(API + "/store/" + idStore,  {
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data.response;//devuelve el store borrado, este  (usarlo si se quiere)
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },

  modifyOwners:(token,idStore,body) => { //action solo puede tener como valor "addOwner" o "deleteOwner" , debe enviarse con el email del usuario que sera dueño de la tienda tambien
    return async (dispatch) => {
        try {
        const {action,emailOtherUser} = body;
          const { data } = await axios.put(API + "/modifyOwnerOfStore/" + idStore,{action,emailOtherUser} ,{
              headers: { "Authorization": "Bearer "+token },
          });
          if(data.success)
              return data.response;//devuelve el store con los owners actualizados
          else
              showToast("error",data.error);
        } catch (err) {
          console.log(err);
          showTostError500();
        }
      };
  },
  addProduct:(token,body) => {  // la imagen debe estar hosteada en esta
    return async (dispatch) => {
        const {description,price,stock,productImg,nameProduct,storeId} = body;
        try {
          const { data } = await axios.post(API + "/products" ,{description,price,stock,productImg,nameProduct,storeId} ,{
              headers: { "Authorization": "Bearer "+token },
          });
          if(data.success)
              return data.response;//devuelve el producto creado, (usarlo si se quiere)
          else
              showToast("error",data.error);
        } catch (err) {
          console.log(err);
          showTostError500();
        }
      };
  },

  editProduct:(token,idProduct,body) => { //solo se modifican aquellas  que no sean null
    return async (dispatch) => {
        let {description,price,stock,productImg,nameProduct,storeId} = body;
        try {
          const { data } = await axios.post(API + "/product/"+idProduct ,{description,price,stock,productImg,nameProduct,storeId} ,{
              headers: { "Authorization": "Bearer "+token },
          });
          if(data.success)
              return data.response;//devuelve el producto actualizado
          else
              showToast("error",data.error);
        } catch (err) {
          console.log(err);
          showTostError500();
        }
      };
  },

  deleteProduct:(token,idProduct,body) => { //solo se modifican aquellas  que no sean null
    return async (dispatch) => {
        let {storeId} = req.body;
        try {
          const { data } = await axios.post(API + "/product/"+idProduct ,{storeId} ,{
              headers: { "Authorization": "Bearer "+token },
          });
          if(data.success)
              return data.response;//devuelve el producto borrado (usarlo si se quiere)
          else
              showToast("error",data.error);
        } catch (err) {
          console.log(err);
          showTostError500();
        }
      };
  },

  getProductsFromStore: (idStore) => {
    return async (dispatch, getState) => {
        try {
            const {data} = await axios.get(API+"/productsFromStore/"+idStore)               
            return data.response;
        } catch (error) {
            console.log(err);
            showTostError500();
        }
    }
},
};






export default adminStoreActions;
