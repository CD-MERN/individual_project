const OrderController = require('../controllers/order.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = app => {
  app.post('/api/order', authenticate, OrderController.create);
  // app.get('/api/cart', authenticate, OrderController.cart)
  // app.get('/api/cart/:id', authenticate, OrderController.find);
  // app.put('/api/cart/:id', authenticate, OrderController.update);
  // app.delete('/api/cart/:id', authenticate, OrderController.delete);
  // app.put('/api/cart/:id/move-to-wish-list', authenticate, OrderController.moveToWishList);
};