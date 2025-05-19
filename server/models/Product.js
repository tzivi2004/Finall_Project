const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number

    },
    category: {
        type: String
    },
    allergens: {
        type: [String],
        default: [],
    },
    store:{
        type:String,
        // enum: ['אושר עד', 'שערי רווחה', 'מוסדי פו'],
        // required:true,
    },
    QuantityInStock:{
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true })


module.exports = mongoose.model("Product", productSchema)