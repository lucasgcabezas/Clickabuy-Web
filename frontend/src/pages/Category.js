import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import categoryActions from '../redux/actions/categoryActions'


const Category = (props) => {
    useEffect(() => {
        props.getStoresbByCategory('60afec9489c4fb2b806b6fa0')
    }, [])

    return (
        <>
            <Navbar/>
            <div className="categoryContainer">
                <div className="categoryHero" >
                    <span>Titulo categoria</span>
                </div>
                <div className="categoryStoresContainer">
                    <span>Tiendas</span>
                    <div className="categoryStoresSection">
                        {
                            props.storesForCategory.length === 0
                                ? <span>No hay disponibles</span>
                                : props.storesForCategory.map((store, i) => {
                                    return (
                                        <div key={i} className="categoryStoresCards">
                                            {/* <Link>{store.nameStore}</Link> */}
                                            <span>{store.nameStore}</span>
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
        storesForCategory: state.categoryReducer.stores
    }
}

const mapDispatchToProps = {
    getStoresbByCategory: categoryActions.getStoresbByCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)