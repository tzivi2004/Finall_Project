const { model } = require("mongoose")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {username,password} = req.body
    console.log({username,password});

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" })
    }
    const foundUser = await User.findOne({username}).lean()
    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({ message: "Unauthorized" })
    } 
    const userInfo = {_id: foundUser._id, username: foundUser.username,name: foundUser.name, roles: foundUser.roles,email: foundUser.email, phone: foundUser.phone}
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET) 
    res.json({ accessToken, user:userInfo,role:userInfo.roles}) 

}

const register = async (req, res) => {
    const { name, username, password, email, phone, roles } = req.body
    console.log(name);
    console.log(username);
    console.log(password);
    if (!name || !username || !password) {
        return res.status(400).json({ message: "Name , username and password are required" })
    }
    const duplicatedUser = await User.findOne({ username }).lean()
    if (duplicatedUser) {
        return res.status(409).json({ message: "User already exists" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = {
        name,
        username,
        password: hashedPwd,
        email,
        phone,
        roles
    }
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${username} created!` })
    }
    else {
        res.status(400).json({ message: "Invalid user data received" })
    }
}


module.exports = { login, register }