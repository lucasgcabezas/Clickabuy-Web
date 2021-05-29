const initialState = {
    stores: [],
    categories: [],
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORES_BY_CATEGORY':
            return {
                ...state,
                stores: action.payload
            }
            break
        case 'FETCH_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}

export default categoryReducer