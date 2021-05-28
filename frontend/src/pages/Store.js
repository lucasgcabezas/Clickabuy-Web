import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Product from "../components/Product"
import productsActions from "../redux/actions/productsActions"
import {NavLink} from 'react-router-dom'
const Store = (props) => {
    const { getProductsFromStore } = props
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetchProductsData()
    }, [])
    const fetchProductsData = async () => {
        const response = await getProductsFromStore("60b02937f2502c1690e05c35")
        setProducts(response)
    }
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
                    ? <div>
                        <h1>no products</h1>
                    </div>
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

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore
}
export default connect(null, mapDispatchToProps)(Store)