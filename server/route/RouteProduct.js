const express = require("express")
const router = express.Router()
const verifyJWTAdmin = require("../middleware/verifyJWTAdmin")
const ControllerProduct = require("../controller/ControllerProduct")

router.post("/",verifyJWTAdmin,ControllerProduct.createNewProduct)
router.get("/",verifyJWTAdmin,ControllerProduct.getAllProducts)
router.get("/:id",verifyJWTAdmin,ControllerProduct.getProductById)
router.put("/",verifyJWTAdmin,ControllerProduct.updateProduct)
router.delete("/:id",verifyJWTAdmin,ControllerProduct.deletProduct)

module.exports = router

