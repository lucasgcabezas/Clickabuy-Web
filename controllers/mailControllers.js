const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD
    },
    tls: {
        rejectUnauthorized: false
    }
})
const mailControllers = {
    mailOrderConfirmed: (req, res) => {
        console.log(req.body)
        const {person, resumen, destinatario, asunto} = req.body
        let mailOptions = {
            from: 'Compras Efectuadas  <nocontestar@donotreply.com>',
            to: destinatario,
            subject: asunto,
            // text: 'hola'
            html: productos()
        }
        transport.sendMail(mailOptions, (err) => {
            if (err) console.log(err)
            res.json({success: true})
        })
        function productos() {
            var html = ``
            resumen.map(product => html += `<h1>${product.product.nameProduct}</h1>`)
            return html
        }
    },
    mailStoreConfirmed: (req, res) => {
        const {destinatario, asunto, cuerpo} = req.body
    
        // mandar el mail
        let mailOptions = {
            from: 'Se acepto tu store en clickabuy  <nocontestar@donotreply.com>',
            to: destinatario,
            subject: 'Gracias por participar xd!',
            html: `<h1>Hola</h1>
            <script>
            alert("Hola")
            </script>`
        }
        transport.sendMail(mailOptions, (err) => {
            if (err) console.log(err)
            res.json({success: true})
        })
    }


}
module.exports = mailControllers