const express = require("express");
const route = express();

route.use("/sms", require("../controllers/sms_controller"));

module.exports = route;
