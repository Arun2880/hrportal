// const mongoose = require("mongoose");

// const EmployeeSchema = mongoose.Schema({
//   employeeId: {
//     type: String,
//     required: true,  
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//   },
//   phone: {
//     type: String,
//     required: true, 
//     minlength: 10,
//   },
//   address1: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true, 
//   },
//   zipcode: {
//     type: String,
//     required: true, 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   role: {
//     type: String,
//     default: "employee",
//   },
//   department: {
//     type: String,

//   },
//   salary: {
//     type: Number, 

//   },
//   Cl: {
//     type: Number, 
//     required: true,
//     default: 0
//   },
//   Sl: {
//     type: Number, 
//     required: true,
//     default: 0
//   },
//   joindate: {
//     type: Date,
    
//   },
//   is_deleted: {
//     type: Boolean,
//     default: false,
//   },
// });

// module.exports = mongoose.model("Employee", EmployeeSchema);


const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  employeeId: {
    type: String,
    required: true,  
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone: {
    type: String,
    required: true, 
    minlength: 10,
  },
  address1: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true, 
  },
  zipcode: {
    type: String,
    required: true, 
  },
  department: {
    type: String,
  },
  salary: {
    type: Number, 
  },
  Cl: {
    type: Number, 
    required: true,
    default: 0
  },
  Sl: {
    type: Number, 
    required: true,
    default: 0
  },
  joindate: {
    type: Date,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "employee",
  },
  adhar: {
    type: String, 
  },
  pan: {
    type: String,
  },
  resume: {
    type: String, 
  },
  experience_letter: {
    type: String, 
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
