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
        const { person, resumen, destinatario, asunto } = req.body
        let mailOptions = {
            from: 'Order Confirmation!  <nocontestar@donotreply.com>',
            to: destinatario,
            subject: asunto,
            html: productos()
        }
        transport.sendMail(mailOptions, (err) => {
            if (err) console.log(err)
            res.json({ success: true })
        })
        function productos() {
            var html = ``
            resumen.map(product => html += `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGiDtbLrcW77HPEwrJM2Ej2yFNYwvsg+p" crossorigin="anonymous"/>
</head>
<body>
    <div style="display: flex; justify-content: center; width: 100%; font-family: 'Poppins', sans-serif;">
        <div style="display:flex; width: 100%; flex-direction: column; align-items: center;">
            <div style="display: flex; align-items: center;">
                <div style="background-image: url('https://webdesing881317710.files.wordpress.com/2021/06/tags-solid.png'); width: 4vw; height: 5vh; background-position: center; background-size: contain; background-repeat: no-repeat;"></div>
                <h1>clickabuy</h1>
            </div>
            <div>
                <div style="background-image: url('https://webdesing881317710.files.wordpress.com/2021/06/delivery-checklist-3621861-3081404.png'); width: 40vw; height: 40vh; background-position: center; background-size: contain; background-repeat: no-repeat;"></div>
                <span style="font-family:'Poppins-Regular', sans-serif;">Hey </span><span style="font-weight: bold;">${person.name}!,</span>
                <div style="display: flex; align-items: center;">
                    <h3 style="color: #EA957F;">Your order is confirmed</h3>
                </div>
                <p style="font-family:'Poppins-Regular', sans-serif;">Thanks for shopping in clickabuy! You can find your purchase information below.</p>
                <div style="margin-top: 6vh;">
                    <h3 style="margin: 0;">Order Summary</h3>
                    <div style="background-color: black; height: 4px; width: 6vw; display: flex; justify-content: center;"></div>
                    <div style="border-bottom: 1px solid #e6e6e6; display: flex; align-items: center; justify-content: space-between;">
                        <div style="background-image: url('${product.product.imageProduct}');background-position: center;
                        background-size: cover; 
                        background-repeat: no-repeat;
                        width: 18vw;
                        height: 36vh;"></div>
                        <span style="font-weight: bold;">${product.product.nameProduct}</span>
                        <span style="font-family:'Poppins-Regular', sans-serif;">${product.product.quantity}</span>
                        <p>$ ${product.product.price}</p> 
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end;">
                        <p style="font-weight: bold;">Total :$ ${product.product.total}</p>
                        <div style="display: flex; align-items: center;">
                            <p style="font-weight: bold;">Shipping : FREE</p> 
                        </div>
                        <div style="display: flex; align-items: center;">
                            <h3>Order Total : </h3><span style="font-weight: bold;">$ ${product.product.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
            `)
            return html
        }
    },
    mailStoreConfirmed: (req, res) => {
        const { destinatario, asunto, cuerpo } = req.body

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
            res.json({ success: true })
        })
    }


}
module.exports = mailControllers