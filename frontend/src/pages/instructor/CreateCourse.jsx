import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4545/api/course/",
        { courseTitle, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Course Created Successfully");
        navigate("/instructor/course");
      }
    } catch (error) {
      console.log("Error at createCourseHandler", error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold">
        Lets Add <span className="text-blue-500">Courses</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
        doloremque tempora quaerat sapiente voluptatibus quod odit rem natus,
        dicta nam reiciendis. Assumenda explicabo dolorum veniam?
      </p>

      <div className="mt-10">
        <div>
          <Label className={"mb-2"}>Course Title</Label>
          <Input
            type={"text"}
            placeholder="Course Name"
            className={"bg-white"}
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>

        <div className="mt-4 mb-5">
          <Label className="mb-2">Course Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-45 bg-white">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Course Categories</SelectLabel>
                <SelectItem value="Artificial Intelligence">
                  Artificial Intelligence
                </SelectItem>
                <SelectItem value="Machine Learning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="App Development">App Development</SelectItem>
                <SelectItem value="Game Development">
                  Game Development
                </SelectItem>
                <SelectItem value="Programming">
                  Programming
                </SelectItem>
                <SelectItem value="Arithmetic">Arithmetic</SelectItem>
                <SelectItem value="Logical Reasoning">
                  Logical Reasoning
                </SelectItem>
                <SelectItem value="Verbal Ability">Verbal Ability</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/instructor/course")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={loading} onClick={createCourseHandler}>
            {loading ? (
              <span className="flex items-center gap-2">
                Creating Course... <Loader2 className="animate-spin mt-1" />
              </span>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
