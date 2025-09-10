const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const { verifyUser } = require('../middleware/authMiddleware');

router.get('/', verifyUser, carritoController.getCarrito);
router.post('/add', verifyUser, carritoController.addToCarrito);
router.post('/clear', verifyUser, carritoController.clearCarrito);

module.exports = router;
