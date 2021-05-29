import axios from "axios";
import API from "../../helpers/api";
import { showToast, showTostError500 } from "../../helpers/myToast";

const authActions = {
  signUpUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/users", objInputsValues);
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`);
          /*     alert(`Welcome ${data.response.firstName} ${data.response.lastName}`); */
          //showToast("success", `Welcome ${response.data.response.firstName} ${response.data.response.lastName}`);
        } else {
          return data;
        }
      } catch (err) {
        console.log(err);
        //showTostError500();
      }
    };
  },
  logInUser: (objInputsValues) => {
    return async (dispatch) => {
      /*    debugger; */
      try {
        const { data } = await axios.post(API + "/login", objInputsValues);
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`);
          /*  alert(`Welcome ${data.response.firstName} ${data.response.lastName}`); */
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
          },
        });
        showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`);
        /*  alert(`Welcome ${data.response.firstName} ${data.response.lastName}`); */
      } catch (err) {
        if (err.response && err.response.status === 401) {
          //showToast("error", "What are you trying to do ??")
        }
        localStorage.clear();
      }
    };
  },

  logOutUser: () => {
    return (dispatch) => {
      //showToast("info", "Come back later ", "top-right")
      dispatch({ type: "LOG_OUT" });
    };
  },
};

export default authActions;
