const initialState = {
  storesByUser: [],
  productsByUserStore: []
};

const adminStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_STORES":
      return {
        ...state,
        storesByUser: action.payload,
      };
    case "ADMIN_PRODUCTS":
      return {
        ...state,
        productsByUserStore: action.payload,
      };

    case "DELETE_ONE_PRODUCT":
      return {
        ...state,
        productsByUserStore: state.productsByUserStore.filter(prod => prod._id !== action.payload._id)
      };



    default:
      return state;
  }
};
export default adminStoreReducer;
