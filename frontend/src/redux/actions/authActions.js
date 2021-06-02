import axios from "axios";
import API from "../../helpers/api";
import { showToast, showTostError500 } from "../../helpers/myToast";

const authActions = {
  signUpUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        /*   debugger; */
        console.log("el formdata en actions", objInputsValues);

        const { data } = await axios.post(API + "/users", objInputsValues, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`);
          // console.log("data.response", data.response);
          /*     alert(`Welcome ${data.response.firstName} ${data.response.lastName}`); */
        } else {
          return console.log(data);
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  logInUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/login", objInputsValues);
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          /*    console.log("hola", data.response.userImg); */
          showToast(
            "success",
            `Welcome ${data.response.firstName} ${data.response.lastName}`
          ); /*  alert(`Welcome ${data.response.firstName} ${data.response.lastName}`); */
          /* debugger;  */
          // console.log("soy el daa response", data.response);
        } else {
          return data;
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  loginForced: (token) => {
    return async (dispatch) => {
      try {
        /*   debugger; */
        const { data } = await axios.get(API + "/relogin", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({
          type: "LOGIN_USER",
          payload: {
            ...data.response,
            token,
            // email,
          },
        });
        // showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`);
        /*  alert(`Welcome ${data.response.firstName} ${data.response.lastName}`); */
      } catch (err) {
        if (err.response && err.response.status === 401) {
          showToast("error", "What are you trying to do ??");
        }
        /*    localStorage.clear(); */
      }
    };
  },
  logOutUser: () => {
    return (dispatch) => {
      //showToast("info", "Come back later ", "top-right")
      dispatch({ type: "LOG_OUT" });
    };
  },
  // loginForced: (userLocalStorage) => {
  //   console.log(userLocalStorage)
  //   return async (dispatch, getState) => {
        // try {
        //     const response = await axios.get(API + "/relogin", {
        //         headers: {
        //             'Authorization': 'Bearer ' + userLocalStorage.token
        //         }
        //     })
        //     console.log(response)
        //     // dispatch({type: 'LOGIN_USER', payload: {...response.data.response, token:userLocalStorage.token}})
        // } catch (error) {
        //     if (error.response.status === 401) {
        //       showToast("error", "Oops! Something went wrong! You are not authorized to enter this page");
        //     }
        // }
    // }
// },

 
};

export default authActions;
