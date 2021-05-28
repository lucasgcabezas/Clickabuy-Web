import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import categoryActions from '../redux/actions/categoryActions'
import {Link} from 'react-router-dom'
import { useState } from 'react'

const Category = (props) => {
    const [category, setCategory] = useState([])
    const idParams = props.match.params.id
    useEffect(() => {
        !props.categories.length ? props.history.push('/') : setCategory(props.categories.find(categoria => categoria._id === idParams))
        props.getStoresbByCategory(idParams)
    }, [])
    // if (categories.length === 0) {
    //     this.props.history.push('/cities')
    // } else{
    //     this.setState({
    //         city: this.props.cities.find(ciudad => ciudad._id === this.props.match.params.id),
    //     })
    // }
    // this.props.cargarItinerarios(this.props.match.params.id)
    return (
        <>
            <Navbar/>
            <div className="categoryContainer">
                <div className="categoryHero" >
                    <span>{category.nameCategory}</span>
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