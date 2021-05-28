import React from 'react'

const PurchaseDetail = ()=> {
    return(
        <div className='detailContainer'>
            <button>X</button>
            <div>Image</div>
            <div>Product Name</div>
            <div>Unit Price</div>
            <div className='quantityContainer'>
                <button>+</button>
                Quantity
                <button>-</button>
            </div>
            <div>Amount</div>
        </div>
    )
}

export default PurchaseDetail