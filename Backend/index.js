const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());
require("./connection");

const EmployeeModel = require("./model");

app.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const result = await EmployeeModel(req.body).save();
    res.send({ message: "Employee added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding employee" });
  }
});

app.delete("/get/:id", async (req, res) => {
  try {
    await EmployeeModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Employee deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting employee" });
  }
});

app.get("/get", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    res.send(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching employees" });
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    if (employee) {
      res.send(employee);
    } else {
      res.status(404).send({ message: "Employee not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching employee" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployee) {
      res.send({ message: "Employee updated", data: updatedEmployee });
    } else {
      res.status(404).send({ message: "Employee not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating employee" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
