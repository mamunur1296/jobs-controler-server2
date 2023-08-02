const mongoose = require('mongoose');

// Define the "people" schema
const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      mobile: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu-vGftUg--hLT-MqgJWQ9xAH3ln0LJ6hott_meTU&s'
      },
      ipAddress: {
        type: String,
        required: true,
      },
      deviceId: {
        type: String,
        required: true,
      },
      userAgent: {
        type: Object,
        required: true,
      },
      otpVerified: {
        type:Boolean,
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }
},
{
    timestamps:true
}
);


// Create the "people" model
const People = mongoose.model('People', peopleSchema);

module.exports = People;
