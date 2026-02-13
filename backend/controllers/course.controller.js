import { Course } from "../models/course.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle)
      return res
        .status(400)
        .json({ success: false, message: "Course Title is required" });

    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Course Category is required" });

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getCreatedCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });

    if (!courses)
      return res.status(404).json({
        success: false,
        message: "You haven't created any course yet.",
        courses: [],
      });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log("Error at getCreatedCourses", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPublishedCourses = async (__, res) => {
  try {
    const courses = await Course.find({ isPublished: true });

    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "No Any Course Found",
        courses: [],
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log("Error at getPublishedCourses", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const file = req.file;

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Please Select Course Category" });
    }

    if (!courseLevel) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please Select Course Difficulty Level",
        });
    }

    if (!coursePrice) {
      return res
        .status(400)
        .json({ success: false, message: "Please Set Course Price" });
    }

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Invalid Course Updation",
      });
    }

    let courseThumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      courseThumbnail = await cloudinary.uploader.upload(fileUri);
    }
    const updatedCourseData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updatedCourseData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      course,
      message: "Course Updated Successfully",
    });
  } catch (error) {
    console.log("Error at editCourse handler", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log("Error at getCourseById handler", error);
    return res.status(500).json({
      success: false,
      message: "Internal Sever Error",
    });
  }
};

export const togglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.isPublished = !course.isPublished;
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Course ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};
