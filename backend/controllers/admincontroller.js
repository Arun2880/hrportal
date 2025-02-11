const Admin = require("../models/admin");
const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Query = require("../models/query");
const Leave = require("../models/leave");
const multer = require("multer");
const path = require("path");
const RegisterAdmin = async (req, res) => {
  const { name, email, phone, password, adminId } = req.body;

  try {
    if (!email || !phone || !password) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong || Missing field",
      });
    }

    // Hash the password

    const newAdmin = new Admin({
      name,
      email,
      phone,
      password,
      adminId,
    });

    await newAdmin.save();
    console.log("Register Admin", newAdmin);

    return res.status(200).json({
      error: false,
      message: "Admin Registered successfully.",
      data: [newAdmin],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

//   register employee

// const Employeeregister = async (req, res) => {
//   const {
//     employeeId,
//     name,
//     email,
//     phone,
//     password,
//     address1,
//     state,
//     city,
//     zipcode,
//     department,
//     Cl,
//     Sl,
//     salary,
//     joindate,
//   } = req.body;

//   try {
//     if (
//       !email ||
//       !phone ||
//       !name ||
//       !password ||
//       !employeeId ||
//       !Cl ||
//       !Sl ||
//       !salary ||
//       !department ||
//       !joindate
//     ) {
//       return res.status(400).json({
//         error: true,
//         message: "Required fields are missing",
//       });
//     }

//     const newemployee = new Employee({
//       employeeId,
//       name,
//       email,
//       phone,
//       password,
//       address1,
//       state,
//       city,
//       zipcode,
//       department,
//       Cl,
//       Sl,
//       salary,
//       joindate,
//     });

//     await newemployee.save();

//     return res.status(201).json({
//       error: false,
//       message: "Employee registered successfully",
//       data: newemployee, // Return the entire saved document
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: true,
//       message: "Internal server error",
//     });
//   }
// };

const Employeeregister = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      phone,
      password,
      address1,
      state,
      city,
      zipcode,
      department,
      Cl,
      Sl,
      salary,
      joindate,
    } = req.body;

    if (
      !email ||
      !phone ||
      !name ||
      !password ||
      !employeeId ||
      !Cl ||
      !Sl ||
      !salary ||
      !department ||
      !joindate
    ) {
      return res.status(400).json({
        error: true,
        message: "Required fields are missing",
      });
    }

    // Get uploaded file paths (if present)
    const adhar = req.files["adhar"] ? req.files["adhar"][0].path : null;
    const pan = req.files["pan"] ? req.files["pan"][0].path : null;
    const resume = req.files["resume"] ? req.files["resume"][0].path : null;
    const experience_letter = req.files["experience_letter"]
      ? req.files["experience_letter"][0].path
      : null;

    const newEmployee = new Employee({
      employeeId,
      name,
      email,
      phone,
      password,
      address1,
      state,
      city,
      zipcode,
      department,
      Cl,
      Sl,
      salary,
      joindate,
      adhar,
      pan,
      resume,
      experience_letter,
    });

    await newEmployee.save();

    return res.status(201).json({
      error: false,
      message: "Employee registered successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};






const loginUser = async (req, res) => {
  const { adminId, employeeId, password } = req.body;

  try {
    let user;
    let role;

    // Check if the user is logging in using adminId or employeeId
    if (adminId) {
      // Find user by adminId
      user = await Admin.findOne({ adminId });
      role = "admin";
    } else if (employeeId) {
      // Find user by employeeId
      user = await Employee.findOne({ employeeId });
      role = "employee";
    } else {
      return res.status(400).json({
        error: true,
        message: "Please provide either adminId or employeeId",
      });
    }

    // If no user is found
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    // Compare password (plaintext comparison for now)
    if (password !== user.password) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role }, // Add user ID and role to the token
      process.env.JWT_SECRET, // Ensure you have a JWT secret in your environment variables
      { expiresIn: "1h" } // Set token expiration time to 1 hour
    );

    // Send response with user details and token
    return res.status(200).json({
      error: false,
      message: "Login successful",
      name: user.name, // Send user's name in the response
      role, // Send role (admin or employee)
      token, // Send the generated JWT token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// view Employee list

// const Getemployees=async(req,res)=>{

//     try{

//         const employeelist=await Employee.find({is_deleted:{$ne:1}});
//         if(!employeelist || employeelist.length==0){
//             return res.status(404).json({
//                 error:true,
//                 message:"No Employee found"
//             })
//         }
//         return res.status(200).json({
//             error:true,
//             message:"Employee list",
//             data:employeelist
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             error:true,
//             message:"Internal server error"
//         })
//     }
// }

const Getemployeeswithleaves = async (req, res) => {
  try {
    const employeelist = await Employee.find({ is_deleted: { $ne: 1 } });

    if (!employeelist || employeelist.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No Employee found",
      });
    }

    // Calculate remaining CL & SL leaves for each employee
    const employeesWithLeaves = await Promise.all(
      employeelist.map(async (employee) => {
        // Fetch the most recent leave details from the Employee collection
        const latestEmployee = await Employee.findById(employee._id);

        // Get total CL and SL leaves taken from Leave collection
        const leaves = await Leave.find({
          employeeId: employee._id,
        });

        let clUsed = 0;
        let slUsed = 0;
        let clApplied = 0;
        let slApplied = 0;

        // Count how many leaves are used for each type
        leaves.forEach((leave) => {
          if (leave.status === "Approved") {
            if (leave.leaveType === "CL") {
              clUsed += leave.totalDays;
            } else if (leave.leaveType === "SL") {
              slUsed += leave.totalDays;
            }
          } else if (leave.status === "Pending") {
            if (leave.leaveType === "CL") {
              clApplied += leave.totalDays;
            } else if (leave.leaveType === "SL") {
              slApplied += leave.totalDays;
            }
          }
        });

        // Ensure CL and SL values are always correct and dynamic
        const totalCL = latestEmployee.Cl || 0;
        const totalSL = latestEmployee.Sl || 0;
        const remainingCL = Math.max(totalCL - clUsed, 0);
        const remainingSL = Math.max(totalSL - slUsed, 0);

        return {
          _id: latestEmployee._id,
          employeeId: latestEmployee.employeeId,
          name: latestEmployee.name,
          email: latestEmployee.email,
          phone: latestEmployee.phone,
          address1: latestEmployee.address1,
          city: latestEmployee.city,
          state: latestEmployee.state,
          zipcode: latestEmployee.zipcode,
          role: latestEmployee.role,
          createdAt: latestEmployee.createdAt.toLocaleString(),
          department: latestEmployee.department,
          adhar:latestEmployee.adhar,
          pan:latestEmployee.pan,
          resume:latestEmployee.resume,
          experience_letter:latestEmployee.experience_letter,
          salary: latestEmployee.salary,
          Cl: totalCL, // Corrected Original CL count
          Sl: totalSL, // Corrected Original SL count
          usedCL: clUsed, // CL leaves taken
          usedSL: slUsed, // SL leaves taken
          appliedCL: clApplied, // CL leaves applied but not yet approved
          appliedSL: slApplied, // SL leaves applied but not yet approved
          remainingCL, // Updated Remaining CL
          remainingSL, // Updated Remaining SL
        };
      })
    );

    return res.status(200).json({
      error: false,
      message: "Employee list with leave details",
      data: employeesWithLeaves,
    });
  } catch (error) {
    console.error("Error fetching employee leaves:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
// get all leaves

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate(
      "employeeId", 
      "employeeId name email phone department salary Cl Sl"
    );

    res.status(200).json({ error: false, data: leaveRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


// // Update employee
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload files to "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."), false);
  }
};

// Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


// const Updateemployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       phone,
//       address1,
//       city,
//       state,
//       zipcode,
//       department,
//       salary,
//       remainingCL,
//       remainingSL,
//       Cl,
//       Sl,
//       usedCL,
//       usedSL,
//     } = req.body;

//     // Check if request body is empty
//     if (
//       !name &&
//       !phone &&
//       !address1 &&
//       !city &&
//       !state &&
//       !zipcode &&
//       !department &&
//       !salary &&
//       !remainingCL &&
//       !remainingSL &&
//       !Cl &&
//       !Sl &&
//       !usedCL &&
//       !usedSL
//     ) {
//       return res.status(400).json({
//         error: true,
//         message: "At least one field is required for update.",
//       });
//     }

//     // Update data
// const updatedEmployee = await Employee.findByIdAndUpdate(
//       id,
//       {
//         name,
//         phone,
//         address1,
//         city,
//         state,
//         zipcode,
//         department,
//         salary,
//         remainingCL,
//         remainingSL,
//         Cl,
//         Sl,
//         usedCL,
//         usedSL,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedEmployee) {
//       return res.status(404).json({
//         error: true,
//         message: "Employee not found or not updated.",
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       message: "Employee Updated Successfully.",
//       data: updatedEmployee,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal server error",
//       details: error.message,
//     });
//   }
// };

// // const delete employee



const Updateemployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      address1,
      city,
      state,
      zipcode,
      department,
      salary,
      remainingCL,
      remainingSL,
      Cl,
      Sl,
      usedCL,
      usedSL,
    } = req.body;

    const updateData = {
      name,
      phone,
      address1,
      city,
      state,
      zipcode,
      department,
      salary,
      remainingCL,
      remainingSL,
      Cl,
      Sl,
      usedCL,
      usedSL,
    };

    // Handling optional file uploads
    if (req.files) {
      if (req.files.adhar) updateData.adhar = req.files.adhar[0].path;
      if (req.files.pan) updateData.pan = req.files.pan[0].path;
      if (req.files.resume) updateData.resume = req.files.resume[0].path;
      if (req.files.experience_latter) updateData.experience_latter = req.files.experience_latter[0].path;
    }

    // Update the employee record
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({
        error: true,
        message: "Employee not found or not updated.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Employee Updated Successfully.",
      data: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
};

const Delemployee = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong || Employee Id missing",
      });
    }
    const delemp = await Employee.findByIdAndUpdate(
      id,
      { is_deleted: 1 },
      { new: true }
    );
    if (!delemp) {
      return res.status(error).json({
        error: true,
        message: "Employee not delete",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Employee deleted successfully",
      data: delemp,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// getallemployee

const Getallquerys = async (req, res) => {
  try {
    const querylist = await Query.find().populate("employee"); // Populate employee details

    if (!querylist || querylist.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No queries found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Query list retrieved successfully",
      data: querylist,
    });
  } catch (error) {
    console.error("Error fetching queries:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const Getallsolvequerys = async (req, res) => {
  try {
    const querylist = await Query.find({ status: "solve" });
    if (!querylist || querylist.length == 0) {
      return res.status(404).json({
        error: true,
        message: "No query here",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Query list",
      data: querylist,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// update query status

const Updatequerystatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong || ID missing ",
      });
    }
    const data = await Query.findByIdAndUpdate(
      id,
      { status: "solve" },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        error: true,
        message: "Data not Updated",
      });
    }
    return res.status(200).json({
      error: true,
      message: "Query status Updated",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      error: false,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};


const approveLeave = async (req, res) => {
  const { leaveId, status } = req.body;

  try {
    // Find the leave request
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ error: true, message: "Leave request not found" });
    }

    // Validate status
    if (status !== "Approved" && status !== "Rejected") {
      return res.status(400).json({ error: true, message: "Invalid status" });
    }

    // Update leave status
    leave.status = status;
    await leave.save();

    // If status is "Approved", update employee's leave balance
    if (status === "Approved") {
      const employee = await Employee.findById(leave.employeeId);
      if (!employee) {
        return res.status(404).json({ error: true, message: "Employee not found" });
      }

      // Ensure employee.Cl and employee.Sl are valid numbers
      if (leave.leaveType === "CL" && typeof employee.Cl === "number") {
        employee.Cl -= leave.totalDays;
      } else if (leave.leaveType === "SL" && typeof employee.Sl === "number") {
        employee.Sl -= leave.totalDays;
      }

      // Save the updated employee
      await employee.save();
    }

    return res.status(200).json({ error: false, message: `Leave request ${status}`, data: leave });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};


// update applied leave

const updateLeave = async (req, res) => {
  const { leaveId } = req.params;
  const { employeeId, leaveType, startDate, endDate } = req.body;

  try {
      const leave = await Leave.findById(leaveId);
      if (!leave) {
          return res.status(404).json({ error: true, message: "Leave request not found" });
      }

      if (leave.status !== "Pending") {
          return res.status(400).json({ error: true, message: "Only pending leave requests can be updated" });
      }

      const employee = await Employee.findById(employeeId);
      if (!employee) {
          return res.status(404).json({ error: true, message: "Employee not found" });
      }

      const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;

      if (leaveType === "CL" && employee.Cl < totalDays) {
          return res.status(400).json({ error: true, message: "Insufficient Casual Leave balance" });
      }
      if (leaveType === "SL" && employee.Sl < totalDays) {
          return res.status(400).json({ error: true, message: "Insufficient Sick Leave balance" });
      }

      leave.leaveType = leaveType;
      leave.startDate = startDate;
      leave.endDate = endDate;
      leave.totalDays = totalDays;

      await leave.save();

      return res.status(200).json({ error: false, message: "Leave request updated successfully", data: leave });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: "Internal server error" });
  }
};


module.exports = {
  RegisterAdmin,
  loginUser,
  Employeeregister,
  Getemployeeswithleaves,
  Updateemployee,
  Delemployee,
  Getallquerys,
  Getallsolvequerys,
  Updatequerystatus,
  logoutUser,
  getAllLeaveRequests,
  approveLeave,
  updateLeave
};
