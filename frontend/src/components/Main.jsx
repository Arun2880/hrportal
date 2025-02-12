import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageTitle from "./PageTitle.jsx";
import Dashboard from "../Pages/Dashboard";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";

import "./main.css";
import Login from "../Pages/Login.jsx";
import AdminDashboard from "../Pages/Admin/AdminDashboard.jsx";

import FranchiseDashboard from "../Pages/Employee/FranchiseDashboard.jsx";
import Protected from "../Pages/Protected.jsx";

import Addquery from "../Pages/Employee/Addquery.jsx";
import Addemployee from "../Pages/Admin/Addemployee.jsx";
import Employeelist from "../Pages/Admin/Employeelist.jsx";
import Viewquery from "../Pages/Admin/Viewquery.jsx";
import Viewourquery from "../Pages/Employee/Viewourquery.jsx";
import Leavelist from "../Pages/Admin/Leavelist.jsx";
import Applyleave from "../Pages/Employee/Applyleave.jsx";
import Leavehistory from "../Pages/Employee/Leavehistory.jsx";

function Main() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    // Map routes to page titles
    const routeToTitle = {
      "/dashboard": "Dashboard",
      "/franchisedashboard": "Franchise dashboard",
      "/add-employee": "Add Employee",
      "/employee-list": "Employee List",
      "/send-query": "Send Query",
      '/query-list':"All querys",
      '/your-query':"Your Query",
      '/employees-leave':"Employee Leaves",
      '/apply-leave':"Apply Leave",
      '/leave-history':"Leave History"
    };

    const title = routeToTitle[location.pathname];
    if (title) {
      setPageTitle(title);
    } else {
      setPageTitle("");
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <SideBar />
      <main
        id="main"
        className="main"
        style={{ backgroundColor: "#D6E9FC", height: "auto" }}
      >
        {/* <PageTitle page={pageTitle} /> */}
        <Routes>
          <Route
            path="/admindashboard"
            element={<Protected Component={AdminDashboard} />}
          />
          <Route path="/franchisedashboard" element={<FranchiseDashboard />} />
          <Route path="/add-employee" element={<Addemployee />} />
          <Route path="/employee-list" element={<Employeelist />} />
          <Route path="/send-query" element={<Addquery />} />
          <Route path="/query-list" element={<Viewquery />} />
          <Route path="/your-query" element={<Viewourquery />} />
          <Route path="/employees-leave" element={<Leavelist />} />
          <Route path="/apply-leave" element={<Applyleave />} />
          <Route path="/leave-history" element={<Leavehistory />} />

          {/* user Billing routes */}
        </Routes>
      </main>
    </>
  );
}

export default Main;
