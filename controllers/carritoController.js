const pool = require('../db');

const getCarrito = async (req, res) => {
  try {
    const [carrito] = await pool.query('SELECT * FROM carrito WHERE user_id = ?', [req.user.id]);
    res.render('carrito', { carrito });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando el carrito");
  }
};

const addToCarrito = async (req, res) => {
  const { id, titulo, precio, img } = req.body;
  try {
    await pool.query(
      'INSERT INTO carrito (user_id, producto_id, titulo, precio, img) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, id, titulo, precio, img]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al agregar al carrito");
  }
};

const clearCarrito = async (req, res) => {
  try {
    await pool.query('DELETE FROM carrito WHERE user_id = ?', [req.user.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al vaciar el carrito");
  }
};

module.exports = {
  getCarrito,
  addToCarrito,
  clearCarrito
};
