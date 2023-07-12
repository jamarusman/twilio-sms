const express = require("express");
const router = express.Router();

const accountSid = "AC398322c423ce0706f74e7db1ae4fb730";
const authToken = "070e42ec4e7a56b163728b0e9e214888";
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
    client.messages
      .create({
        body,
        from,
        to,
      })
      .then((message) => console.log(message.sid))
      .done();
    return res
      .status(201) // response 201 means Created
      .json({
        success: true,
        message: "successfully send",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
