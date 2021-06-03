const initialState = {
    products: [],
    filterProducts: [],
    productsCurrentStore: []
    // favorites: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_STORE':
            return {
                ...state,
                productsCurrentStore: action.payload
            }
        case 'FETCH_ALL_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                filterProducts: action.payload
            } 
        case 'FILTER_PRODUCTS':
            return{
                ...state,
                filterProducts: state.products.filter(product =>{return product.nameProduct.toLowerCase().indexOf(action.payload.toString().toLowerCase().trim()) === 0})
            }
        case 'UPDATE_PRODUCT':
            var newProducts = state.products.map(product => {
                if (product._id === action.payload._id)
                    return action.payload;
                return product;
            })           
            return{
                ...state,
                products: newProducts,
            }
        case 'UPDATE_CURRENT_STORE':
            var newProducts = state.productsCurrentStore.map(product => {
                if (product._id === action.payload._id)
                    return action.payload;
                return product;
            })
            return{
                ...state,
                productsCurrentStore: newProducts
            }
        default:
            return state
    }
}

export default productReducer