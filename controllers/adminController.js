const pool = require("../db");

exports.getAdminHome = async (req, res) => {
  try {
    const [ofertas] = await pool.query("SELECT * FROM ofertas");
    res.render("adminHome", { ofertas }); // Renderiza con EJS
  } catch (err) {
    console.error("❌ Error al cargar adminHome:", err);
    res.status(500).send("Error en el servidor");
  }
};

exports.borrarOferta = async (req, res) => {
  const { id } = req.params; // id llega desde la URL, ej: /admin/oferta/5/delete

  try {
    const [result] = await pool.query("DELETE FROM ofertas WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      console.log(`🗑️ Oferta con ID ${id} eliminada`);
      res.redirect("/admin"); // vuelve al panel
    } else {
      res.status(404).send("Oferta no encontrada");
    }
  } catch (err) {
    console.error("❌ Error al borrar oferta:", err);
    res.status(500).send("Error en el servidor");
  }
};

exports.postOferta = async (req, res) => {
const { titulo, descripcion, precio_final, precio_descuento, cuotas, img, tarjeta } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO ofertas (titulo, descripcion, precio_final, precio_descuento, cuotas, img, tarjeta) VALUES (?, ?, ?, ?, ?, ?,?)",
      [titulo, descripcion, precio_final, precio_descuento, cuotas, img, tarjeta]
    );
    console.log("✅ Oferta insertada con ID:", result.insertId);
    res.redirect("/admin");
  } catch (err) {
    console.error("❌ Error al insertar oferta:", err);
    res.status(500).send("Error en el servidor");
  }
};
