import axios from 'axios'

const categoryActions = {
    // getStoresbByCategory: (categoryId) => {
    //     console.log(categoryId)
    //     return async (dispatch, getState) => {
    //         try {
    //             const response = await axios.get('http://localhost:4000/api/store/' + categoryId)
    //             if (response.data.success) {
    //                 dispatch({ type: 'STORES_BY_CATEGORY', payload: response.data.response})
    //             } else {
    //                 alert( response.data.error)
    //             }
    //         } catch (error){
    //             console.log(error)
    //         }
    //     }
    // },
    getAllCategories:() => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/categories')
                // return response.data.response
                dispatch({type: 'FETCH_CATEGORIES', payload: response.data.response})
            } catch (error) {
                console.log(error)
            }
        }
    },
    getCurrentCategory: (id) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/store/' + id)
                if (response.data.success) {
                    // dispatch({ type: 'STORES_BY_CATEGORY', payload: response.data.response})
                    dispatch({type: 'CURRENT_CATEGORY', payload: {id: id, stores: response.data.response}})
                } else {
                    alert( response.data.error)
                }
            } catch (error){
                console.log(error)
            }
        }
    }
}
export default categoryActions
