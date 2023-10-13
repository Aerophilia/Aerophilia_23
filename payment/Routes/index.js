var express = require("express");
var router = express.Router();
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_rDYHFpRg2CClM4",
  key_secret: "VUPBu5GOoRho9SWSeHqf3o2N",
});

/* GET home page. */
router.post("/create/orderid", async (req, res) => {
  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  res.status(200).json(order);
});
router.post("/payment/verify", (req, res) => {
  try {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto
      .createHmac("sha256", "VUPBu5GOoRho9SWSeHqf3o2N")
      .update(body.toString())
      .digest("hex");
    var response = { signatureIsValid: "false" };
    if (expectedSignature === req.body.razorpay_signature)
      response = { signatureIsValid: "true" };
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
