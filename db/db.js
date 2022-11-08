const mongoose = require('mongoose');
const URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;