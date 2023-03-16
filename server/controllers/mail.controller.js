const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const IPADRESS = process.env.IPADRESS;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const { EMAIL, PASSWORD } = { EMAIL: EMAIL_ADDRESS, PASSWORD: EMAIL_PASSWORD }

const enviarCorreo = (req, res) => {

    const { userEmail, user } = req.body;
    console.log(userEmail, user)

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "neopolitan",
        product: {
            name: "Awesome Ecommerce",
            link: IPADRESS,
            logo: 'https://thumbs2.imgbox.com/4b/97/3omxAvKG_t.png',
            // logo: 'https://thumbs2.imgbox.com/d2/05/1WKmJ1bM_t.jpeg',
            // // Custom logo height
            logoHeight: '150px',
        }
    })

    let email = {
        body: {
            name: user,
            intro: "¡Tu cuenta ha sido creada con éxito!",
            action: {
                instructions: 'Para visitar nuestra tienda, haz click aquí:',
                button: {
                    color: "#4dbfbf",
                    text: 'Ir a la tienda',
                    link: IPADRESS
                }
            },
            // table : {
            //     data : [
            //         {
            //             item : "Nodemailer Stack Book",
            //             description: "A Backend application",
            //             price : "$10.99",
            //         }
            //     ]
            // },
            outro: "¡Visita nuestra tienda online y adquiere los mejores productos!"
        }
    }

    let emailBody = MailGenerator.generate(email)

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Awesome Eommerce - Cuenta creada con Éxito",
        html: emailBody
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    enviarCorreo
}