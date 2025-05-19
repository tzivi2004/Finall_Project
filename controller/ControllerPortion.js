const Dose = require('../models/Portion')

const createNewPortion = async (req, res) => {
    const { name, description, image, price, category, ingredients } = req.body
    if (!name || !category) {
        return res.status(400).json({ message: "Name & category are required" })
    }
    const newDose = await Dose.findOne({ name })
    if (newDose) {
        return res.status(400).json({ message: "Dose already exists" })
    }
    const dose = await Dose.create({
        name,
        description,
        image,
        price,
        category,
        ingredients
    })
    res.json({ message: "Dose created successfully", dose })
}

const getAllPortions = async (req, res) => {
    const doses = await Dose.find().lean()
    if (!doses?.length) {
        return res.status(404).json({ message: "No doses found" })
    }
    res.json(doses)
}



module.exports = { createNewPortion ,getAllPortions}