// Import necessary modules and dependencies
const mongoose = require('mongoose');

/**
 * Define the Team Member schema using Mongoose.
 *
 * This schema defines the structure and data types for a team member object.
 * The team member object includes fields for name, email, phone number, gender, and address.
 * Each field is specified with its corresponding data type using the Mongoose schema.
 */
const teamMemberSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    collation: {
      locale: 'en_US',
      strength: 2,
    },
  });

/**
 * Create the TeamMember model using the Mongoose schema.
 *
 * The TeamMember model is a representation of the teamMemberSchema, and it provides
 * an interface to interact with the MongoDB collection for team members.
 * The model will be used to perform CRUD operations on team member data.
 */
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

// Export the TeamMember model
module.exports = TeamMember;

