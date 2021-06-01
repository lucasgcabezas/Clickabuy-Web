import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Product from "../components/Product"
import productsActions from "../redux/actions/productsActions"
import {NavLink} from 'react-router-dom'
import Header from "../components/Header"
import Footer from '../components/Footer'

const Store = (props) => {
    const { getProductsFromStore } = props
    const idParams = props.match.params.id
    const [store, setStore] = useState([])

    useEffect(() => {
        !props.storesForCategory.length ? props.history.push('/') : setStore(props.storesForCategory.find(store => store._id === idParams))
        getProductsFromStore(idParams)
    }, [])
    var placeholderStoreInput = `Search products in ${store.nameStore}`
    return (
        <div className="contenedorStore">
            <Header />
            <div style={{ backgroundImage: `url('${store.storeHero}')` }} className="storeHero">
                <div className="contenedorInfoStorePage">
                    <div style={{ backgroundImage: `url('../assets/${store.logoStore}')` }} className="storeLogoStore"></div>
                    <h1>{store.nameStore}</h1>
                    <div className="contenedorFindProductStore">
                        <input type="text" className="inputSearchStore" placeholder={placeholderStoreInput}  name="" id="buscar" onChange={(e) => {props.filter(e.target.value)}}/>
                        <span className="material-icons-outlined iconSearchStore">search</span>
                    </div>
                </div>
            </div>
            <div className="contenedorInfoCards">
                <div className="contenedorFiltrosStore">

                </div>
                <div className="containerCards">
                    {
                        props.products.length === 0
                            ? <div> <h1>no products</h1> </div>
                            : props.products.map(product => {
                                return (
                                    <div key={product._id}>
                                        <Product product={product} user={props.userLogged.productsLiked}/>
                                    </div>

                                )
                            }
                            )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        storesForCategory: state.categoryReducer.stores,
        products: state.productReducer.products,
        filterProducts: state.productReducer.filterProducts,
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore,
    filter: productsActions.filterProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)