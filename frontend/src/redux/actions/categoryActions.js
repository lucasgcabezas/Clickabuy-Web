import axios from 'axios'

const categoryActions = {
    getStoresbByCategory: (categoryId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/store/' + categoryId)
                if (response.data.success) {
                    // console.log(response.data.response)
                    dispatch({ type: 'STORES_BY_CATEGORY', payload: response.data.response})
                } else {
                    alert( response.data.error)
                }
            } catch {
                console.log('error')
            }
        }
    },
}
export default categoryActions
