import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Product from "../components/Product"
import productsActions from "../redux/actions/productsActions"
import {NavLink} from 'react-router-dom'
const Store = (props) => {
    const { getProductsFromStore } = props
    const idParams = props.match.params.id
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetchProductsData()
    }, [])
    const fetchProductsData = async () => {
        const response = await getProductsFromStore(idParams)
        setProducts(response)
    }
    // if (this.props.cities.length === 0) {
    //     this.props.history.push('/cities')
    // } else{
    //         setProducts(storesForCategory.find(store => store._id === idParams))
    // }
    // this.props.cargarItinerarios(this.props.match.params.id)
    return (
        <body>
            <NavLink to="/">Home</NavLink>
            <div className="containerStore">
                <div className="bannerStore">
                    <h1>NAME STORE</h1>
                </div>
            </div>
            <div className="containerCards">
                {
                    products.length === 0 
                    ? <div> <h1>no products</h1> </div>
                    : products.map(product => {
                        return (
                            <div>
                                <Product product={product} />
                            </div>

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
        storesForCategory: state.categoryReducer.stores
    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)