const initialState = {
    storesByUser: [],
    productsByUserStore: [],
    preloaderProduct: true,
    preloaderStore: true,
};

const adminStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADMIN_STORES":
            return {
                ...state,
                storesByUser: action.payload,
                preloaderStore: false
            };

        case "DELETE_ONE_STORE":
            return {
                ...state,
                storesByUser: state.storesByUser.filter(store => store._id !== action.payload._id)
            };

        case "ADMIN_PRODUCTS":
            return {
                ...state,
                productsByUserStore: action.payload,
                preloaderProduct: false

            };

        case "DELETE_ONE_PRODUCT":
            return {
                ...state,
                productsByUserStore: state.productsByUserStore.filter(prod => prod._id !== action.payload._id)
            };

        case "EDIT_ONE_PRODUCT":
            return {
                ...state,
                productsByUserStore: state.productsByUserStore.filter(prod => prod._id !== action.payload._id),
                productsByUserStore: [...state.productsByUserStore, action.payload]
            };

        case "ADMIN_PRODUCTS_CLEAN":
            return {
                ...state,
                productsByUserStore: action.payload,
                preloaderProduct: true
            };

        case "ADMIN_STORES_CLEAN":
            return {
                ...state,
                storesByUser: action.payload,
                preloaderStore: true
            };



        default:
            return state;
    }
};
export default adminStoreReducer;
