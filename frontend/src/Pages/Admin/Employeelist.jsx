import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Modal, TextField, Box, Button, Grid } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Swal from "sweetalert2";

const Employeelist = () => {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    GetEmployeelist();
  }, []);

  const GetEmployeelist = async () => {
    try {
      const url = "http://localhost:5000/hr/admin/emplist";
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers: headers });
      console.log("Get employee response", response);
      setEmployees(response.data.data); // Assuming the data is nested under data.data
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setOpenModal(true);
  };

  const handleDeleteClick = (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `http://localhost:5000/hr/admin/delemp/${employeeId}`;
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          await axios.delete(url, { headers });
          Swal.fire("Deleted!", "The employee has been deleted.", "success");
          GetEmployeelist();
        } catch (error) {
          console.log("Error deleting employee", error);
          Swal.fire(
            "Error!",
            "There was an issue deleting the employee.",
            "error"
          );
        }
      }
    });
  };

  const handleUpdateEmployee = async () => {
    try {
      const url = `http://localhost:5000/hr/admin/updateemp/${currentEmployee._id}`;
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("name", currentEmployee.name);
      formData.append("phone", currentEmployee.phone);
      formData.append("address1", currentEmployee.address1);
      formData.append("city", currentEmployee.city);
      formData.append("state", currentEmployee.state);
      formData.append("zipcode", currentEmployee.zipcode);
      formData.append("Cl", currentEmployee.Cl);
      formData.append("Sl", currentEmployee.Sl);
      if (currentEmployee.adhar)
        formData.append("adhar", currentEmployee.adhar);
      if (currentEmployee.pan) formData.append("pan", currentEmployee.pan);
      if (currentEmployee.resume)
        formData.append("resume", currentEmployee.resume);
      if (currentEmployee.experience_letter)
        formData.append("experience_letter", currentEmployee.experience_letter);

      const response = await axios.put(url, formData, { headers });
      console.log("Update response", response);
      Swal.fire("Updated!", "Employee details have been updated.", "success");
      setOpenModal(false);
      GetEmployeelist();
    } catch (error) {
      console.log("Error updating employee", error);
      Swal.fire("Error!", "There was an issue updating the employee.", "error");
    }
  };

  const handleChange = (e) => {
    setCurrentEmployee({
      ...currentEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCurrentEmployee({
      ...currentEmployee,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "employeeId", headerName: "Employee ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "Cl", headerName: "Total CL", width: 150 },
    { field: "Sl", headerName: "Total SL", width: 150 },
    { field: "usedCL", headerName: "Used CL", width: 150 },
    { field: "usedSL", headerName: "Used SL", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "address1", headerName: "Address", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "zipcode", headerName: "Zipcode", width: 150 },
    { field: "createdAt", headerName: "Date", width: 150 },
    {
      field: "adhar",
      headerName: "Aadhar",
      width: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/hr/${params.value}`}
          alt="Aadhar"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() =>
            handleImageClick(`http://localhost:5000/hr/${params.value}`)
          }
        />
      ),
    },
    {
      field: "pan",
      headerName: "PAN",
      width: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/hr/${params.value}`}
          alt="PAN"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() =>
            handleImageClick(`http://localhost:5000/hr/${params.value}`)
          }
        />
      ),
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/hr/${params.value}`}
          alt="Resume"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() =>
            handleImageClick(`http://localhost:5000/hr/${params.value}`)
          }
        />
      ),
    },
    {
      field: "experience_letter",
      headerName: "Experience Letter",
      width: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/hr/${params.value}`}
          alt="Experience Letter"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={() =>
            handleImageClick(`http://localhost:5000/hr/${params.value}`)
          }
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleEditClick(params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <PageTitle page={"Employee List"} />
      <div>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>

      {/* Edit Employee Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: "white",
            width: "90%",
            maxWidth: 600,
            margin: "auto",
            marginTop: "50px",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <h2 id="modal-title">Update Employee Details</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={currentEmployee?.name || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={currentEmployee?.phone || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address1"
                value={currentEmployee?.address1 || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={currentEmployee?.city || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={currentEmployee?.state || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipcode"
                value={currentEmployee?.zipcode || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total CL"
                name="Cl"
                value={currentEmployee?.Cl || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total SL"
                name="Sl"
                value={currentEmployee?.Sl || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                name="adhar"
                onChange={handleFileChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                name="pan"
                onChange={handleFileChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                name="resume"
                onChange={handleFileChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                name="experience_letter"
                onChange={handleFileChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button onClick={() => setOpenModal(false)} color="error">
              Cancel
            </Button>
            <Button onClick={handleUpdateEmployee} color="success">
              Update
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Image Modal */}
      <Modal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: "white",
            width: "90%",
            maxWidth: 600,
            margin: "auto",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Employeelist;
