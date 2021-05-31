import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'

const Product = ({ product, addProductToCart, deleteProductFromCart, cart }) => {
    const { stock, description, nameProduct, price, productImg } = product
    const [color, setColor] = useState(false)
    // const likes = async () => {
    //     if (!userLogged) {
    //         toast.error("You must be logged in to like a post")
    //     } else{
    //         setLoadingHeart(false)
    //         const response = await props.like(userLogged.token, store._id)
    //         setItinerariesLikes(response.userLiked)
    //         setColor(response.heart)
    //         setLoadingHeart(true)
    //     }
    // }
    return (
        <div className="cardProduct">
            {/* <img src={productImg} alt="" style={{width:"60%"}}/> */}
            <div style={{ backgroundImage: `url('${productImg}')` }} className="productImg"></div>
            <div className="cardProductInfo">
                <h3>{nameProduct}</h3>
                {/* <p className="descriptionProduct">{description}</p> */}
                <p>Price: ${price}</p>
                <p>Stock: {stock}</p>
            </div>
            <div /*onClick={(loadingHeart ? likes : null)}*/ className="contenedorIconoCorazon">
                {color ? <FaHeart className="iconoCorazon" /> : <FaRegHeart className="iconoCorazon" />}
            </div>
            <div>
                <button className="buttonAddProduct">View More</button>
            </div>
            {/* {cart.find(item => item._id === product._id)
                ?
                <button className="buttonRemoveProduct" onClick={() => deleteProductFromCart(product)}>- Remove product</button>
                :
                <button className="buttonAddProduct" onClick={() => addProductToCart(product)}>+ Add Product</button>
            } */}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}
const mapDispatchToProps = {
    addProductToCart: cartActions.addProductToCart,
    deleteProductFromCart: cartActions.deleteProductFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)