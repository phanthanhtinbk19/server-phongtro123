import express from "express";
import * as postController from "../controllers/PostController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/private", verifyToken, postController.getPrivatePosts);
router.get("/new", postController.getNewPosts);
router.get("/:id", postController.getPost);
router.post("/create-new", postController.createNewPost);
router.put("/update", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);

export default router;
