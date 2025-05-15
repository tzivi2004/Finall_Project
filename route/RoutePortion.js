const express = require("express")
const router = express.Router()
const ControllerPortion = require("../controller/ControllerPortion")

router.post("/",ControllerPortion.createNewPortion)
router.get("/",ControllerPortion.getAllPortions)
// router.get("/:id",controllerTodos.getTodosById)
// router.put("/",controllerTodos.updateTodos)
// router.delete("/:id",controllerTodos.deletTodos)

module.exports = router