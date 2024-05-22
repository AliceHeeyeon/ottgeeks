import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

export async function getUsers(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM Users");
        res.json(rows);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getUser(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO Users (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
        console.log("Insert successful. Inserting user with id:", result.insertId);
        const [newUser] = await pool.query("SELECT * FROM Users WHERE id = ?", [result.insertId]);
        res.status(201).json(newUser[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// export async function createUser(username, email, password) {
//     try {
//         const [result] = await pool.query(
//             "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
//             [username, email, password]
//         );
//         return result;
//     } catch (error) {
//         console.error('Error querying the database:', error);
//         throw error;
//     }
// }

