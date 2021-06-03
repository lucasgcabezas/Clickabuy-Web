import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Favorites = (props) => {
    const { products, userLogged } = props
    console.log(products)
    const favorites = products.filter(product => {
        if (product.userLiked.find(email => email === userLogged.email))
            return true;
        return false;
    })
    return (
        <div className="contenedorFavoritos">
            <Header />
            <div className="contenedorInfoFavoritos">
                {
                    favorites.map(favorite => {
                        return (
                            <div className="cardProduct">
                                <div style={{ backgroundImage: `url('${favorite.productImg}')` }} className="productImg"></div>
                                <div className="cardProductInfo">
                                    <h3>{favorite.nameProduct}</h3>
                                    <p>Price: ${favorite.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        userLogged: state.authReducer.userLogged
    }
}
export default connect(mapStateToProps)(Favorites)