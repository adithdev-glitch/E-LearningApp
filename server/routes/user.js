import express from "express";
import { forgotPassword, getUserRegistrationStats, loginUser, myProfile, register, resetPassword, verifyUser } from "../controllers/user.js";
import { generateCertificate } from "../middleware/sendMail.js";
import { isAuth } from "../middleware/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";
import { submitFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.post('/user/register', register);
router.post('/user/verify', verifyUser);
router.post('/user/login', loginUser);
router.get('/user/me', isAuth, myProfile);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/reset-password', resetPassword);
router.post('/user/progress', isAuth, addProgress);
router.get('/user/progress', isAuth, getYourProgress);
router.post("/certificate", isAuth, generateCertificate);
router.post('/feedback', submitFeedback);
router.get("/user-registration-stats", getUserRegistrationStats);


export default router