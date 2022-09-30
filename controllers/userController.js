require('dotenv').config();
const User = require("../models/User");
const userCtrl = {};
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');

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
        sub: newUser.name,
    }
    const token = jwt.sign(data, jwtSecretKey);
    try {
        await User.create(newUser);
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send(error);
    }
}
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        res.send("The token is not found");
    } else {
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if(err) {
                res.json({auth: false, message: "U failed to authenticate"});
            } else {
                req.token = decoded.name;
                next();
            }
        } )
    }

}
// Login
userCtrl.getUser = async (req, res) => {
    const resdata = await User.find(req.body);
    console.log(resdata[0]);
    if(!resdata) {res.json("Kindly check the email and password.")}
    else {
         const data = {
        email: resdata[0].email,
        iat: Date.now(),
        exp: Math.floor(Date.now()/1000 )+ ( 60 * 60 * 24),
        sub: resdata[0].name,
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
userCtrl.getUserData = (req, res) => {
    
}

module.exports = userCtrl, verifyJWT;