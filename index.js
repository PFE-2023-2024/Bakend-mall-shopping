const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require("path");
const fs = require("fs");
const createTable = require('./BD_Table');
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  res.status(200).json({ message: "Welcome To Server mall-shopping" });
});

createTable();

app.listen(4000, () => console.log("Server on localhost:4000"));
