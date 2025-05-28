const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const verifyJWTAdmin = require("../middleware/verifyJWTAdmin")
const ControllerPortion = require("../controller/ControllerPortion")

router.post("/",verifyJWTAdmin,ControllerPortion.createNewPortion)
router.get("/",ControllerPortion.getAllPortions)
router.get("/:id",ControllerPortion.getPortionById)
router.put("/",verifyJWTAdmin,ControllerPortion.updatePortion)
router.delete("/:id",verifyJWTAdmin,ControllerPortion.deletePortion)

module.exports = router