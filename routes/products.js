const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
} = require('../controllers/products');

const { authenticateUser } = require('../middleware/auth');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
