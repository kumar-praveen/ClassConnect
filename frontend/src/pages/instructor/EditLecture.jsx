import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-4 md:p-10 h-screen">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/instructor/course/${params.courseId}/lecture`)}
            variant="outline"
            size="icon"
            className={"rounded-full"}
          >
            <ArrowLeft />{" "}
          </Button>
          <h2 className="font-bold text-xl">Update Your Lectures</h2>
        </div>
      </div>
      <LectureTab/>
    </div>
  );
};

export default EditLecture;
