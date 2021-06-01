import { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import productsActions from "../redux/actions/productsActions"

const MainHome = (props) => {
    const { products } = props
    useEffect(() => {
        props.getAllProducts()
    }, [])
    // console.log(products)
    const productsFiltered = products.filter((product, index) => index <= 3)
    // console.log(productsFiltered)
    return (
        <>
            <div className="contenedorPublicity">
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/new-incomes.png')" }} className="imagePublicity">
                    {/* <Link to="/category"></Link> */}
                    <button className="buttonPulicity1"><p>CHECK IT OUT!</p></button>
                </div>
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/new-incomes-1.png')" }} className="imagePublicity2">
                    {/* <Link></Link> */}
                    <button className="buttonPulicity2"><p>CHECK IT OUT!</p></button>
                </div>
            </div>
            <div className="contenedorFlashDeals">
                <h3>Flash Deals</h3>
                <div className="contenedorflashDealsInfo">
                    {
                        productsFiltered.map(product => {
                            return (
                                <div className="productHome">
                                    <div style={{backgroundImage: `url('${product.productImg}')`}} className="imageProductHome">
                                        <span className="descuentoHome">-20%</span>
                                    </div>
                                    <div className="productHomeInfo">
                                        <span>{product.nameProduct}</span>
                                        <span>${product.price}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="contenedorDownload">
                <div>
                    <div className="downloadAppInfo">
                        <p>Download clickabuy app</p>
                        <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/download.png')" }} className="downloadApp"></div>
                        <p>for a better experience.</p>
                    </div>
                    {/* <img src="https://webdesing881317710.files.wordpress.com/2021/05/downloadclickabuy.png" alt="" className="phone"/> */}
                    {/* <div className="relative"> */}
                    <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/downloadclickabuy.png')" }} className="phone"></div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return{
        products: state.productReducer.products
    }
}
const mapDispatchToProps = {
    getAllProducts: productsActions.getAllProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(MainHome)