import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { TextField, Box, Button } from "@mui/material";
import { jwtDecode } from "jwt-decode"; // Correct the import for jwt-decode
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const Addquery = () => {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const employeeId = decodedToken.id;

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendQuery = async () => {
    try {
      const url = `http://localhost:5000/hr/employee/addquery`;

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        subject: subject,
        message: message,
        employeeId: employeeId,
      };

      const response = await axios.post(url, requestBody, { headers: headers });
      console.log("Add query API response:", response);

      Swal.fire({
        icon: "success",
        title: "Query Submitted!",
        text: "Your query has been submitted successfully.",
      });

      // Optionally, reset the form after success
      setSubject("");
      setMessage("");
    } catch (error) {
      console.log(error);

      // SweetAlert on error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <>
      <PageTitle page={"Raise Your Query"} />
      <div className="container" style={{ marginTop: 20 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <TextField
            label="Subject"
            name="name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Your Message"
            name="query"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendQuery}
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Submit Query
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Addquery;
