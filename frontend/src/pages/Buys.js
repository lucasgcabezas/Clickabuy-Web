import React from 'react'
import {NavLink} from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PurchaseDetail from '../components/PurchaseDetail'

const Buys = () => {
    return(
        <>
            <Header />
            <div className='principalContainer'>
                <div className='buyContainer'>
                    <h3>Purchase Detail</h3>
                    <PurchaseDetail />
                    <PurchaseDetail />
                    <PurchaseDetail />
                    <PurchaseDetail />
                    <PurchaseDetail />
                    <PurchaseDetail />
                    <PurchaseDetail />
                    <PurchaseDetail /> 
                    <h3>Total= '{}'</h3> 
                    <div>
                        <button>Cancel Buy</button>
                        <button>Fin de la compra</button>
                    </div>
                     
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Buys