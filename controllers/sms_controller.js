const express = require("express");
const router = express.Router();

const accountSid = "AC398322c423ce0706f74e7db1ae4fb730";
const authToken = "7ccdcefe0ab757f0a21103ece51bfa54";
const client = require("twilio")(accountSid, authToken);

router.get("/", async (req, res) => {
  try {
    res.json({ success: true, message: "Hello from sms" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { from, to, body } = req.body;

  if (!from || !to || !body)
    return res.status(404).json({ success: false, message: "Required inputs" });

  try {
    await client.messages.create({
      body,
      from,
      to,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully sent",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
