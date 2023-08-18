const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//PostgreSQL connection

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fields_db",
  password: "elie3618",
  port: 5432,
});

app.post("/saveField", async (req, res) => {
  const { fieldName, fieldType, offsetFrom, offsetTo, description, arraySize } =
    req.body;

  try {
    const query =
      "INSERT INTO fields (fieldName, fieldType, offsetFrom, offsetTo, description, arraySize) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    await pool.query(query, [
      fieldName,
      fieldType,
      offsetFrom,
      offsetTo,
      description,
      arraySize,
    ]);

    res.status(200).json({ message: "Field added successfully" });
  } catch (error) {
    console.error(error.message);
  }
});

const Port = 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
