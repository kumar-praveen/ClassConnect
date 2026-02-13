import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCreatedCourses,
  getPublishedCourses,
  togglePublishedCourse,
} from "../controllers/course.controller.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createLecture,
  editLecture,
  getCourseLecture,
  removeLecture,
} from "../controllers/lecture.controller.js";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createCourse)
  .get(isAuthenticated, getCreatedCourses);

router.route("/published-courses").get(getPublishedCourses);
router.route("/:courseId").put(isAuthenticated, singleUpload, editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/:courseId").patch(togglePublishedCourse)

export default router;
