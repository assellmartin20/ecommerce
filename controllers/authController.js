// controllers/authController.js
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- Registro ---
exports.getRegister = (req, res) => {
    res.render('register'); // register.ejs
};

exports.postRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) return res.status(400).send('El correo ya está registrado');

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

// --- Login ---
exports.getLogin = (req, res) => {
    res.render('login'); // login.ejs
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(400).send('Usuario no encontrado');

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('Contraseña incorrecta');

        const token = jwt.sign({ id: user.id, email: user.email }, "secreto123", { expiresIn: '2h' });
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/carrito');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
};
