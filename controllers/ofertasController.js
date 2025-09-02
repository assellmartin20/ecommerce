const pool = require("../db");

const getOfertas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ofertas");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las ofertas" });
  }
};

const createOferta = async (req, res) => {
  try {
    const { titulo, descripcion, precio_final, precio_descuento, cuotas } = req.body;
    const img = req.body.img || "/uploads/default.png";

    const [result] = await pool.query(
      "INSERT INTO ofertas (titulo, descripcion, precio_final, precio_descuento, cuotas, img) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, descripcion, precio_final, precio_descuento, cuotas, img]
    );

    res.json({ id: result.insertId, mensaje: "Oferta creada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear oferta" });
  }
};

module.exports = { getOfertas, createOferta };
