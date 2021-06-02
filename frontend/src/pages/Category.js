import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

// import { useState } from 'react'
import categoryActions from '../redux/actions/categoryActions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import storeActions from '../redux/actions/storeActions'


const Category = (props) => {
    const { currentCategory } = props

    if (!props.currentCategory) {
        return <h1>cargando...</h1>
    }
    return (
        <>
            <Header />
            <div className="categoryContainer">
                <div className="categoryHeroImage" style={{ backgroundImage: `url('${currentCategory.bannerCategory}')` }}>
                    <div className="contenedorNameCategoryHero">
                        <div>
                            <span className="nameCategoryHero1">category</span>
                            <span className="nameCategoryHero2">{currentCategory.nameCategory}</span>
                        </div>
                    </div>
                </div>
                <div className="categoryStoresContainer">
                    <span>STORES</span>
                    <div className="categoryStoresSection">
                        {
                            props.storesForCategory.length === 0
                                ? <span>No hay disponibles</span>
                                : props.storesForCategory.map((store, i) => {
                                    let ratingCounter = 0

                                    store.rate.forEach(rating => {
                                        ratingCounter = ratingCounter + rating.vote
                                    })
                                    let starsValue = ratingCounter / store.rate.length

                                    return (
                                        <NavLink to={`/store/${store._id}`} className="linkStore categoryStoresCards" key={i} >
                                            <div>
                                                <div style={{ backgroundImage: `url('../assets/${store.logoStore}')` }} className="logoStoreCategory"></div>
                                                <span className="nameStoresCards">{store.nameStore}</span>
                                                {/* <span className="nameCategoryStoresCards">STARTS</span> */}
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>
                                                    <ReactStars
                                                        count={5}
                                                        size={32}
                                                        isHalf={true}
                                                        edit={false}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                        // activeColor="#48d1be"
                                                        color="#444444"
                                                        value={starsValue}
                                                    />
                                                    < span style={{ fontSize: 12, verticalAlign: 'center', marginTop: 5, marginLeft: 5, color: '#777777' }} >({store.rate.length})</span>
                                                </div>
                                                <span className="nameCategoryStoresCards">{currentCategory.nameCategory}</span>
                                            </div>
                                        </ NavLink>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories,
        storesForCategory: state.categoryReducer.stores,
        currentCategory: state.categoryReducer.currentCategory,
        userLogged: state.authReducer.userLogged

    }
}

const mapDispatchToProps = {
    getStoresbByCategory: categoryActions.getStoresbByCategory,
    getCurrentCategory: categoryActions.getCurrentCategory,
    rateStore: storeActions.rateStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)