import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const UpdateCourse = () => {
  return (
    <div className="md:p-10 p-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add Detailed Information Regarding Course
        </h1>
        <Link to={"lecture"}>
          <Button variant="outline" className={"cursor-pointer"}>
            Go to lectures page
          </Button>
        </Link>
      </div>

      <CourseTab />
    </div>
  );
};

export default UpdateCourse;
