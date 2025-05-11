const express = require('express')
const router = express.Router()
const ControllerAuth = require('../controller/ControllerAuth')


router.post('/login',ControllerAuth.login)
router.post("/register",ControllerAuth.register)

module.exports = router