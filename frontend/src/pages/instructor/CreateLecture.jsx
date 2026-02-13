import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLecture } from "@/redux/lectureSlice";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const { lecture } = useSelector((store) => store.lecture);
  const navigate = useNavigate();

  const createLectureHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:4545/api/course/${params.courseId}/lecture`,
        { lectureTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Lecture Created Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLectures = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4545/api/course/${params.courseId}/lecture`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setLecture(res.data.lectures));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLectures();
  }, [lecture]);

  return (
    <div className="p-4 md:p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold">
        Lets Add <span className="text-blue-500">Lectures</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi maiores
        optio possimus illum ea perferendis tempore corrupti aspernatur, sunt,
        repellat exercitationem officiis velit. Autem, ex.
      </p>

      <div className="mt-10 space-y-5">
        <div>
          <Label className={"mb-2"}>Title</Label>
          <Input
            type={"text"}
            placeholder="Lecture Name"
            className={"bg-white"}
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/instructor/course/${params.courseId}`)}
          >
            Back to Course
          </Button>
          <Button onClick={createLectureHandler} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap2">
                Creating Lecture... <Loader2 className="animate-spin mt-1" />{" "}
              </span>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        {lecture?.map((lec, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#f7f9fa] py-2 px-4 rounded-md my-2"
          >
            <h1 className="font-bold text-gray-800">
              Lecture - {idx + 1}: {lec.lectureTitle}
            </h1>
            <Button
              variant="outline"
              className={"cursor-pointer"}
              onClick={() => navigate(`${lec._id}`)}
            >
              <Edit />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateLecture;
