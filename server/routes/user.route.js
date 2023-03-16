const UserController = require('../controllers/user.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = function (app) {
    app.get('/api/users', authenticate, UserController.all)
    app.get('/api/user/:id', authenticate, UserController.find);
    app.post('/api/register', UserController.register);
    app.post('/api/create', authenticate, UserController.create);
    app.post('/api/login', UserController.logIn);
    app.get('/api/logout', UserController.logOut);
    app.put('/api/user/:id', authenticate, UserController.update);
    app.get('/api/user', UserController.checkUser);
    app.delete('/api/user/:id', authenticate, UserController.delete);
}