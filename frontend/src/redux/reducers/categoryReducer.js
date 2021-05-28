const initialState = {
    stores: [],
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORES_BY_CATEGORY':
            return {
                ...state,
                stores: action.payload
            }
            break

        default:
            return state
    }
}

export default categoryReducer