import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
  TextField,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const Applyleave = () => {
  const token = sessionStorage.getItem("token");
  const decodedata = jwtDecode(token);
  const employeeId = decodedata.id;

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    employeeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Applyleaveapi = async () => {
    try {
      const url = `https://hrportal.dreambytesolution.com/hr/employee/applyleave`;

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        employeeId: employeeId,
      };

      const response = await axios.post(url, requestBody, { headers });
      // console.log("Response of apply leave:", response);
      if (response.status == 201) {
        Swal.fire({
          title: "Good job!",
          text: "You leave apply successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle page={"Apply Leave"} />
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Applyleaveapi();
          }}
        >
          <Grid container spacing={3}>
            {/* Leave Type Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Leave Type</InputLabel>
                <Select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="CL">Casual Leave (CL)</MenuItem>
                  <MenuItem value="SL">Sick Leave (SL)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                variant="outlined"
                required
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleChange}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                variant="outlined"
                required
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={handleChange}
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

export default Applyleave;
