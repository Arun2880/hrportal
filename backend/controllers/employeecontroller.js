const Query = require("../models/query");  
const Employee = require("../models/employee");
const Leave=require("../models/leave");

 const Addquery = async (req, res) => {
    const { subject, message, employeeId } = req.body;

    try {
        
        if (!subject || !message || !employeeId) {
            return res.status(400).json({
                error: true,
                message: "Missing subject, message, or employee ID."
            });
        }

        
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({
                error: true,
                message: "Employee not found."
            });
        }

        
        const newQuery = new Query({
            subject,
            message,
            employee: employee._id
        });

        await newQuery.save();

        return res.status(200).json({
            error: false,
            message: "Your query was sent successfully.",
            data: newQuery
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
            details: error.message
        });
    }
};

const GetAllQuery = async (req, res) => {
    const { employeeId } = req.params; // Get employeeId from URL params

    try {
        if (!employeeId) {
            return res.status(400).json({
                error: true,
                message: "Employee ID is required."
            });
        }

        // Find all queries where `employee` field matches the given employee ID
        const queries = await Query.find({ employee: employeeId }).populate("employee", "name email phone");

        if (!queries || queries.length === 0) {
            return res.status(404).json({
                error: true,
                message: "No queries found for this employee."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Query list retrieved successfully.",
            data: queries
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
            details: error.message
        });
    }
};

// leave apply
const applyLeave = async (req, res) => {
    const { employeeId, leaveType, startDate, endDate } = req.body;
  
    try {
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
  
      const newLeave = new Leave({
        employeeId,
        leaveType,
        startDate,
        endDate,
        totalDays,
        status: "Pending",
      });
  
      await newLeave.save();
      return res.status(201).json({ error: false, message: "Leave request submitted successfully", data: newLeave });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: "Internal server error" });
    }
  };



//   get leave approve


  

//   leave history
const getLeaveHistory = async (req, res) => {
    const { employeeId } = req.params;
  
    try {
      const leaves = await Leave.find({ employeeId }).sort({ appliedAt: -1 });
      return res.status(200).json({ error: false, data: leaves });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: "Internal server error" });
    }
  };
  


module.exports = { Addquery,GetAllQuery,applyLeave,getLeaveHistory, };
