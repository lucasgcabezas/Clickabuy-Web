import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productsActions from '../redux/actions/productsActions'
import { useHistory } from "react-router-dom";

const Product = ({ product, addProductToCart, deleteProductFromCart, cart, likeProduct, userLogged }) => {
    const { stock, description, nameProduct, price, productImg, _id, userLiked } = product
    const [color, setColor] = useState(false)
    const [loadingHeart, setLoadingHeart] = useState(true)
    const [productsLiked, setProductsLiked] = useState(product.userLiked)

    useEffect(()=>{
        userLogged ? (productsLiked.includes(userLogged.email) && setColor(true)) : setColor(false)
    }, [productsLiked])

    const likes = async () => {
        if (!userLogged) {
            alert("no podes likear")
        } else{
            setLoadingHeart(false)
            const response = await likeProduct(userLogged.token, product._id)
            setProductsLiked(response.userLiked)
            setColor(response.heart)
            setLoadingHeart(true)
        }
    }
    // position: absolute;
    // inset: 0px auto auto -100px;
    // margin: 0px;
    // transform: translate(0px, 33px);
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
            <div onClick={(loadingHeart ? likes : null)} className="contenedorIconoCorazon">
                {color ? <FaHeart className="iconoCorazon" /> : <FaRegHeart className="iconoCorazon" />}
            </div>
            <Link to={`/product/${product._id}`} >
                <button className="buttonAddProduct">View More</button>
            </Link>
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
        cart: state.cartReducer.cart,
        userLogged: state.authReducer.userLogged
    }
}
const mapDispatchToProps = {
    addProductToCart: cartActions.addProductToCart,
    deleteProductFromCart: cartActions.deleteProductFromCart,
    likeProduct: productsActions.likeProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)