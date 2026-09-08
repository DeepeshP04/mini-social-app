const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Monodb connected successfully")
    } catch(error) {
        console.log("Mongodb connection failed:", error.message)
    }
}

module.exports = connectDB;