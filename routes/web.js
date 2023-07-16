const express = require("express");
const route = express();

route.get("/", async (req, res) => {
  return res.status(201).json({
    success: true,
    message: "Welcome from capston system.",
  });
});

route.use("/sms", require("../controllers/sms_controller"));

module.exports = route;
