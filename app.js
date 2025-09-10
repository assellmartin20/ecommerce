const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const adminRoutes = require('./routes/adminRoutes');
const ofertasRoutes = require('./routes/ofertasRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Session
app.use(session({
  secret: "mi_secreto",
  resave: false,
  saveUninitialized: true
}));

// Multer (para subir archivos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Rutas
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);         // login/registro
app.use('/carrito', carritoRoutes);
app.use("/api/ofertas", ofertasRoutes);

// Rutas principales
app.get('/', (req, res) => res.render('index'));

// Si querés servir login/registro en HTML puro, podés usar:
// app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
// app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
