// routes/adminRouter.js
import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
import { isNotDemo } from "../middleware/isNotDemo.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

// Read-only routes (no isNotDemo needed)
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboard);

// Write routes protected by isNotDemo
adminRouter.post("/delete-comment", auth, isNotDemo, deleteCommentById);
adminRouter.post("/approve-comment", auth, isNotDemo, approveCommentById);

export default adminRouter;
