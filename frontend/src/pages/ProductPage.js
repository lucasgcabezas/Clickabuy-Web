import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from '../components/Header'
import Reviews from "../components/Reviews"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import Footer from '../components/Footer'

const ProductPage = (props) => {
    const { products, cart, addProductToCart, deleteProductFromCart } = props
    const idOfProduct = props.match.params.id
    
    const productSelected = products.find(product => product._id === idOfProduct)

    const [reviews, setReviews] = useState(productSelected.reviews)

    // console.log(reviews)

    return (
        <>
            <Header />
            <div className="productPageContainer">
                <div className="productPageCard" >
                    <div className="productPageCardInfo">
                        <div style={{ backgroundImage: `url(${productSelected.productImg})` }} className="productPageImg" ></div>
                        <div className="productPageTitlePrice">
                            <div className="productPageTitle" >
                                <span>{productSelected.nameProduct}</span>
                            </div>
                            <div className="productPagePrice">
                                <span>$ {(productSelected.price).toFixed(2)}</span>
                            </div>
                            <div className="productPageStock">
                                {
                                    productSelected.stock < 10
                                        ? <span>Last {productSelected.stock} units</span>
                                        : <span>{productSelected.stock} units in stock</span>
                                }

                            </div>
                            {cart.find(item => item._id === productSelected._id)
                                ?
                                <button className="buttonAddProduct" onClick={() => deleteProductFromCart(productSelected)}>- remove from cart</button>
                                :
                                <button className="buttonAddProduct" onClick={() => addProductToCart(productSelected)}>+ Add Product</button>
                            }
                        </div>
                    </div>
                    <p>{productSelected.description}</p>
                    
                    <Reviews product={productSelected._id} reviews={reviews} setReviews={setReviews} productSelected={productSelected}/>
                </div >
            </div>
            <Footer/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        cart: state.cartReducer.cart

    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore,
    addProductToCart: cartActions.addProductToCart,
    deleteProductFromCart: cartActions.deleteProductFromCart
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)

