import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    EmpName: "",
    designation: "",
    empId: "",
    img_url: "",
  });

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/get/${id}`);
          setInputs(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchEmployee();
    }
  }, [id]);


  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };


  const saveData = async () => {
    try {
      if (id) {
        await axios.put(`http://localhost:3001/update/${id}`, inputs);
      } else {
        await axios.post("http://localhost:3001/add", inputs);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Employee Name"
            onChange={inputHandler}
            name="EmpName"
            value={inputs.EmpName}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Designation"
            onChange={inputHandler}
            name="designation"
            value={inputs.designation}
            multiline
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Employee Id"
            onChange={inputHandler}
            name="empId"
            value={inputs.empId}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Photo (paste any link from the browser)"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={saveData}>
            {id ? "Update Employee" : "Add Employee"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
