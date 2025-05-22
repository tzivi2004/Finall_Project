const express = require("express")
const router = express.Router()
const ControllerPortion = require("../controller/ControllerPortion")

router.post("/",ControllerPortion.createNewPortion)
router.get("/",ControllerPortion.getAllPortions)
router.get("/:id",ControllerPortion.getPortionById)
router.put("/",ControllerPortion.updatePortion)
router.delete("/:id",ControllerPortion.deletePortion)

module.exports = router