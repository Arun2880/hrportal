require("./config/server");
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Adminrouter=require("./routes/adminroutes");
const Employeerouter=require("./routes/employeeroute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/admin",Adminrouter);
app.use('/employee',Employeerouter);
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log("Server running on port no= ", port);
});
