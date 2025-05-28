const express = require('express');
const router = express.Router();
const ControllerOrder = require('../controller/ControllerOrder');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTAdmin = require('../middleware/verifyJWTAdmin');



router.post('/',verifyJWT, ControllerOrder.createNewOrder);
router.get('/',verifyJWTAdmin, ControllerOrder.getAllOrders);
router.get('/:id',verifyJWT, ControllerOrder.getOrderById);
router.get('/username/:username',verifyJWT, ControllerOrder.getOrderByUserName);
// router.get('/export', ControllerOrder.exportOrders);

router.put('/',verifyJWTAdmin, ControllerOrder.updateOrder);
router.delete('/:id',verifyJWTAdmin, ControllerOrder.deleteOrder);

module.exports = router;
