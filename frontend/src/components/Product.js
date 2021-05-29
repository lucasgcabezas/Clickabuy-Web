import {connect} from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const Product = ({ product,addProductToCart,deleteProductFromCart,cart }) => {
    console.log(cart)
    const { stock, description, nameProduct, price, productImg } = product
    return (
        <div className="cardProduct">
            <img src={productImg} alt="" style={{width:"60%"}}/>
            <div className="cardProductInfo">
                <h3>{nameProduct}</h3>
                <p className="descriptionProduct">{description}</p>
                <p>Stock: {stock}</p>
                <p>Price: {price}</p>
            </div>
            {cart.find(item=>item._id === product._id) 
            ?
            <button style={{backgroundColor:"red",color:"white"}} onClick={()=>deleteProductFromCart(product)}>+ remove product from cart</button>
            :
            <button className="buttonAddProduct" onClick={()=>addProductToCart(product)}>+ Add Product</button>
             }
            
            {/* addProductToCart(product) */}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        cart : state.cartReducer.cart
    }
}
const mapDispatchToProps = {
    addProductToCart : cartActions.addProductToCart,
    deleteProductFromCart : cartActions.deleteProductFromCart
}

export default connect(mapStateToProps,mapDispatchToProps)(Product)