import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
import categoryActions from '../redux/actions/categoryActions'
import Header from '../components/Header'
import ProductFilter from '../components/ProductFilter'

const Category = (props) => {
    if (!props.currentCategory) {
        return <h1>cargando...</h1>
    }
    return (
        <>
            <Header/>
            <div className="categoryContainer">
                <div className="categoryHeroImage" style={{ backgroundImage: `url('${props.currentCategory.bannerCategory}')` }}>
                    <div className="contenedorNameCategoryHero">
                        <div>
                            <span className="nameCategoryHero1">category</span>
                            <span className="nameCategoryHero2">{props.currentCategory.nameCategory}</span>
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
                                        <div key={i} className="categoryStoresCards">
                                            <Link to={`/store/${store._id}`}>{store.nameStore}</Link>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
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