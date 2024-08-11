const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://userone:Abc123@cluster0.7r3a9jx.mongodb.net/EmployeeApp?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
