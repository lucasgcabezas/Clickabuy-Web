const initialState = { userLogged: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("email", JSON.stringify(action.payload.email));

      return {
        ...state,
        userLogged: action.payload,
      };

    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        userLogged: null,
      };

    default:
      return state;
  }
};
export default authReducer;
