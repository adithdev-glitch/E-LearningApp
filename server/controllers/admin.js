import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import Feedback from '../models/Feedback.js';
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import {User} from '../models/user.js';
import { Payment } from "../models/payment.js";

export const createCourse = TryCatch(async(req, res) =>{
    const {title, description, category, createdBy, duration, price} = req.body

    const image = req.file;
    const ownerId = req.user?._id;

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price,
        owner: ownerId,
    });

    res.status(201).json({
        message: "Course created successfully"
    });
});

export const addLectures = TryCatch(async(req, res) => {
    const course = await Courses.findById(req.params.id);

    if(!course)
        return res.status(404).json({
            message: "No Course with this id",
        });

    const { title, description } = req.body;

    const file = req.file;

    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id,
    });

    res.status(201).json({
        message: "Lecture Added",
        lecture,
    });
});

export const deleteLecture = TryCatch(async(req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    rm(lecture.video, ()=> {
        console.log("Video Deleted");
    });

    await lecture.deleteOne();
    res.json({ message: "Lecture Deleted"});
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
  
    const lectures = await Lecture.find({ course: course._id });
  
    await Promise.all(
      lectures.map(async (lecture) => {
        await unlinkAsync(lecture.video);
        console.log("video deleted");
      })
    );
    rm(course.image, () => {
        console.log("image deleted");
    });
    await Lecture.find({ course: req.params.id }).deleteMany();

    await course.deleteOne();

    await User.updateMany({}, { $pull: { subscription: req.params.id } });

    res.json({
      message: "Course Deleted",
    });
});

export const getAllStats = TryCatch(async (req, res) => {
    const totalCoures = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;
  
    const stats = {
      totalCoures,
      totalLectures,
      totalUsers,
    };
  
    res.json({
      stats,
    });
  });

  export const getAllUser = TryCatch(async(req,res)=>{
    const users = await User.find({_id:{$ne: req.user._id}}).select(
        "-password"
    );
    res.json({users});
  });

  export const updateRole = TryCatch(async(req,res)=>{
    if(req.user.mainrole !== "superadmin")
        return res.status(403).json({
            message: "This point is assign to super admin"
        });
    const user = await User.findById(req.params.id)

    if(user.role === "user"){
        user.role = "admin";
        await user.save()

        return res.status(200).json({
            message: "Role updated to admin",
        });
    }
    if(user.role === "admin"){
        user.role = "user";
        await user.save()

        return res.status(200).json({
            message: "Role updated to user",
        });
    }
  });

  export const deleteUser = TryCatch(async (req, res) => {
    if (req.user.mainrole !== "superadmin")
      return res.status(403).json({
        message: "This point is assign to super admin",
      });
  
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  
    await user.deleteOne();
  
    return res.status(200).json({
      message: "User deleted successfully",
    });
  });
  
  export const getAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().populate("user", "name email"); 
      res.status(200).json({ feedbacks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error while fetching feedbacks." });
    }
  };



export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 }); // Fetch all payments sorted by creation date
    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error while fetching payments:", error);
    res.status(500).json({ message: "Error while fetching payments." });
  }
};
