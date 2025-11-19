import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { addLectures, createCourse, deleteCourse, deleteLecture, deleteUser, getAllFeedbacks, getAllPayments, getAllStats, getAllUser, updateRole } from "../controllers/admin.js";
import { uploadFiles } from "../middleware/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.delete("/course/:id", isAuth, isAdmin, uploadFiles, deleteCourse);
router.get("/stats", isAuth, isAdmin, getAllStats);
router.put("/user/:id", isAuth, updateRole);
router.delete("/user/:id", isAuth, isAdmin, deleteUser);
router.get("/users", isAuth, isAdmin, getAllUser);
router.get("/feedbacks", getAllFeedbacks);
router.get("/payments", getAllPayments);



export default router;