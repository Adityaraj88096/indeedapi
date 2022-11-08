require("dotenv").config();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY


const verifyEmployeeJWT = async (req, res, next) => {
    const token = await req.headers["authorization"];
    if (!token) {
        res.status(404).send("The token is not found");
    } else {
        jwt.verify(token, jwtSecretKey, async (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({ auth: false, message: "U failed to authenticate" });
            } else {
                let email = decoded.email;
                let name = decoded.sub.name;
                let role = decoded.sub.role;
                const userFound = await User.find({ email: email, name: name, role: role })
                if (userFound[0].role === 'employee') {
                    next();
                }
                else {
                    res.status(403).json({ message: "You are not authorized to access this info." })
                }
            }
        })
    }
}

module.exports = verifyEmployeeJWT;