const Order = require('../models/Order');
const User = require('../models/User');
const sendEmail = require('../middleware/emailService'); // Assuming you have a utility function to send emails
const createNewOrder = async (req, res) => {
    const { user, doses, NumberOfDiners, status, HallAddress, HallName, EventDate, StartEventTime, EventType, Notes, PaymentStatus, PaymentMethod, totalPrice } = req.body;
    // if (!user || !doses || !NumberOfDiners || !HallAddress || !totalPrice || !HallName || !EventDate || !StartEventTime) {
    //     return res.status(400).json({ message: "User, doses, NumberOfDiners ,HallAddress and totalPrice are required" });
 

    const existingOrder = await Order.findOne({ user, NumberOfDiners, HallAddress, EventDate }).lean()
    if (existingOrder) {
        return res.status(409).json({ message: "Order already exists" });
    }
    const newOrder = await Order.create({
        user,
        doses,
        NumberOfDiners,
        totalPrice,
        status,
        HallAddress,
        HallName,
        EventDate,
        StartEventTime,
        EventType,
        Notes,
        PaymentStatus,
        PaymentMethod,
    });

    if (!newOrder) {
        return res.status(400).json({ message: "Invalid order data received" });
    }
    const UserEmail = await User.findById(user).lean()
    if (!UserEmail) {
        return res.status(404).json({ message: "User not found" });
    }

    if (UserEmail.email) {
        const email = UserEmail.email
        const subject = "Your order has been received!"
        const text = `Dear ${UserEmail.name},\n\nYour order has been successfully created.\n\nOrder Details:\n-The menu is:${doses}\n- Number of Diners: ${NumberOfDiners}\n- Hall Address: ${HallAddress}\n- Event Date: ${EventDate}\n- Start Event Time: ${StartEventTime}\n\nThank you for choosing us!\n\nBest regards,\nYour Company`

        const sendmail = await sendEmail(email, subject, text)
        if (sendmail) {
            console.log(`Email sent to ${email}`);
        } else {
            console.error(`Error sending email to ${email}`);
        }
        res.json(newOrder);
    }
}



const getAllOrders = async (req, res) => {
    const orders = await Order.find().lean()
    // .populate('user', 'name username').populate('doses.dose', 'name')
    if (!orders?.length) {
        return res.status(404).json({ message: "No orders found" });
    }
    res.json(orders);
}

const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).lean()
    // .populate('user', 'name username').populate('doses.dose', 'name')
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
}
const updateOrder = async (req, res) => {
    const { id, user, doses, NumberOfDiners, status, HallAddress, HallName, EventDate, StartEventTime, EventType, Notes, PaymentStatus, PaymentMethod } = req.body;
    const order = await Order.findById(id).exec();
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    order.user = user;
    order.doses = doses;
    order.NumberOfDiners = NumberOfDiners;
    order.status = status;
    order.HallAddress = HallAddress;
    order.HallName = HallName;
    order.EventDate = EventDate;
    order.StartEventTime = StartEventTime;
    order.EventType = EventType;
    order.Notes = Notes;
    order.PaymentStatus = PaymentStatus;
    order.PaymentMethod = PaymentMethod;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
}
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).exec()
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    const result = await order.deleteOne();
    res.send(`the Order ${order.user} deleted!`);
}

module.exports = { createNewOrder, getAllOrders, getOrderById, updateOrder, deleteOrder }