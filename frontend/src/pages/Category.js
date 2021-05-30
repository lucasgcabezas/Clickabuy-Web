import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import categoryActions from '../redux/actions/categoryActions'
import Header from '../components/Header'
const Category = (props) => {
    const [category, setCategory] = useState([])
    const idParams = props.match.params.id
    useEffect(() => {
        !props.categories.length ? props.history.push('/') : setCategory(props.categories.find(categoria => categoria._id === idParams))
        props.getStoresbByCategory(idParams)
    }, [])

    return (
        <>
            <Header/>
            <div className="categoryContainer">
                <div className="categoryHeroImage" style={{ backgroundImage: `url('${category.bannerCategory}')` }}>
                    <div className="contenedorNameCategoryHero">
                        <div>
                            <span className="nameCategoryHero1">category</span>
                            <span className="nameCategoryHero2">{category.nameCategory}</span>
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
        storesForCategory: state.categoryReducer.stores
    }
}

const mapDispatchToProps = {
    getStoresbByCategory: categoryActions.getStoresbByCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)