import { pool } from "../config/database.js";

const getAllExteriors = async (req, res) => {
  try {
    const query = `SELECT * FROM exteriors`;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExteriorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM exteriors where id=$1;`;

    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRoofs = async (req, res) => {
  try {
    const query = `SELECT * FROM roofs;`;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRoofById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM roofs wher id=$1;`;

    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllWheels = async (req, res) => {
  try {
    const query = `SELECT * FROM wheels;`;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWheelById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM wheels where id=$1;`;

    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllInteriors = async (req, res) => {
  try {
    const query = `SELECT * FROM interiors;`;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInteriorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM interiors where id=$1;`;

    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllExteriors,
  getExteriorById,
  getAllRoofs,
  getRoofById,
  getAllWheels,
  getWheelById,
  getAllInteriors,
  getInteriorById,
};