const UserController = require('../controllers/user.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = (app) => {
    app.get('/api/users', authenticate, UserController.all)
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.logIn)
    app.get('/api/logout', authenticate, UserController.logOut)
    app.get('/api/is-logged', UserController.isLogged)
    app.put('/api/user/:id', authenticate, UserController.update);
    app.delete('/api/user/:id', authenticate, UserController.delete)
}