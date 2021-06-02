const initialState = {
    products: [],
    filterProducts: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload
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
        default:
            return state
    }
}

export default productReducer