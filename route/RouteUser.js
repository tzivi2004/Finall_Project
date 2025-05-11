const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const controllerUser = require("../controller/ControllerUser")
const { verify } = require("jsonwebtoken")
// router.use(verifyJWT)שכל הrouter לא היו מורשים!!!!


router.post("/", verifyJWT, controllerUser.createNewUser)
router.get("/", verifyJWT, controllerUser.getAllUsers)
router.get("/:id", verifyJWT, controllerUser.getUserById)
router.put("/", verifyJWT, controllerUser.updateUser)
router.delete("/:id", verifyJWT, controllerUser.deletUser)

module.exports = router