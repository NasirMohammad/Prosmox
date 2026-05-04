const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  port: 5432,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASS || "apppass123",
  database: process.env.DB_NAME || "appdb",
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as db_time");
    res.send(`Frontend → Backend → PostgreSQL CONNECTED ✔ | DB Time: ${result.rows[0].db_time}`);
  } catch (err) {
    res.status(500).send("DB connection failed: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
