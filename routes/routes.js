
const orderController = require('../controllers/orders.controller');
const express = require('express');
const fs = require('fs');

module.exports = (function () {
  const router = express.Router();

  router.post('/createOrder', orderController.placeOrder);
  router.get('/getAllOrders', orderController.getAllOrders);
  router.get('/:orderId', orderController.getOrderDetails);
  router.patch('/updateOrder', orderController.updateOrder);
  router.delete('/delete/:orderId', orderController.deleteOrder)

  return router;

})();










