const mongoose = require('mongoose');

// Define the team member schema
const teamMemberSchema = new mongoose.Schema({
  name: {
    type:String,
  },
  email:{
    type:String,
  } ,
  phone: {
    type:Number, 
  },
  gender: {
    type:String,
  },
  address: {
    type:String,
  }
});

// Create the TeamMember model
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;



// const mongoose = require('mongoose');

// // Define the team member schema
// const fileSchema = new mongoose.Schema({
//   name: {
//     type:String,
//   },
//   email:{
//     type:String,
//   } ,
//   phone: {
//     type:Number, 
//   },
//   gender: {
//     type:String,
//   },
//   address: {
//     type:String,
//   }
// });

// // Create the TeamMember model
// const FileData = mongoose.model('FileData', fileSchema);

// module.exports = FileData;
