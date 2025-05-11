const User = require("../models/User")
const bcrypt = require('bcrypt')

const createNewUser = async (req, res) => {
    const { name, username, password, email, phone, roles } = req.body
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required" })
    }
    const newUser = await User.findOne({ password })
    if (newUser) {
        return res.status(400).json({ message: "User already exists" })
    }
    // const hashedPwd = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        username,
        password,
        email,
        phone,
        roles
    })
    res.json({ message: "User created successfully", user })
}
const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users?.length) {
        return res.status(404).json({ message: "No users found" })
    }
    res.json(users)
}
const getUserById = async (req, res) => {
    const { id } = req.params
    const UserById = await User.findById(id).lean()
    if (!UserById) {
        return res.status(404).json({ message: "This User Not Found!" })
    }
    res.json(UserById)
}

const updateUser = async (req, res) => {
    const { id,name,username,password,email,phone,roles } = req.body
    const updateUser = await User.findById(id).exec()
    if (!updateUser) {
        return res.status(404).json({massage:"This User Not Found!"})
    }
    updateUser.name = name
    updateUser.username = username
    updateUser.password = password
    updateUser.email = email
    updateUser.phone = phone
    updateUser.roles = roles
    const UpdateUser = await updateUser.save()
    res.json(UpdateUser)
}

const deletUser = async (req,res)=>{
    const {id} = req.params
    const deletUser = await User.findById(id).exec()
    if(!deletUser){
        return res.status(404).json({message:"This User Not Exist!"})
    }
    const DeletUser = await deletUser.deleteOne()
    res.send(`The User ${deletUser.name} deleted!!`)
}

module.exports = { createNewUser, getAllUsers, getUserById ,updateUser,deletUser}

