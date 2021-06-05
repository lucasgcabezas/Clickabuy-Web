import { connect } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Paypal from "../components/Paypal"
import Modal from 'react-modal'
import { useState } from "react"
// import Cards from 'react-credit-cards';

import PaymentForm from "../components/PaymentForm"


const FinalizePurchase = (props) => {
    const { cart } = props
    const [show, setShow] = useState(false)
    const [cards, setCards] = useState({ cvc: '', expiry: '', focus: '', name: '', number: '' })
    let display = !show ? 'none' : 'flex'
    let total = cart.reduce((total, item) => total += item.quantity * item.price, 0)
    // const handleInputFocus = (e) => {
    //     setCards({ focus: e.target.name })
    // }
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target
    //     setCards({ [name]: value })
    // }
    return (
        <>
            <Header />
            <div className="contenedorPurchase">
                <div className="contenedorInfoPurchase">
                    <h1>Purchase Summary</h1>
                    {cart.map(item => {
                        return (
                            <div key={item._id} className="productPurchase">
                                <div style={{ backgroundImage: `url('${item.productImg}')` }} className="productImageCarrito"></div>
                                <h3>{item.nameProduct}</h3>
                            </div>
                        )
                    })}
                    <h2>Total= ${total}</h2>
                    <Paypal buy={{ description: 'clickabuy', total: total }} />
                    <button onClick={() => setShow(!show)} >Credit/Debit Card</button>
                    <Modal
                        isOpen={show}
                        onRequestClose={() => setShow(!show)}
                        contentLabel="Example Modal"
                        className="ModalComponent"
                        overlayClassName="OverlayModal"
                    >
                        <div id="modal" style={{ display: display }}>
                            <div style={{ display: "flex" }}>
                                <span className="material-icons-outlined closeModal" onClick={() => setShow(false)}>close</span>
                            </div>
                            <div className="creditCardModal">
                                <PaymentForm/>
                            </div>
                        </div>
                    </Modal>
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
export default connect(mapStateToProps)(FinalizePurchase)
// AZb7ZN7IChYro2ZU-EMComszFSLVZfMRM3BUysWQ-MNv3SzK-KZVusG6om9Q8zFMH4E7thAkzxpR88QR
//BUSSINES
// sb-q0qay5870639@business.example.com
// System Generated Password:
// {y#+ux8U
//PERSONAL
// sb-v45u16418014@personal.example.com
// System Generated Password:
// 8C<yTx1P

