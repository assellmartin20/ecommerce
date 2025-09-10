const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.getAdminHome);     // ✅
router.post('/admin/oferta', adminController.postOferta); // ✅
router.post('/admin/oferta/:id/delete', adminController.borrarOferta);

module.exports = router;