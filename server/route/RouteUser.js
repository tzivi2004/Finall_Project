const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const verifyJWTAdmin = require("../middleware/verifyJWTAdmin")
const controllerUser = require("../controller/ControllerUser")
// router.use(verifyJWT)שכל הrouter לא היו מורשים!!!!


router.post("/", verifyJWTAdmin, controllerUser.createNewUser)//למה צריך אות זה? כי יש לנו את הregister בauth
router.get("/userName:userName",verifyJWT, controllerUser.getUserByUserName)
router.get("/", verifyJWTAdmin, controllerUser.getAllUsers)
router.get("/:id", verifyJWT, controllerUser.getUserById)
router.put("/", verifyJWT, controllerUser.updateUser)
router.delete("/:id", verifyJWTAdmin, controllerUser.deletUser)

module.exports = router