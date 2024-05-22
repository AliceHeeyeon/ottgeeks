import express from 'express';
const router = express.Router();

import {
    getReviews,
    getReview,
    createReview
} from "../controllers/reviewsController.js";

//GET all posts
router.get("/", getReviews)
//GET a single post
router.get("/:id", getReview)
//CREAT a post
router.post("/", createReview)

export default router;