import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Viewourquery = () => {
  const [queryData, setQueryData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const token = sessionStorage.getItem("token");
  const decodedData = jwtDecode(token);
  const employeeId = decodedData.id;

  useEffect(() => {
    Getyourquery();
  }, []);

  const Getyourquery = async () => {
    try {
      const url = `http://localhost:5000/hr/employee/getquery/${employeeId}`;
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers: headers });
      console.log("response of query", response);
      if (response.data && response.data.data) {
        setQueryData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "S.No", width: 90 },
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  // Map queryData to DataGrid format with serial number
  const rows = queryData.map((item, index) => ({
    id: index + 1, // Serial Number
    subject: item.subject,
    message: item.message,
    status: item.status,
    createdAt: new Date(item.createdAt).toLocaleString(), // Formatting date
  }));

  return (
    <>
      <PageTitle page={"Your Query"} />
      <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection // ✅ Adds checkbox for row selection
          onRowSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
        />
      </Box>

      {/* Debugging or using selected rows */}
      <p>Selected Row IDs: {JSON.stringify(selectedRows)}</p>
    </>
  );
};

export default Viewourquery;
