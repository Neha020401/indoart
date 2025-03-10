const mongoose = require('mongoose');

// MongoDB connection
mongoose
  .connect('mongodb+srv://vanshika:mini123@cluster0.h8cjb.mongodb.net/indoart')
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define the User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  isArtist:{
    type:Boolean,
    default:false
  }
});

// Create the User model
const users = mongoose.model('users', userSchema);

// Export the model
module.exports = users;
