import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import adminStoreActions from '../redux/actions/adminStoreActions';


const ProdAdminStore = (props) => {
    const { prod, idStore, deleteProduct, userLogged, editProduct } = props

    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [elementsToModify, setElementsToModify] = useState({ storeId: idStore })

    const getInput = e => { setElementsToModify({ ...elementsToModify, [e.target.name]: e.target.value }) }

    const sendEdition = () => {
        editProduct(userLogged.token, prod._id, elementsToModify)
    }

    console.log(elementsToModify)

    return (
        <div className="prodAdminStore">
            <div className="prodAdminStoreInfoContainer">
                <div className="prodAdminStoreImg" style={{ backgroundImage: `url(${prod.productImg.url})`, display: editModal ? 'none' : 'flex' }}></div>
                <div className="prodAdminStoreImgEdit" style={{ display: editModal ? 'flex' : 'none' }}>
                    {/* <span className="far fa-camera" style={{color: 'white'}}></span> */}
                    {/* <span style={{ fontSize: 55, color: '#ffffff', }}>+</span> */}
                    <input type="file" id="files" style={{ display: 'none' }}></input>
                    <label for="files" style={{ cursor: 'pointer', fontSize: 60, color: '#ffffff' }}>+</label>
                    {/* <span className="fas fa-camera adminStoresCardsIcons" style={{fontSize: 30}} ></span> */}

                </div>

                <div className="prodAdminStoreInfoTitles">
                    <span className="spanProdCard">Name:</span>
                    <span className="spanProdCard">Description:</span>
                    <span className="spanProdCard">Price:</span>
                    <span className="spanProdCard">Stock:</span>
                </div>
                <div className="prodAdminStoreInfoFields" style={{ display: editModal ? 'none' : 'flex' }}>
                    <span className="spanProdCard">{prod.nameProduct}</span>
                    <span className="spanProdCard">{prod.description}</span>
                    <span className="spanProdCard">{prod.price}</span>
                    <span className="spanProdCard">{prod.stock}</span>
                </div>
                <div className="prodAdminStoreEditModal" style={{ display: editModal ? 'flex' : 'none' }}>
                    <input type="text" className="inputProdCard" placeholder={prod.nameProduct} name="nameProduct" onChange={getInput} ></input>
                    <input type="text" className="inputProdCard" placeholder={prod.description} name="description" onChange={getInput} ></input>
                    <input type="text" className="inputProdCard" placeholder={prod.price} name="price" onChange={getInput} ></input>
                    <input type="text" className="inputProdCard" placeholder={prod.stock} name="stock" onChange={getInput} ></input>
                </div>
                <button className="buttonConfirmEdit" style={{ display: editModal ? 'flex' : 'none' }} onClick={sendEdition}>Confirm</button>
            </div>

            <div className="prodAdminStoreButtonsDiv">
                <button onClick={() => setEditModal(!editModal)}>
                    <span className="fas fa-pencil-alt adminStoresCardsIcons" ></span>
                </button>
                <button onClick={() => setDeleteModal(true)}>
                    <span className="fas fa-trash-alt adminStoresCardsIcons" ></span>
                </button>
            </div>

            <div className="prodAdminStoreDeleteModal" style={{ display: deleteModal ? 'flex' : 'none' }}>
                <span>Are you sure you want to delete this product? This cannot be undone.</span>
                <div className="prodAdminStoreDeleteModalButtons">
                    <button onClick={() => setDeleteModal(false)}>Cancel</button>
                    <button onClick={() => deleteProduct(userLogged.token, prod._id, idStore)}>Delete</button>
                </div>
            </div>



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
    deleteProduct: adminStoreActions.deleteProduct,
    editProduct: adminStoreActions.editProduct

};

export default connect(mapStateToProps, mapDispatchToProps)(ProdAdminStore);

