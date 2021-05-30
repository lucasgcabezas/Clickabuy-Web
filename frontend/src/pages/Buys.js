import React from 'react'
import {NavLink} from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PurchaseDetail from '../components/PurchaseDetail'
import {connect} from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const Buys = ({cart,clearCart}) => {
    return(
        <>
            <div className='principalContainer'>
                <div className='buyContainer'>
                    <h3>Purchase Detail</h3>
                    {cart.map(item=>{
                        return <PurchaseDetail itemCart ={item}/>
                    })}
                    
                    <h3>Total= {cart.reduce((total,item)=>total+=item.quantity*item.price ,0)} $</h3> 
                    <div>
                        <button onClick={()=>clearCart()}>Cancel Buy</button>
                        <button>Fin de la compra</button>
                    </div>
                     
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart : state.cartReducer.cart
    }
}

const mapDispatchToProps = {
    clearCart : cartActions.clearCart  
}
//clearCart
export default connect(mapStateToProps,mapDispatchToProps)(Buys)