import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import adminStoreActions from '../redux/actions/adminStoreActions';


const ProdAdminStore = (props) => {

    const { prod, idStore, deleteProduct, userLogged } = props



    return (
        <div style={{ margin: '2vh 0', padding: '1vh .5vw', backgroundColor: '#888888' }}>
            <span>{prod.nameProduct}</span>
            <br></br>
            <span>{prod.description}</span>
            <br></br>
            <span>{prod.price}</span>
            <br></br>
            <span>{prod.stock}</span>
            <br></br>
            <button onClick={() => deleteProduct(userLogged.token, prod._id, idStore)}>Borrar</button>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
        storesByUser: state.adminStoreReducer.storesByUser

    }
}

const mapDispatchToProps = {
    deleteProduct: adminStoreActions.deleteProduct

};

export default connect(mapStateToProps, mapDispatchToProps)(ProdAdminStore);

