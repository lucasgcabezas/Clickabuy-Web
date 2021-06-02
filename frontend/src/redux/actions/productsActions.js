import axios from 'axios'

const productsActions = {
    getProductsFromStore: (idStore) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/productsFromStore/' + idStore)
                dispatch({ type: 'FETCH_PRODUCTS', payload: response.data.response })
            } catch (error) {
                console.log(error)
            }
        }
    },
    getAllProducts: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                dispatch({ type: 'FETCH_ALL_PRODUCTS', payload: response.data.response })
            } catch (error) {
                console.log(error)
            }
        }
    },
    filterProducts: (value) => {
        return (dispatch, getstate) => {
            dispatch({ type: 'FILTER_PRODUCTS', payload: value })
        }
    },
    likeProduct: (token, idProduct) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/likeproduct', { idProduct }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                return response.data.response
                // console.log(response.data.response)
            } catch (error) {
                console.log(error)
                // toast.error("Oops! Something went wrong")
            }
        }
    },
    addReview: (inputreview, id) => {
        // console.log({inputreview, id})
        var review = inputreview.review
        var vote = inputreview.vote
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/reviews/' + id, { review, vote }, {
                    headers: {
                        'Authorization': 'Bearer ' + inputreview.token
                    }
                })
                return response.data.response
            } catch (error) {
                console.log(error)
                // toast.error("Oops! Something went wrong")
            }
        }
    },
    editReview: (idProduct, review, idReview) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/reviews/' + idProduct, { review, idReview })
                return response.data.response.reviews
            } catch (error) {
                console.log(error)
                // toast.error("Oops! Something went wrong")
            }
        }
    },
    deleteReview: (idProduct, idReview) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/reviews/' + idProduct, {
                    data: {
                        idReview: idReview
                    }
                })
                // console.log(response.data.response)
                return response.data.response
            } catch (error) {
                console.log(error)
                // toast.error("Oops! Something went wrong")
            }
        }
    },
    rateProduct: (productId, numberRate, token) => {
        return (dispatch) => {

            try {
                const response = axios.put('http://localhost:4000/api/productRate/' + productId, { numberRate }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                }
                )
                console.log("respuesta de rate", response.data);
            } catch (err) {
                console.log(err);
                // showTostError500();
            }
        };
    },
}
export default productsActions