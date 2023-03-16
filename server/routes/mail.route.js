const mailController = require('../controllers/mail.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = app => {
  app.post('/api/mail', mailController.enviarCorreo)
};