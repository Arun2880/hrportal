import React, { useState } from "react";
import "./sidebar.css";

import { FaUsers } from "react-icons/fa";
import { RiBriefcase4Fill } from "react-icons/ri";
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  let role = "";

  const [dropdowns, setDropdowns] = useState({
    employees: false,
    categorys: false,
    product: false,
    drivers: false,
    proposals: false,
    leave: false,
  });

  const toggleDropdown = (name) => {
    setDropdowns({ ...dropdowns, [name]: !dropdowns[name] });
  };
  role = sessionStorage.getItem("role");
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>
                        <IoGridOutline size={20} />
                        <span className='nav-heading collapsed'>Dashboard</span>
                    </Link>
                </li> */}
        {role === "admin" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/admindashboard">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">Admin Dashboard</span>
              </Link>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => toggleDropdown("categorys")}
              >
                <MdOutlineCategory size={20} />
                <span className="nav-heading collapsed">Employee</span>
              </div>
              {dropdowns.categorys && (
                <ul className="nav-content">
                  <li className="ps-3">
                    <Link to="/add-employee" className="nav-link">
                      <i className="bi bi-circle"></i>
                      <span className="nav-heading collapsed">
                        Add Employee
                      </span>
                    </Link>
                  </li>
                  <li className="ps-3">
                    <Link to="/employee-list" className="nav-link">
                      <i className="bi bi-circle"></i>
                      <span className="nav-heading collapsed">
                        Employee list
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employees-leave">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">Employee Leaves</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/query-list">
                <MdHistoryEdu size={20} />
                <span className="nav-heading collapsed">All Querys</span>
              </Link>
            </li>
          </>
        )}

        {role === "employee" && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/franchisedashboard">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">
                  Franchise Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/send-query">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">Raise Query</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/your-query">
                <IoGridOutline size={20} />
                <span className="nav-heading collapsed">Your query</span>
              </Link>
            </li>

            <li className="nav-item">
              <div className="nav-link" onClick={() => toggleDropdown("leave")}>
                <RiBriefcase4Fill size={20} />
                <span className="nav-heading collapsed">Leaves</span>
              </div>
              {dropdowns.leave && (
                <ul className="nav-content">
                  <li className="ps-3">
                    <Link to="/apply-leave" className="nav-link">
                      <i className="bi bi-circle"></i>
                      <span className="nav-heading collapsed">Apply Leave</span>
                    </Link>
                  </li>
                  <li className="ps-3">
                    <Link to="/leave-history" className="nav-link">
                      <i className="bi bi-circle"></i>
                      <span className="nav-heading collapsed">
                        Leave history
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SideBar;
