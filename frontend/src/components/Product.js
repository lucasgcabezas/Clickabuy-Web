import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productsActions from '../redux/actions/productsActions'
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component"


const Product = ({ product, addProductToCart, deleteProductFromCart, cart, user, likeProduct, userLogged }) => {
    // console.log(user)
    const { stock, description, nameProduct, price, productImg, _id } = product
    const [color, setColor] = useState(false)
    const [loadingHeart, setLoadingHeart] = useState(true)
    const [productsLiked, setProductsLiked] = useState(user)
    let history = useHistory()
    if (!productsLiked) {
        history.push('/')
    }
    useEffect(() => {

        userLogged ? (productsLiked.includes(user) && setColor(true)) : setColor(false)

    }, [productsLiked])

    // console.log(productsLiked)
    // console.log(productsLiked.includes(userLogged.productsLiked) && setColor(true))
    const likes = async () => {
        if (!userLogged) {
            alert("no podes likear")
        } else {
            setLoadingHeart(false)
            const response = await likeProduct(userLogged.token, _id)
            // console.log(response)
            setProductsLiked(response.productsLiked)
            setColor(response.heart)
            setLoadingHeart(true)
        }
    }

    const ratingChanged = (newRating, storeId) => {
        // props.rateStore(storeId, newRating, props.userLogged.token)
    }


    return (
        <div className="cardProduct">
            {/* <img src={productImg} alt="" style={{width:"60%"}}/> */}
            <div style={{ backgroundImage: `url('${productImg}')` }} className="productImg"></div>
            <div className="cardProductInfo">
                <h3>{nameProduct}</h3>
                {/* <p className="descriptionProduct">{description}</p> */}
                <p>Price: ${price}</p>
                <p>Stock: {stock}</p>
                <ReactStars
                    count={5}
                    // onChange={() => ratingChanged(value, store._id)}
                    // onChange={(e) => ratingChanged(e, store._id)}
                    size={32}
                    isHalf={true}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    // activeColor="#48d1be"
                    color="#444444"
                    value={5}
                />
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