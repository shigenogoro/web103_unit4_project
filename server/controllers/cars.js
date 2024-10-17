import { pool } from "../config/database.js";

const getCars = async (req, res) => {
  try {
    const query = `
        SELECT * FROM cars ORDER BY id DESC
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `
          SELECT * FROM cars where id = $1
      `;
    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const createCar = async (req, res) => {
  const { isConvertible ,exterior, roof, wheel, interior, price, name } = req.body;
  try {
    const query = `
        INSERT INTO cars (is_convertible, exterior, roof, wheel, interior, price, name)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;
    const result = await pool.query(query, [
      isConvertible,
      exterior,
      roof,
      wheel,
      interior,
      price,
      name,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const updateCar = async (req, res) => {
  const id  = parseInt(req.params.id);
  const { exterior, roof, wheel, interior, price } = req.body;
  try {
    const query = `
            UPDATE cars
            SET exterior = $1, roof = $2, wheel = $3, interior = $4, price = $5
            WHERE id = $6
            RETURNING *
        `;
    const result = await pool.query(query, [
      exterior,
      roof,
      wheel,
      interior,
      price,
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const deleteCar = async (req, res) => {
  const id  = parseInt(req.params.id);
  try {
    const query = `
                DELETE FROM cars
                WHERE id = $1
            `;
    await pool.query(query, [id]);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export default {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
