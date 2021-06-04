const initialState = {
    products: [],
    filterProducts: [],
    productsCurrentStore: [],
    filterProductCurrentStore: []
    // favorites: []
}

const productReducer = (state = initialState, action) => {
    const updateProducts = (productsUpdated, productsOutdated) => {
        let retorno = productsOutdated.map(productOutdated => {
            return productsUpdated.find(productUpdated => productUpdated._id === productOutdated._id)
        })
        return retorno;
    }
    let newFilterProductCurrentStore;
    let newFilterProducts;
    let newProductsCurrentStore;

    switch (action.type) {
        case 'FETCH_PRODUCTS_STORE':
            return {
                ...state,
                productsCurrentStore: action.payload,
                filterProductCurrentStore: action.payload
            }
        case 'FETCH_ALL_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                filterProducts: action.payload
            }
        case 'FILTER_PRODUCTS':
            newFilterProducts = state.products.filter(product => {
                return product.nameProduct.toLowerCase().indexOf(action.payload.toString().toLowerCase().trim()) === 0
            })
            return {
                ...state,
                filterProducts: newFilterProducts
            }
        case 'FILTER_PRODUCTS_CURRENT_STORE':


            if (action.payload === "")
                newFilterProductCurrentStore = state.productsCurrentStore;
            else {
                newFilterProductCurrentStore = state.productsCurrentStore.filter(product => {
                    return product.nameProduct.toLowerCase().indexOf(action.payload.toString().toLowerCase().trim()) === 0
                })
            }

            return {
                ...state,
                filterProductCurrentStore: newFilterProductCurrentStore
            }
        case 'UPDATE_PRODUCT_OF_ALL_PRODUCTS':
            var newProducts = state.products.map(product => {
                if (product._id === action.payload._id)
                    return action.payload;
                return product;
            })
            newFilterProductCurrentStore = updateProducts(newProducts, state.filterProductCurrentStore);
            newFilterProducts = updateProducts(newProducts, state.filterProducts);
            newProductsCurrentStore = updateProducts(newProducts, state.productsCurrentStore);

            return {
                ...state,
                products: newProducts,
                filterProducts: newFilterProducts,
                productsCurrentStore: newFilterProducts,
                filterProductCurrentStore: newProductsCurrentStore
            }
        /*case 'UPDATE_CURRENT_STORE':

            var newProducts = state.productsCurrentStore.map(product => {
                if (product._id === action.payload._id)
                    return action.payload;
                return product;
            })

            newFilterProductCurrentStore = state.filterProductCurrentStore.map(productFiltered => {
                return newProducts.find(product => product._id === productFiltered._id)
            })
            return {
                ...state,
                productsCurrentStore: newProducts,
                filterProductCurrentStore: newFilterProductCurrentStore
            }*/
        default:
            return state
    }
}

export default productReducer