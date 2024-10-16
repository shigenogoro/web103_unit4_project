import { pool } from "../config/database";

const getAllExteriors = async (req, res) => {
    try {
        const query = `SELECT * from exteriors`;

        const results = await pool.query(query);
        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getExteriorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const query = `SELECT * from exteriors WHERE id = $1`

        const results = pool.query(query, [id]);
        res.stauts(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getAllRoofs = async (req, res) => {
    try {
        const query = `SELECT * FROM roofs`;

        const results = pool.query(query);
        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getRoofById = async (req, res) => {
    const id = parseInt(req,params.id);
    
    try {
        const query = `SELECT * FROM roofs WHERE id = $1`;

        const results = pool.query(query, [id]);
        res.stauts(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getAllWheels = async (req, res) => {
    try {
        const query = `SELECT * FROM wheels`;

        const results = pool.query(query);
        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getWheelById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const query = `SELECT * FROM wheels WHERE id = $1`;

        const results = pool.query(query, [id]);
        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getAllInteriors = async (req, res) => {
    try {
        const query = `SELECT * FROM interiors`;

        const results = pool.query(query);
        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

const getInteriorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const query = `SELECT * FROM interiors WHERE id = $1`;

        const results = pool.query(query, [id]);
        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export default {
    getAllExteriors,
    getExteriorById,
    getAllRoofs,
    getRoofById,
    getAllWheels,
    getWheelById,
    getAllInteriors,
    getInteriorById
}