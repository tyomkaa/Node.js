const express = require('express');
const router = express.Router();
const orApiController = require('../../api/orderAPI');
router.get ('/', orApiController.getOrders);
router.get ('/:id', orApiController.getOrderById);
router.post ('/', orApiController.createOrder);
router.put ('/ :id', orApiController.updateOrder);
router.delete ('/: id', orApiController.deleteOrder);

module.exports = router;