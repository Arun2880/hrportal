import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const Leavehistory = () => {
  const token = sessionStorage.getItem("token");
  const decodeData = jwtDecode(token);
  const employeeId = decodeData.id;

  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    Getyourleaveshistory();
  }, []);

  const Getyourleaveshistory = async () => {
    try {
      const url = `http://localhost:5000/hr/employee/leavehistory/${employeeId}`;
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      console.log("response of leave history", response);

      if (response.data.error === false) {
        setLeaveHistory(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "leaveType", headerName: "Leave Type", width: 150 },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: "status", headerName: "Status", width: 120 },
    { field: "totalDays", headerName: "Total Days", width: 120 },
  ];

  // Transform API data for DataGrid (since it requires an "id" field)
  const rows = leaveHistory.map((leave, index) => ({
    id: index + 1, // Using index as a unique ID
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    status: leave.status,
    totalDays: leave.totalDays,
  }));

  return (
    <>
      <PageTitle page={"Your Leaves"} />
      <Box sx={{ height: 400, width: "100%", p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Leave History
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Leavehistory;
