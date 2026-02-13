import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, FileEditIcon, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "@/redux/courseSlice";
import { Badge } from "@/components/ui/badge";

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);

  useEffect(() => {
    const fetchCreatedCourse = async () => {
      try {
        const res = await axios.get("http://localhost:4545/api/course/", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log("Error at course fetching", error);
        toast.error(error.response.data.message);
      }
    };

    fetchCreatedCourse();
    console.log(course);
  }, []);
  return (
    <div className="md:p-10 p-4 w-full h-screen">
      <Button onClick={() => navigate("/instructor/course/create")}>
        Create New Course <Plus />
      </Button>
      <Table className={"mt-10"}>
        <TableCaption>A list of your all recent courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Course</TableHead>
            <TableHead className={"text-center"}>Price</TableHead>
            <TableHead className={"text-center"}>Status</TableHead>
            <TableHead className={"text-center"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course?.map((course) => (
            <TableRow key={course._id} className={"border-b border-gray-400"}>
              <TableCell className="md:w-75 flex items-center gap-2">
                <img
                  src={course?.courseThumbnail || "/assets/course_img.webp"}
                  alt="Thumbnail"
                  className="w-20 h-10 rounded-sm"
                />
                <span className="font-semibold">{course.courseTitle}</span>
              </TableCell>
              <TableCell className={"text-center"}>
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell className={"text-center"}>
                <Badge
                  className={
                    course?.isPublished ? "bg-green-400" : "bg-orange-400"
                  }
                >
                  {course?.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className={"text-center"}>
                <Button
                  onClick={() => navigate(`/instructor/course/${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Course;
