// routes/blogRouter.js
import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { isNotDemo } from "../middleware/isNotDemo.js";

const blogRouter = express.Router();

// Protect write routes with both auth and isNotDemo
blogRouter.post("/add", upload.single("image"), auth, isNotDemo, addBlog);
blogRouter.post("/delete", auth, isNotDemo, deleteBlogById);
blogRouter.post("/toggle-publish", auth, isNotDemo, togglePublish);
blogRouter.post("/generate", auth, isNotDemo, generateContent);

// These routes are open or read-only (no isNotDemo needed)
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

export default blogRouter;
