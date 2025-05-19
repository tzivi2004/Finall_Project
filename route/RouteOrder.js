const express = require('express');
const router = express.Router();
const ControllerOrder = require('../controller/ControllerOrder');
const verifyJWT = require('../middleware/verifyJWT');


router.post('/', ControllerOrder.createNewOrder);
router.get('/', ControllerOrder.getAllOrders);
router.get('/:id', ControllerOrder.getOrderById);
router.put('/', ControllerOrder.updateOrder);
router.delete('/:id', ControllerOrder.deleteOrder);

module.exports = router;
