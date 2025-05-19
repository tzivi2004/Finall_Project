const express = require("express")
const router = express.Router()
const ControllerProduct = require("../controller/ControllerProduct")

router.post("/",ControllerProduct.createNewProduct)
router.get("/",ControllerProduct.getAllProducts)
router.get("/:id",ControllerProduct.getProductById)
router.put("/",ControllerProduct.updateProduct)
router.delete("/:id",ControllerProduct.deletProduct)

module.exports = router

