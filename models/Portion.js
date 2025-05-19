const mongoose = require('mongoose')

const portionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
    ,description:{
        type:String,
    },
    image:{
        type:[String],
        default:[]
    },
    price:{
        type:Number,
    },  
    category:{
        type:String,
        required:true,
    },
    ingredients: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ], 


})

module.exports = mongoose.model('Portion', portionSchema)