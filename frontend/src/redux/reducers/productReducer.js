const initialState = {
    products: []
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
                products: action.payload
            } 
        default:
            return state
    }
}
export default productReducer