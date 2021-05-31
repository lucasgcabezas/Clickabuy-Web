import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Product from "../components/Product"
import productsActions from "../redux/actions/productsActions"
import Header from '../components/Header'
import { Link } from "react-router-dom"

const Store = (props) => {
    const { getProductsFromStore } = props
    const idParams = props.match.params.id
    const [store, setStore] = useState([])

    useEffect(() => {
        !props.storesForCategory.length ? props.history.push('/') : setStore(props.storesForCategory.find(store => store._id === idParams))
        getProductsFromStore(idParams)
    }, [])


    console.log(store)

    return (
        <body>
            <Header />
            {/* <div className="containerStore"> */}
            {/* <div className="bannerStore"> */}
            <div style={{ backgroundImage: `url('${store.storeHero}')` }} className="storeHero">
                <h1>{store.nameStore}</h1>
            </div>
            {/* <p>{store.description}</p> */}
            {/* </div> */}
            {/* </div> */}
            <div className="containerCards">
                {
                    props.products.length === 0
                        ? <div> <h1>no products</h1> </div>
                        : props.products.map(product => {
                            return (
                                <Link key={product._id} to={`/product/${product._id}`}>
                                    <Product product={product} />
                                </Link>

                            )
                        }
                        )
                }
            </div>
        </body>
    )
}
const mapStateToProps = state => {
    return {
        storesForCategory: state.categoryReducer.stores,
        products: state.productReducer.products
    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)