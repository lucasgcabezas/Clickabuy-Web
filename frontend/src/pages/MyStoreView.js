import '../css/jona.css'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header'
import adminStoreActions from '../redux/actions/adminStoreActions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProdAdminStore from '../components/ProdAdminStore';


const MyStoreView = (props) => {

    const { getProductsFromStore, storesByUser, productsByUserStore,cleanProducts } = props

    const thisStore = storesByUser.find(store => store._id === props.match.params.id)

    useEffect(() => {
        getProductsFromStore(props.match.params.id)

        return () => cleanProducts()
    }, [])

    return (
        <>
            <Header />

            <div className="myStoreContainer">
                <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span class="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>

                <span>{thisStore.nameStore}</span>

                <Link to={`/addProducts/${thisStore._id}`} style={{ backgroundColor: 'yellow' }}>Add product</Link>


                {
                    productsByUserStore.length > 0
                    && productsByUserStore.map(prod => {

                        return <ProdAdminStore key={prod._id} prod={prod} idStore={props.match.params.id}/>
                    })
                }
                <div className="containerOfItems">
                </div>
            </div>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
        storesByUser: state.adminStoreReducer.storesByUser,
        productsByUserStore: state.adminStoreReducer.productsByUserStore

    }
}

const mapDispatchToProps = {
    getProductsFromStore: adminStoreActions.getProductsFromStore,
    cleanProducts: adminStoreActions.cleanProducts,

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoreView);

