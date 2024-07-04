const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
         await mongoose.connect(process.env.DBLOCALURL);
         console.log("Database successfully connected");
         return true;
    } catch (error) {
       console.log("Database is not connected ", error)
       return false;
    }
}
module.exports = connectDB;