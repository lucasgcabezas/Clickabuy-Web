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
    return (
        <>
        <Header />
        <body>
            {/* <Header/> */}
            <div className="containerStore">
                {/* <div className="bannerStore"> */}
                    



                    <div style={{backgroundImage: `url('${store.storeHero}')`}} className="storeHero">
                    <h1>{store.nameStore}</h1>
                    <p>{store.storeImg}</p>
                    <p>{store.description}</p>
                </div>
            </div>
            <div className='buscador'>
                <input className='txtBuscador' type="Buscar" name="" id="buscar" placeholder="Find your perfect product!" onChange={(e) => {propfilter(e.target.value)}} />
                
                <div className="containerCards">
                    {props.products.length === 0 
                    ? <h2 className='cartelSinProductos'>We don´t have any product that matches your search! Try another one!</h2> 
                    : props.products.map((product, id) => {
                        return (
                            <div key={id}>
                                <Product product={product} />
                            </div>
                            )
                    })}
                </div>
            </div>

            {/* <div className="containerCards">
                {
                    props.products.length === 0 
                    ? <div> <h1>no products</h1> </div>
                    : props.products.map(product => {
                        return (
                            <div key={product._id}>
                                <Product product={product} />
                            </div>

                        )
                    }
                    )
                }
            </div> */}
        </body>
        <Footer />
        </>
    )
}
const mapStateToProps = state => {
    return {
        storesForCategory: state.categoryReducer.stores,
        products: state.productReducer.products,
        filterProducts: state.productReducer.filterProducts
    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore,
    filter: productsActions.filterProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)