import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import Swal from "sweetalert2";
 

const Leavelist = () => {
  const [leaves, setLeaves] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [updatedStartDate, setUpdatedStartDate] = useState("");
  const [updatedEndDate, setUpdatedEndDate] = useState("");
  const [updatedLeaveType, setUpdatedLeaveType] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    getAllLeaves();
  }, []);

  const getAllLeaves = async () => {
    try {
      const url = "http://hrportal.dreambytesolution.com/admin/allleaves";
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      console.log("Response of leave", response.data);

      if (!response.data.error) {
        const formattedData = response.data.data.map((leave) => ({
          id: leave._id,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.name || "N/A",
          email: leave.employeeId?.email || "N/A",
          phone: leave.employeeId?.phone || "N/A",
          leaveType: leave.leaveType,
          startDate: new Date(leave.startDate).toLocaleDateString(),
          endDate: new Date(leave.endDate).toLocaleDateString(),
          totalDays: leave.totalDays,
          status: leave.status,
          _id: leave.employeeId?._id,
        }));
        setLeaves(formattedData);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    try {
      const url = "http://hrportal.dreambytesolution.com/admin/leaveapprove";
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(url, { leaveId, status }, { headers });
      console.log("Update Response:", response.data);
      if(response.error==false){
        Swal.fire({
          title: "Good job!",
          text: "Leave status updated Successfully.",
          icon: "success"
        });
      }

      if (!response.data.error) {
        getAllLeaves();
        Swal.fire("Success", `Leave status updated to ${status}`, "success");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const handleOpenModal = (leave) => {
    setSelectedLeave(leave);
    setUpdatedStartDate(leave.startDate);
    setUpdatedEndDate(leave.endDate);
    setUpdatedLeaveType(leave.leaveType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLeave(null);
  };

  const handleUpdateLeave = async () => {
    try {
      const url = `http://hrportal.dreambytesolution.com/admin/updateleave/${selectedLeave.id}`;
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        url,
        {
          employeeId: selectedLeave._id,
          leaveType: updatedLeaveType,
          startDate: updatedStartDate,
          endDate: updatedEndDate,
        },
        { headers }
      );

      console.log("Update Leave Response:", response.data);

      if (!response.data.error) {
        getAllLeaves();
        handleCloseModal();
        Swal.fire("Success", "Leave details updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating leave:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "employeeId", headerName: "Employee ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "leaveType", headerName: "Leave Type", width: 120 },
    { field: "startDate", headerName: "Start Date", width: 130 },
    { field: "endDate", headerName: "End Date", width: 130 },
    { field: "totalDays", headerName: "Total Days", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span style={{
          color: params.value === "Pending" ? "red" : params.value === "Rejected" ? "blue" : "green",
          fontWeight: "bold",
        }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="success" size="small" onClick={() => updateLeaveStatus(params.row.id, "Approved")} style={{ marginRight: 10 }}>Approve</Button>
          <Button variant="contained" color="error" size="small" onClick={() => updateLeaveStatus(params.row.id, "Rejected")}>Reject</Button>
          <Button variant="contained" color="primary" size="small" onClick={() => handleOpenModal(params.row)} style={{ marginLeft: 10 }}>Update</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <PageTitle page="Employee Leaves" />
      <div className="container mt-4" style={{ height: 500, width: "100%" }}>
        <DataGrid rows={leaves} columns={columns} pageSize={10} checkboxSelection disableSelectionOnClick />
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography variant="h6">Update Leave Details</Typography>
          <TextField label="Start Date" type="date" fullWidth value={updatedStartDate} onChange={(e) => setUpdatedStartDate(e.target.value)} sx={{ mt: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" type="date" fullWidth value={updatedEndDate} onChange={(e) => setUpdatedEndDate(e.target.value)} sx={{ mt: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField label="Leave Type" fullWidth value={updatedLeaveType} onChange={(e) => setUpdatedLeaveType(e.target.value)} sx={{ mt: 2 }} />
          <Button variant="contained" color="primary" fullWidth onClick={handleUpdateLeave} sx={{ mt: 2 }}>Update Leave</Button>
        </Box>
      </Modal>
    </>
  );
};
export default Leavelist;
