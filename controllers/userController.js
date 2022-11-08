require('dotenv').config();
const User = require("../models/User");
const userCtrl = {};
const jwt = require('jsonwebtoken');

let jwtSecretKey = process.env.JWT_SECRET_KEY;

// Get all users count.
userCtrl.getAllUsers = async (req, res) => {
    const users = User.find({});
    res.json(users.length());
}
// Signup 
userCtrl.postUser = async (req, res) => {
    const newUser = User(req.body);
    console.log(newUser);
    const data = {
        email: newUser.email,
        iat: Date.now(),
        exp: Math.floor(Date.now()/1000 )+ ( 60 * 60 * 24),
        sub: {name: newUser.name, role: newUser.role},
    }
    const token = jwt.sign(data, jwtSecretKey);
    try {
        await User.create(newUser);
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send(error);
    }
}

// Login
userCtrl.getUser = async (req, res) => {
    const resdata = await User.find(req.body);
    // console.log(resdata[0]);
    if(!resdata) {res.json("Kindly check the email and password.")}
    else {
         const data = {
        email: resdata[0].email,
        iat: Date.now(),
        exp: Math.floor(Date.now()/1000 )+ ( 60 * 60 * 24),
        sub: {name:resdata[0].name, role: resdata[0].role}
    }
    const token = jwt.sign(data, jwtSecretKey);
    try {
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send(error);
    }
    }
}

// Others
userCtrl.getSecretData = async (req, res, next) => {
    try{
        res.status(200).send(`The authorization worked`);
    } catch(error) {
        console.log(error);
        res.status(401).send(error);
    }
}

module.exports = userCtrl;