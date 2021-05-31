import React from 'react'
import cartActions from '../redux/actions/cartActions'
import {connect} from 'react-redux'
const PurchaseDetail = ({itemCart,deleteProductFromCart,increaseQuantity})=> {
    return(
        <div className='detailContainer'>
            <div style={{backgroundImage: `url('${itemCart.productImg}')`}} className="productImageCarrito"></div>
            <div className="nameProductCarrito">
                <span>{itemCart.nameProduct}</span>
                <span onClick={()=>deleteProductFromCart(itemCart)} className="deleteProductCarrito">Delete</span>
            </div>
            <div className='quantityContainer'>
                <button onClick={()=>increaseQuantity(itemCart._id,-1)} disabled={itemCart.quantity<=1} className="buttonAccionProducto">-</button>
                {itemCart.quantity}
                <button onClick={()=>increaseQuantity(itemCart._id,1)} disabled={itemCart.quantity>=itemCart.stock} className="buttonAccionProducto">+</button>
            </div>
            <p>$USD {itemCart.quantity * itemCart.price}</p>
        </div>
    )
}
const mapDispatchToProps = {
    deleteProductFromCart : cartActions.deleteProductFromCart,
    increaseQuantity: cartActions.increaseQuantity
}

export default connect(null,mapDispatchToProps)(PurchaseDetail)