const Product = require('../models/Product')


const createNewProduct = async (req, res) => {
    const { name, allergens, store, price, category, QuantityInStock } = req.body
    if (!name || !price) {
        return res.status(400).json({ message: "Name & price are required" })
    }
    const newProduct = await Product.findOne({ name })
    if (newProduct) {
        return res.status(400).json({ message: "Product already exists" })
    }
    const product = await Product.create({
        name,
        allergens,
        store,
        price,
        category,
        QuantityInStock
    })
    res.json({ message: "Product created successfully", product })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    if (!products?.length) {
        return res.status(404).json({ message: "No products found" })
    }
    res.json(products)
}

const getProductById = async (req,res)=>{
    const {id} = req.params
    const ProductById = await Product.findById(id).lean()
    if(!ProductById){
        return res.status(404).json({message:"This Product Not Found!!"})
    }
    res.json(ProductById)
}

const updateProduct = async (req, res) => {
    const { _id, name, allergens, store, price, category, QuantityInStock } = req.body
    const updateProduct = await Product.findById(_id).exec()
    if (!updateProduct) {
        return res.status(404).json({message: "This Product Not Found!"})
    }
    updateProduct.name = name
    updateProduct.allergens = allergens
    updateProduct.store = store
    updateProduct.price = price
    updateProduct.category = category
    updateProduct.QuantityInStock = QuantityInStock
    const UpdateProduct = await updateProduct.save()
    res.json(UpdateProduct)
}

const deletProduct = async (req,res)=>{
    const {id} = req.params
    const deletProduct = await Product.findById(id).exec()
    if(!deletProduct){
        return res.status(404).json({message:"This Produce Not Exist!"})
    }
    const DeletProduct = await deletProduct.deleteOne()
    res.send(`The Product ${deletProduct.name} deleted!!`)
}

module.exports = { createNewProduct, getAllProducts ,getProductById ,updateProduct ,deletProduct}