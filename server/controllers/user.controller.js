const { User } = require('../models/user.model');
const Cart = require('../models/cart.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;



User.findOne({ email: 'federicko94@gmail.com' }).then(user => {
    if (!user) {
        User.create({
            firstName: 'Federico',
            lastName: 'Baez',
            email: 'federicko94@gmail.com',
            password: process.env.PASSWORD,
            role: 'admin',
            status: true
        })
    }
});


module.exports.all = (req, res) => {
    User.find({}).sort('_id')
        .then((users) => res.json({ users: users }))
        .catch((error) => res.status(400).json({ message: "Something went wrong when get all users", error: error }));
};

//Register
module.exports.register = async (req, res) => {

    try {
        const newUser = await User.create({ ...req.body, role: 'user', status: true });
        const cart = await Cart.create({ user: newUser._id, products: [] })
        const userToken = jwt.sign({ _id: newUser._id }, secret_key)

        // Contiene el token, mientras no se expire o no haga logout puede utilizar la app, httponly para que la cookie no sea desencriptada
        await res.status(201).cookie('userToken', userToken, secret_key, { httpOnly: true })
            .json({ successMessage: "Register succesfully, has a cookie", isAdmin: newUser.role == 'admin' ? true : false })

        console.log("Usertoken register", userToken);
    }
    catch (error) {
        res.status(400).json(error);
    }
}

//Login
module.exports.logIn = async (req, res) => {

    User.findOne({ email: req.body.email }) //find the user with the email
        .then(async (user) => {

            if (user === null) {
                await res.status(400).json({ message: "invalid login attempt" });// Si no existe ese usuario enviar un error 
            } else {
                bcrypt.compare(req.body.password, user.password)// Validar que la contraseña ingresada sea igual a la contraseña en la base de datos
                    .then(async (password) => {

                        if (password) {
                            // Generar el token si es que la contraseña coincide
                            const userToken = jwt.sign({ _id: user._id }, secret_key);
                            // Contiene el token, mientras no se expire o no haga logout puede utilizar la app, httponly para que la cookie no sea desencriptada
                            await res.cookie("userToken", userToken, { httpOnly: true }).json({ message: "success! Login", isAdmin: user.role == 'admin' ? true : false });
                        } else {
                            await res.status(400).json({ message: "invalid login attempt" });// Si no es correcta la contraseña emitir un error
                        }
                    })
                    .catch(err => res.status(400).json({ message: "invalid login attempt" }));
            }
        })
        .catch(err => res.status(400).json(err));

}

//log user out
module.exports.logOut = async (req, res) => {
    res.cookie('userToken', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    }); res.status(200).send('user is logged out');
};

//check if user is logged in
module.exports.isLogged = (req, res) => {

    let currentUser;

    if (req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, secret_key, async (err, payload) => {
            if (!err) {
                currentUser = await User.findById(payload._id);
                res.status(200).send({ currentUser });
            } else {

                res.status(200).send({ currentUser });
            }
        });
    } else {
        currentUser = null;
        res.status(200).send({ currentUser });
    }




};