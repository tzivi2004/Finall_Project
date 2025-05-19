const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doses: [
        {
            dose: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dose',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    NumberOfDiners:{
        type: Number,
        required: true,
        min:35,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    HallAddress: {
        type: String,
        required: true,
    },
    HallName: {
        type: String,
        required: true,
    },
    EventDate: {
        type: Date,
        required: true,
    },
    StartEventTime: {
        type: String,
        required: true,
    },
    EventType: {
        type: String,
        enum: ['Bar Mitzvah', 'Bat Mitzvah', 'Wedding', 'Birthday','Shabat','Brit']
    },
    Notes: {
        type: String,
        default: '',
    },
    PaymentStatus: {
        type: String,
        enum: ['Paided', 'Unpaided'],
        default: 'Unpaided',
    },
    PaymentMethod: {
        type: String,
        enum: ['Credit Card', 'Cash', 'Bank Transfer'],
        default: 'Credit Card',
    }

}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema)