import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUser,
    createUser
} from "../controllers/userController.js";

//GET all posts
router.get("/", getUsers)
//GET a single post
router.get("/:id", getUser)
//CREAT a post
router.post("/", createUser)

export default router;