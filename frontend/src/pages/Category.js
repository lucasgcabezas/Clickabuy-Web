import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
import categoryActions from '../redux/actions/categoryActions'
import Header from '../components/Header'
import Footer from '../components/Footer'
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
                                    return (
                                        <Link to={`/store/${store._id}`} className="linkStore categoryStoresCards" key={i} >
                                            <div>
                                                <div style={{ backgroundImage: `url('../assets/${store.logoStore}')` }} className="logoStoreCategory"></div>
                                                <span className="nameStoresCards">{store.nameStore}</span>
                                                <span className="nameCategoryStoresCards">STARTS</span>
                                                <span className="nameCategoryStoresCards">{currentCategory.nameCategory}</span>
                                            </div>
                                        </Link>
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
        currentCategory: state.categoryReducer.currentCategory
    }
}

const mapDispatchToProps = {
    getStoresbByCategory: categoryActions.getStoresbByCategory,
    getCurrentCategory: categoryActions.getCurrentCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)