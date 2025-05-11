const express = require("express")
const router = express.Router()
const controllerUser = require("../controller/ControllerUser")

router.post("/",controllerUser.createNewUser)
router.get("/",controllerUser.getAllUsers)
router.get("/:id",controllerUser.getUserById)
router.put("/",controllerUser.updateUser)
router.delete("/:id",controllerUser.deletUser)

module.exports = router