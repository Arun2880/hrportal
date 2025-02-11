import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";

const Addemployee = () => {
  const token = sessionStorage.getItem("token");

  // State to store form input values
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
    Cl: "",
    Sl: "",
    joindate: "",
    salary: "",
    adhar: null,
    pan: null,
    resume: null,
    experience_letter: null,
  });

  // Handle input change for each field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the file object
    });
  };
  // Add employee API request
  const AddEmployeeAPI = async () => {
    try {
      const url = `http://hrportal.dreambytesolution.com/admin/registeremp`;

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("employeeId", formData.employeeId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phoneNumber);
      formDataToSend.append("address1", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("zipcode", formData.zipCode);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("Cl", formData.Cl);
      formDataToSend.append("Sl", formData.Sl);
      formDataToSend.append("joindate", formData.joindate);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("adhar", formData.adhar);
      formDataToSend.append("pan", formData.pan);
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("experience_letter", formData.experience_letter);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(url, formDataToSend, { headers });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Good job!",
          text: "Employee added successfully",
        });
      }
      console.log("Response of add employee", response);
    } catch (error) {
      console.log("Error adding employee", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to add employee",
      });
    }
  };


  return (
    <>
      <PageTitle page={"Add Employee"} />
      <div className="container py-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            AddEmployeeAPI();
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Employee ID"
                variant="outlined"
                required
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Employee Department"
                variant="outlined"
                required
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Employee Salary"
                variant="outlined"
                required
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Zip Code"
                type="number"
                variant="outlined"
                required
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Joining Date"
                type="date"
                variant="outlined"
                required
                name="joindate" // Fixed the name here
                value={formData.joindate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label stays visible
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Casual Leave"
                type="text"
                variant="outlined"
                required
                name="Cl"
                value={formData.Cl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Sick Leave"
                type="text"
                variant="outlined"
                required
                name="Sl"
                value={formData.Sl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                required
                name="adhar"
                 label="Upload Aadhar Card"
                onChange={handleFileChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                required
                name="pan"
                 label="Upload Pan Card"
                onChange={handleFileChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                required
                name="resume"
                label="Upload Resume"
                onChange={handleFileChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                required
                name="experience_letter"
                label="Experience Letter"
                onChange={handleFileChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" color="error">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default Addemployee;
