import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

export async function getMovies(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM Movies");
        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getMovie(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Movies WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createMovie(req, res) {
    const { title, director, release_date, image_url, description } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO Movies (title, director, release_date, image_url, description) VALUES (?, ?, ?, ?, ?)", [title, director, release_date, image_url, description]);
        console.log("Insert successful. Inserting movie with id:", result.insertId);
        const [newMovie] = await pool.query("SELECT * FROM Movies WHERE id = ?", [result.insertId]);
        res.status(201).json(newMovie[0]);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
