const Portion = require('../models/Portion')

const createNewPortion = async (req, res) => {
    const { name, description, price, category  } = req.body
    if (!name || !category) {
        return res.status(400).json({ message: "Name & category are required" })
    }
    const newPortion = await Portion.findOne({ description })

    if (newPortion) {
        return res.status(400).json({ message: "Dose already exists" })
    }
    const portion = await Portion.create({
        name,
        description,
        image,
        price,
        category,
        ingredients
    })
    res.json({ message: "Dose created successfully", portion })
}

const getAllPortions = async (req, res) => {
    const portions = await Portion.find().lean()
    if (!portions?.length) {
        return res.status(404).json({ message: "No doses found" })
    }
    res.json(portions)
}

const getPortionById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "Id is required" })
    }
    const portion = await Portion.findById(id).lean()
    if (!portion) {
        return res.status(404).json({ message: "Poryion not found" })
    }
    res.json(portion)
}

const updatePortion = async (req, res) => {
    const { id, name, description, image, price, category, ingredients } = req.body
    if (!id) {
        return res.status(400).json({ message: "Id , name & category are required" })
    }
    const portion = await Portion.findById(id).exec()
    if (!portion) {
        return res.status(404).json({ message: "Portion not found" })
    }
    portion.name = name,
        portion.description = description,
        portion.description = description,
        portion.image = image,
        portion.price = price,
        portion.category = category,
        portion.ingredients = ingredients
    const Updateportion = await portion.save()
    res.json({ message: "Portion updated successfully", Updateportion })
}

const deletePortion = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "Id is required" })
    }
    const portion = await Portion.findById(id).exec()
    if (!portion) {
        return res.status(404).json({ message: "Portion not found" })
    }
    const deletedPortion = await portion.deleteOne(id)
    res.json({ message: "Portion deleted successfully", portion })
}



module.exports = { createNewPortion, getAllPortions , getPortionById, updatePortion, deletePortion }