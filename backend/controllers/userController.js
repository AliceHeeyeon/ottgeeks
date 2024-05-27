import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

function generateToken(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
}

//Signup function
export async function signup(req, res) {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query("INSERT INTO Users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        const [newUser] = await pool.query("SELECT * FROM Users WHERE id = ?", [result.insertId]);
        const token = generateToken(newUser[0]);
        res.status(201).json({ user: newUser[0], token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Login function
export async function login(req, res) {
    const { email, password } = req.body;
    try {
        console.log(`Login attempt for email: ${email}`); // Log the email trying to login
        const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (rows.length === 0) {
            console.log('No user found with this email'); // Log if no user is found
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const user = rows[0];
        console.log('User found:', user); // Log the found user
        console.log('Stored hashed password:', user.password); // Log the hashed password from DB

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log password match result
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

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


