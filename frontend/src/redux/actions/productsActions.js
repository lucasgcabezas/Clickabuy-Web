import axios from 'axios'

const productsActions = {
    getProductsFromStore: (idStore) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/productsFromStore/'+idStore)
                return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },
}
export default productsActions