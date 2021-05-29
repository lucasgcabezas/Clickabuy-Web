import React from 'react'
import cartActions from '../redux/actions/cartActions'
import {connect} from 'react-redux'
const PurchaseDetail = ({itemCart,deleteProductFromCart,increaseQuantity})=> {
    return(
        <div className='detailContainer'>
            <button onClick={()=>deleteProductFromCart(itemCart)} style={{backgroundColor:"red",color:"white"}}>X</button>
            <img src={itemCart.productImg} alt="" style={{width:"10%",height:"100%"}}/>
            <div>{itemCart.nameProduct}</div>
            <div>{itemCart.price} $</div>
            <div className='quantityContainer'>
                <button onClick={()=>increaseQuantity(itemCart._id,1)} disabled={itemCart.quantity>=itemCart.stock}>+</button>
                {itemCart.quantity}(max stock: {itemCart.stock})
                <button onClick={()=>increaseQuantity(itemCart._id,-1)} disabled={itemCart.quantity<=1}>-</button>
            </div>
            <div>{itemCart.quantity * itemCart.price} $</div>
        </div>
    )
}
const mapDispatchToProps = {
    deleteProductFromCart : cartActions.deleteProductFromCart,
    increaseQuantity: cartActions.increaseQuantity
}

export default connect(null,mapDispatchToProps)(PurchaseDetail)