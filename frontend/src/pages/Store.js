import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Product from "../components/Product"
import productsActions from "../redux/actions/productsActions"
import ReactStars from "react-rating-stars-component"
import { NavLink } from 'react-router-dom'
import Header from "../components/Header"
import Footer from '../components/Footer'
import storeActions from "../redux/actions/storeActions"

const Store = (props) => {
    const { getProductsFromStore } = props
    const idParams = props.match.params.id
    const [store, setStore] = useState({ rate: [] })

    const [stars, setStars] = useState(0)
    const [ver, setVer] = useState(false)
    const [cantRate, setCantRate] = useState(store.rate.length)

    useEffect(() => {
        !props.storesForCategory.length ? props.history.push('/') : setStore(props.storesForCategory.find(store => store._id === idParams))
        getProductsFromStore(idParams)
    }, [])

    useEffect(() => {
        let ratingCounter = 0
        let starsValue = 0
        store.rate.forEach(rating => {
            let numberOfRate = rating.vote || 0
            ratingCounter = ratingCounter + numberOfRate
        })
        let numberForDividir = 0
        if (store.rate.length > 0) {
            numberForDividir = store.rate.length
        }
        starsValue = ratingCounter / numberForDividir
        setStars(starsValue)
        if (!isNaN(starsValue)) {
            setVer(true)
            setCantRate(store.rate.length)
        }
    }, [store])


    const ratingChanged = (newRating, storeId) => {
        props.rateStore(storeId, newRating, props.userLogged.token)
        setCantRate(
            cantRate + 1
        )
    }

    var placeholderStoreInput = `Search products in ${store.nameStore}`

    return (
        <div className="contenedorStore">
            <Header />
            <div style={{ backgroundImage: `url('${store.storeHero}')` }} className="storeHero">
                <div className="contenedorInfoStorePage">
                    <div style={{ backgroundImage: `url('../assets/${store.logoStore}')` }} className="storeLogoStore"></div>
                    <h1>{store.nameStore}</h1>
                    <div className="contenedorFindProductStore">
                        <input type="text" className="inputSearchStore" placeholder={placeholderStoreInput} name="" id="buscar" onChange={(e) => { props.filter(e.target.value) }} />
                        <span className="material-icons-outlined iconSearchStore">search</span>
                    </div>
                </div>
            </div>


            <div className='buscador'>

                <div className="contenedorInfoCards">
                    <div className="contenedorFiltrosStore">
                        <div style={{ width: '100%', textAlign: 'center', marginTop: 60 }}>
                            <span> Rate us </span>

                        </div>
                        <div className="storeStars">

                            {
                                ver
                                    ? <ReactStars

                                        count={5}
                                        // onChange={() => ratingChanged(value, store._id)}
                                        onChange={(e) => ratingChanged(e, store._id)}
                                        size={32}
                                        isHalf={true}
                                        edit={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        // activeColor="#48d1be"
                                        color="#444444"
                                        value={stars}
                                    />
                                    : store.rate.length === 0
                                        ? <ReactStars
                                            count={5}
                                            // onChange={() => ratingChanged(value, store._id)}
                                            onChange={(e) => ratingChanged(e, store._id)}
                                            size={32}
                                            isHalf={true}
                                            edit={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                            // activeColor="#48d1be"
                                            color="#444444"
                                            value={0}
                                        />
                                        : <span>Loading</span>
                            }

                            < span style={{ fontSize: 12, verticalAlign: 'center', marginTop: 5, marginLeft: 5, color: '#777777' }} >( {store.rate && cantRate} )</span>
                        </div>

                    </div>
                    <div className="containerCards">
                        {props.filterProducts.length === 0
                            ? <div> <h2>No products</h2> </div>
                            : props.filterProducts.map(product => {
                                return (
                                    <div key={product._id}>
                                        <Product product={product} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        storesForCategory: state.categoryReducer.stores,
        products: state.productReducer.products,
        filterProducts: state.productReducer.filterProducts,
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore,
    filter: productsActions.filterProducts,
    rateStore: storeActions.rateStore

}
export default connect(mapStateToProps, mapDispatchToProps)(Store)