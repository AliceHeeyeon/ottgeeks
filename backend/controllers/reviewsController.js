import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

export async function getReviews(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM Reviews");
        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getReview(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Review WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createReview(req, res) {
    const { user_id, movie_id, review, rating } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO Reviews (user_id, movie_id, review, rating) VALUES (?, ?, ?, ?)", [user_id, movie_id, review, rating]);
        console.log("Insert successful. Inserting review with id:", result.insertId);
        const [newReview] = await pool.query("SELECT * FROM Reviews WHERE id = ?", [result.insertId]);
        res.status(201).json(newReview[0]);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
