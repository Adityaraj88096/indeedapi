const mongoose = require('mongoose');
const URI = process.env.MONGO_URI || "mongodb+srv://aditya:aditya@cluster0.ia1ss.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;