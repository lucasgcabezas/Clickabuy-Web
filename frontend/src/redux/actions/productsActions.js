import axios from 'axios'

const productsActions = {
    getProductsFromStore: (idStore) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/productsFromStore/'+idStore)               
                dispatch({type: 'FETCH_PRODUCTS', payload: response.data.response})
            } catch (error) {
                console.log(error)
            }
        }
    },
    getAllProducts:() => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                dispatch({type: 'FETCH_ALL_PRODUCTS', payload: response.data.response})
            } catch (error) {
                console.log(error)
            }
        }
    },
}
export default productsActions