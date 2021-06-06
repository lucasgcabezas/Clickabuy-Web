import axios from 'axios'
import API from '../../helpers/api'
const mailActions = {
    mailOrderConfirmed: (person, resumen, destinatario, asunto) => {
        console.log({person, resumen, destinatario, asunto})
        // console.log(description.product)
        //deberia recibir el detalle de compra y datos del usuario ?¿
        return (dispatch, getState) => {
            try {   
                const response = axios.post(API + '/orderconfirmed', {person, resumen, destinatario, asunto})
                // console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    } 
}
export default mailActions