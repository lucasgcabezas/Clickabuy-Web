import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PurchaseDetail from '../components/PurchaseDetail'
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const Buys = ({ cart, clearCart }) => {

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return (
        <>
            <Header/>
            <div className='contenedorPrincipal'>
                <div className='contenedorCarrito'>
                    <h3>My Cart</h3>
                    {cart.map(item=>{
                        return <PurchaseDetail itemCart ={item}/>
                    })}
                    
                    <h2>Total= ${cart.reduce((total,item)=>total+=item.quantity*item.price ,0)}</h2> 
                    <div className="contenedorButtonsOrder">
                        <button onClick={()=>clearCart()} className="buttonCancelOrder">Cancel Order</button>
                        <button className="buttonReady">Ready</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = {
    clearCart: cartActions.clearCart
}
//clearCart
export default connect(mapStateToProps, mapDispatchToProps)(Buys)