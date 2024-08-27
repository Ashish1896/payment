const express = require('express');
const paymentRoute = express();

const bodyParser = require('body-parser');
paymentRoute.use(bodyParser.json());
paymentRoute.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');

paymentRoute.set('view engine', 'ejs');
paymentRoute.set('views', path.join(__dirname, '../views'));

const paymentController = require('../controllers/paymentController');

paymentRoute.get('/', paymentController.renderProductPage);
paymentRoute.post('/createOrder', paymentController.createOrder);

module.exports = paymentRoute;