import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import mailActions from '../redux/actions/mailActions'
import cartActions from '../redux/actions/cartActions'
import Modal from 'react-modal'

const Paypal = (props) => {
    const { buy, clearCart, mailOrderConfirmed } = props
    const { cart, total } = buy
    const paypal = useRef()
    const [show, setShow] = useState(false)
    let display = !show ? 'none' : 'flex'
    let resumen = cart.map(product => {
        return {
            product: { nameProduct: product.nameProduct, imageProduct: product.productImg, quantity: product.quantity },
        }
    })
    let asunto = "compra en clickabuy"
    let destinatario = "juancarlos.mindub@gmail.com"
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        { description: 'clickabuy compra', amount: { value: total, currency_code: 'USD' } }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                setShow(true)
                mailOrderConfirmed(order.payer.name, resumen, destinatario, asunto)
                clearCart()
            },
            onError: (err) => {
                alert("Compra NO exitosa, intentá otro dia!")
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return (
        <>
            <div ref={paypal} className="paypalButtons"></div>
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
                        <div className="orderCompleted">
                            <h1>Your order is completed!</h1>
                            <span>Thanks for shopping in clickabuy</span>
                            <span>We will send you a confirmation email, including the summary of your purchase.</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
const mapDispatchToProps = {
    mailOrderConfirmed: mailActions.mailOrderConfirmed,
    clearCart: cartActions.clearCart
}
export default connect(null, mapDispatchToProps)(Paypal)