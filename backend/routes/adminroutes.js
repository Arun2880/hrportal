// const express = require("express");

// const router = express.Router();

// const {
//   RegisterAdmin,
//   loginUser,
//   Employeeregister,
//   Getemployeeswithleaves,
//   Updateemployee,
//   Delemployee,
//   Getallquerys,
//   Getallsolvequerys,
//   Updatequerystatus,
//   logoutUser,
//   getAllLeaveRequests,
//   approveLeave,
//   updateLeave
// } = require("../controllers/admincontroller");
// const {
//   verifyToken,
//   isAdmin,
//   isEmployee,
// } = require("../middleware/authMiddleware");

// router.post("/registeradmin", RegisterAdmin);
// router.post("/login", loginUser);
// router.post("/registeremp", Employeeregister, verifyToken, isAdmin);
// router.get("/emplist",Getemployeeswithleaves,verifyToken, isAdmin);
// router.put('/updateemp/:id',Updateemployee);
// router.delete('/delemp/:id',Delemployee,verifyToken, isAdmin);
// router.get("/getallquery",Getallquerys);
// router.get("/solvequery",Getallsolvequerys);
// router.put("/chnagestatus/:id",Updatequerystatus);
// router.post("/logout",logoutUser);
// router.get("/allleaves",getAllLeaveRequests);
// router.put("/leaveapprove",approveLeave);
// router.put("/updateleave/:leaveId",updateLeave,verifyToken, isAdmin);
// module.exports = router;



const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");

const {
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
  updateLeave,
} = require("../controllers/admincontroller");

const {
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");

// Admin Registration & Login
router.post("/registeradmin", RegisterAdmin);
router.post("/login", loginUser);

// Employee Registration with Multer for file uploads
router.post(
  "/registeremp",
  upload.fields([
    { name: "adhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "experience_letter", maxCount: 1 },
  ]),
  Employeeregister
);

// Employee Operations
router.get("/emplist", Getemployeeswithleaves, verifyToken, isAdmin);
// router.put("/updateemp/:id", Updateemployee);
router.put(
  "/updateemp/:id",
  upload.fields([
    { name: "adhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "experience_latter", maxCount: 1 },
  ]),
  Updateemployee
);

router.delete("/delemp/:id", Delemployee, verifyToken, isAdmin);

// Queries Management
router.get("/getallquery", Getallquerys);
router.get("/solvequery", Getallsolvequerys);
router.put("/chnagestatus/:id", Updatequerystatus);

// Leave Management
router.post("/logout", logoutUser);
router.get("/allleaves", getAllLeaveRequests);
router.put("/leaveapprove", approveLeave);
router.put("/updateleave/:leaveId", updateLeave, verifyToken, isAdmin);

module.exports = router;
