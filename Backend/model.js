const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  EmpName: String,
  designation: String,
  empId: String,
  img_url: String,
});

const EmployeeModel = mongoose.model("details", employeeSchema);

module.exports = EmployeeModel;
