import CourseCard from "@/components/CourseCard";
import { setCourse } from "@/redux/courseSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const dispatch = useDispatch();
  const {course} = useSelector((store) => store.course);

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4545/api/course/published-courses`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublishedCourse();
    console.log("Published Courses Fetched")
  }, []);

  console.log(course)

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen max-w-7xl mx-auto py-10">
        <div className="px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our Courses
          </h1>
          <p className="text-center text-gray-800 mb-4">
            Explore our curated courses to boost your skills and career. Whether
            you're a beginner or an expert, we have something for everyone
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course?.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
