const initialState = {
    stores: []
}
const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALLSTORES':
            return{
                ...state,
                stores: action.payload
            }
            
    
        default:
            return state
    }
}
export default storeReducer