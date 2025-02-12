import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineQueryStats } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import rulebool from "../../images/Dream-rule-book.pdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./admin.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [employeedata, setemployeedata] = useState(0);
  const [unsolvedata, setunsolvedata] = useState(0);
  const [solvedata, setsolvedata] = useState(0);
  const [employeeChartData, setEmployeeChartData] = useState([]);
  const [queryChartData, setQueryChartData] = useState([]);

  useEffect(() => {
    Totalemployeedata();
    Totalunsolvequery();
    Totalsolvequery();
  }, []);

  const Totalemployeedata = async () => {
    try {
      const url = `http://localhost:5000/hr/admin/emplist`;
      const headers = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers: headers });
      console.log("response of employee", response.data);
      setemployeedata(response.data.data.length);

      // Prepare data for the bar chart
      const employeeData = response.data.data.map((emp) => ({
        name: emp.name,
        createdAt: new Date(emp.createdAt).toLocaleDateString(),
      }));
      setEmployeeChartData(employeeData);
    } catch (error) {
      console.log(error);
    }
  };

  const Totalunsolvequery = async () => {
    try {
      const url = `http://localhost:5000/hr/admin/getallquery`;
      const headers = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers: headers });
      console.log("response unsolve", response.data);
      setunsolvedata(response.data.data.length);

      // Prepare data for the pie chart
      const queryData = response.data.data.reduce((acc, query) => {
        const date = new Date(query.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      const pieChartData = Object.keys(queryData).map((date) => ({
        name: date,
        value: queryData[date],
      }));
      setQueryChartData(pieChartData);
    } catch (error) {
      console.log(error);
    }
  };

  const Totalsolvequery = async () => {
    try {
      const url = `http://localhost:5000/hr/admin/solvequery`;
      const headers = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      };
      const response = await axios.get(url, { headers: headers });
      console.log("response of solve", response);
      setsolvedata(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const viewPDF = () => {
    window.open(rulebool, "_blank");
  };

  const cardData = [
    {
      title: "Total Employee",
      value: `${employeedata}`,
      percentage: "+30%",
      description: "Since last month",
      icon: <FaUsers />,
      iconBg: "#3c96ef",
      move: "",
      percentageBg: "bg-light-green",
    },
    {
      title: "Total query",
      value: `${unsolvedata}`,
      percentage: "+23%",
      description: "Since last week",
      icon: <MdOutlineQueryStats />,
      iconBg: "#51ab55",
      move: "",
      percentageBg: "bg-light-green",
    },
    {
      title: "Total Solve query",
      value: `${solvedata}`,
      percentage: "-10%",
      description: "Since last month",
      icon: <FaRegSmile />,
      iconBg: "#de2768",
      move: "",
      percentageBg: "bg-light-red",
    },
    {
      title: "Rule Book",
      value: "",
      icon: <TbTruckDelivery />,
      iconBg: "#272729",
      move: viewPDF,
    },
  ];

  // Colors for the pie chart
  const COLORS = ["#FF5733", "#33FF57", "#5733FF", "#FFC300", "#FF33F6"];

  return (
    <>
      <PageTitle page={"admin dashboard"} />
      <div className="container py-4" style={{ backgroundColor: "#D6E9FC" }}>
        <div className="row">
          {cardData.map((card, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className="card position-relative"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                <div
                  className={`icon-wrapper position-absolute`}
                  style={{
                    backgroundColor: card.iconBg,
                    width: "65px",
                    height: "65px",
                    borderRadius: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "-20px",
                    right: "15px",
                    fontSize: "35px",
                    color: "white",
                    boxShadow:
                      "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                  }}
                >
                  {card.icon}
                </div>
                <div className="card-body">
                  <Link
                    to="#"
                    onClick={card.move}
                    style={{ textDecoration: "none" }}
                  >
                    <h6 className="heading">{card.title}</h6>
                    <h4 className="font-weight-bold title">
                      {card.value}{" "}
                      <span className="h6 text-success">
                        <FaArrowUp />{" "}
                      </span>
                    </h4>
                    <p className="break"></p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphs Section */}
        <div className="row mt-4">
          {/* Employee Bar Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employee Overview</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={employeeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload[0]) {
                          return (
                            <div
                              className="custom-tooltip"
                              style={{ color: "red" }}
                            >
                              <p>{`Name: ${payload[0].payload.name}`}</p>
                              <p>{`Created At: ${payload[0].payload.createdAt}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="createdAt" fill="#FF5733" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Query Pie Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Query Distribution</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={queryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {queryChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload[0]) {
                          return (
                            <div className="custom-tooltip">
                              <p>{`Date: ${payload[0].payload.name}`}</p>
                              <p>{`Queries: ${payload[0].value}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
