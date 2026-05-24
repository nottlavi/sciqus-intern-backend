require("dotenv").config();

const express = require("express");
const app = express();
const pool = require("./config/db");

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("server running");
});
app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`app is running at PORT ${PORT}`);
});
