import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  return (
    <Card className="bg-white shadow-lg py-0 overflow-hidden">
      <img
        src={course.courseThumbnail || "/assets/course_img.webp"}
        alt=""
        className="w-full h-48 object-fit"
      />
      <div className="p-4 pt-0">
        <h2 className="text-xl font-semibold text-gray-800">
          {course.courseTitle}
        </h2>
        <p>{course.subTitle}</p>
        <Button
          onClick={() => navigate(user ? `/courses/${course._id}` : `/login`)}
          className={"mt-4"}
        >
          Learn More
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;
