const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY
});

const renderProductPage = async (req, res) => {
  try {
    res.render('product');
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const amount = req.body.amount * 100;
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'ashishsahoo1896@gmail.com'
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: 'Order Created',
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
          product_name: req.body.name,
          description: req.body.description,
          contact: "8249094681",
          name: "Ashish sahoo",
          email: "asishsahoo1896@gmail.com"
        });
      } else {
        console.log(err.message);
        res.status(400).send({ success: false, msg: 'Failed to create order' });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
};

module.exports = {
  renderProductPage,
  createOrder
};