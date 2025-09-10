// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// --- Rutas de registro ---
router.get('/register', authController.getRegister); // mostrar formulario
router.post('/register', authController.postRegister); // procesar registro

// --- Rutas de login ---
router.get('/login', authController.getLogin); // mostrar formulario login
router.post('/login', authController.postLogin); // procesar login

module.exports = router;
