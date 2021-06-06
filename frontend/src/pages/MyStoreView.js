import '../css/jona.css'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header'
import adminStoreActions from '../redux/actions/adminStoreActions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProdAdminStore from '../components/ProdAdminStore';
import { Lines } from 'react-preloaders';



const MyStoreView = (props) => {

    const { getProductsFromStore, storesByUser, productsByUserStore, cleanProducts, deleteStore, userLogged, preloaderProduct } = props

    const thisStore = storesByUser.find(store => store._id === props.match.params.id)

    const [modalState, setModalState] = useState(false)
    const [modalEditState, setModalEditState] = useState(false)

    useEffect(() => {
        getProductsFromStore(props.match.params.id)
        return () => cleanProducts()
    }, [])

    const deleteStoreConfirm = () => {
        deleteStore(userLogged.token, props.match.params.id)
        props.history.push("/myStores")
    }

    console.log(thisStore)

    return (
        <div style={{ position: 'relative' }}>
            <div className="myStoresModalTotalContainer" style={{ display: modalState ? 'flex' : 'none' }}>
                <div className="myStoresModalContainer" onClick={() => setModalState(false)}>

                </div>
                <div className="myStoresModal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 20 }}>
                        <span>Are you sure you want to delete this store? </span>
                        <span>This cannot be undone. </span>
                    </div>
                    <div className="myStoresModalButtonContainer">
                        <button onClick={() => setModalState(false)}>Cancel</button>
                        <button onClick={deleteStoreConfirm}>Delete</button>
                    </div>
                </div>
            </div>

            <div className="myStoresModalTotalContainer" style={{ display: modalEditState ? 'flex' : 'none' }}>
                <div className="myStoresModalContainer" onClick={() => setModalEditState(false)}>
                </div>
                <div className="myStoresEditModal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 20 }}>
                        <span>Are you sure you want to delete this store? </span>
                        <span>This cannot be undone. </span>
                        <input type="text" placeholder={thisStore.nameStore}></input>
                        <input type="text" placeholder={thisStore.nameStore}></input>
                        <input type="text" placeholder={thisStore.nameStore}></input>
                    </div>
                    <div className="myStoresModalButtonContainer">
                        <button onClick={() => setModalState(false)}>Cancel</button>
                        {/* <button onClick={deleteStoreConfirm}>Delete</button> */}
                    </div>
                </div>
            </div>

            <Header />

            <div className="myStoreContainer" >


                <div className="myStoreBackTitle">
                    <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span class="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>
                    <span className="myStoreTitle">{thisStore.nameStore}</span>
                </div>

                <div className="myStoreMain">

                    <div className="myStoreInfo">
                        <div className="myStoreImg" style={{ backgroundImage: `url(${thisStore.logoStore.url})` }}></div>
                        <Link to={`/addProducts/${thisStore._id}`} className="buttonAdm">Add product</Link>
                        {/* <button className="buttonAdm" onClick={() => setModalEditState(true)} >Edit store</button> */}
                        <button className="buttonAdm" onClick={() => setModalState(true)}>Delete store</button>

                    </div>

                    <div className="myStoreProducts">
                        {
                            preloaderProduct
                                ? <div className="prelaoderContainer">
                                    <div class="lds-ripple"><div></div><div></div></div>
                                </div>
                                : productsByUserStore.length > 0
                                && productsByUserStore.map(prod => {

                                    return <ProdAdminStore key={prod._id} prod={prod} idStore={props.match.params.id} />
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
        storesByUser: state.adminStoreReducer.storesByUser,
        productsByUserStore: state.adminStoreReducer.productsByUserStore,
        preloaderProduct: state.adminStoreReducer.preloaderProduct

    }
}

const mapDispatchToProps = {
    getProductsFromStore: adminStoreActions.getProductsFromStore,
    cleanProducts: adminStoreActions.cleanProducts,
    deleteStore: adminStoreActions.deleteStore,

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoreView);

