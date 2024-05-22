import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movies from './routes/movies.js';
import users from './routes/users.js';
import reviews from './routes/reviews.js';

dotenv.config();

const app = express()

//use CORS
app.use(cors());
// parse Json data
app.use(express.json())
//logged out error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
})

//Attach Routes to the app
app.use("/api/movies", movies)
app.use("/api/users", users)
app.use("/api/reviews", reviews)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
