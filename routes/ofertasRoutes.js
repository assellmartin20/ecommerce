const express = require("express");
const router = express.Router();
const { getOfertas, createOferta } = require("../controllers/ofertasController");

// Ruta GET -> listar todas las ofertas
router.get("/", getOfertas);

// Ruta POST -> crear una nueva oferta
router.post("/", createOferta);

module.exports = router;
