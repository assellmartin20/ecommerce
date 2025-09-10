// db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce"
});

// probamos la conexión una sola vez
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado a MySQL");
    connection.release();
  } catch (err) {
    console.error("❌ Error conectando a la DB:", err);
  }
})();

module.exports = pool;
