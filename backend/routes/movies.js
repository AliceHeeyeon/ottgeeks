import express from 'express';
const router = express.Router();

import {
    getMovies,
    getMovie,
    createMovie
} from "../controllers/movieController.js";

//GET all posts
router.get("/", getMovies)
//GET a single post
router.get("/:id", getMovie)
//CREAT a post
router.post("/", createMovie)

export default router;