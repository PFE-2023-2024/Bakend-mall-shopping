const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());
const v1 =require('./routes/v1');
app.use(express.static('./'));
app.use('', v1);
module.exports = app;