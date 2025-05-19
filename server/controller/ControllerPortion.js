const Portion = require('../models/Portion')

const createNewPortion = async (req, res) => {
    const { name, description, image, price, category, ingredients } = req.body
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



module.exports = { createNewPortion ,getAllPortions}