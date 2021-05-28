import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Product from "../components/Product"
import productsActions from "../redux/actions/productsActions"

const Store = (props) => {
    const { getProductsFromStore } = props
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetchProductsData()
    }, [])
    const fetchProductsData = async () => {
        const response = await getProductsFromStore("60b02937f2502c1690e05c35")
        console.log(response)
        setProducts(response)
    }
    return (
        <body>
            <div className="containerStore">
                <div className="bannerStore">
                    <h1>NAME STORE</h1>
                </div>
            </div>
            <div className="containerCards">
                {
                    products.map(product => {
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