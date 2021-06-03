import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {Link} from 'react-router-dom'

const Favorites = (props) => {
    const { products, userLogged } = props
    const favorites = products.filter(product => {
        if (userLogged && product.userLiked.find(email => email === userLogged.email))
            return true;
        return false;
    })
    return (
        <div className="contenedorFavoritos">
            <Header />
            <div className="contenedorInfoFavoritos">
                {
                    favorites.length === 0 
                    ? <div className="noFavorites">
                        <h2>You have no favorites yet</h2>
                        <Link to="/" className="linkExplore">GO EXPLORE!</Link>
                    </div>
                    : favorites.map(favorite => {
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