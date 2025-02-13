const express = require("express");

const router = express.Router();

const {
    Addquery,
    GetAllQuery,
    applyLeave,
    getLeaveHistory
} = require("../controllers/employeecontroller");
const {
  verifyToken,
  isEmployee,
} = require("../middleware/authMiddleware");


router.post("/addquery",Addquery, verifyToken,isEmployee);
router.get("/getquery/:employeeId",GetAllQuery);
router.post("/applyleave",applyLeave,verifyToken,isEmployee);
router.get("/leavehistory/:employeeId",getLeaveHistory,verifyToken,isEmployee);

module.exports = router;
