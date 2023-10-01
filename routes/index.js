const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth.route');
const productRoutes = require('./product/product.route');

router.use('/', authRoutes);
router.use('/product', productRoutes);

module.exports = router;