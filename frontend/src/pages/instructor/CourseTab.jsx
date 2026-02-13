import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "@/redux/courseSlice";
import { Loader2 } from "lucide-react";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.courseId;
  const { course } = useSelector((store) => store.course);
  const selectCourse = course.find((course) => course._id === id);
  const [selectedCourse, setSelectedCourse] = useState(selectCourse);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const getCourseById = async () => {
    try {
      const res = await axios.get(`http://localhost:4545/api/course/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setSelectedCourse(res.data.course);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCourseById();
  });

  const [inputData, setInputData] = useState({
    courseTitle: selectedCourse?.courseTitle,
    subTitle: selectedCourse?.subTitle,
    description: selectedCourse?.descripton,
    category: selectedCourse?.category,
    courseLevel: selectedCourse?.courseLevel,
    coursePrice: selectedCourse?.coursePrice,
    file: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    selectedCourse?.courseThumbnail,
  );

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setInputData({ ...inputData, category: value });
  };

  const selectCourseLevel = (value) => {
    setInputData({ ...inputData, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputData({ ...inputData, file: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setThumbnailPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("courseTitle", inputData.courseTitle);
    formData.append("subTitle", inputData.subTitle);
    formData.append("description", inputData.description);
    formData.append("category", inputData.category);
    formData.append("courseLevel", inputData.courseLevel);
    formData.append("coursePrice", inputData.coursePrice);
    formData.append("file", inputData.file);

    console.log(inputData);

    try {
      const res = await axios.put(
        `http://localhost:4545/api/course/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Course Updated Successfully");
        navigate("lecture");
        dispatch([...course, setCourse(res.data.course)]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    setLoading2(true);
    try {
      const res = await axios.patch(
        `http://localhost:4545/api/course/${id}`,
        {
          params: {
            action,
          },
        },
        { withCredentials: true },
      );

      if (res.data.success) {
        setPublish((prev) => !prev);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <Card>
      <CardHeader className={"flex md:flex-row justify-between"}>
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() =>
              togglePublishUnpublish(
                selectedCourse.isPublished ? "false" : "true",
              )
            }
            className={"bg-black text-white"}
          >
            {selectedCourse.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label className={"mb-2"}>Title</Label>
            <Input
              type={"text"}
              name="courseTitle"
              placeholder={"eg: Fullstack Developer"}
              value={inputData.courseTitle}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className={"mb-2"}>Sub Title</Label>
            <Input
              type={"text"}
              name="subTitle"
              placeholder={
                "eg: Become a Fullstack Developer in just few months"
              }
              value={inputData.subTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className={"mb-2"}>Description</Label>
            <Textarea
              placeholder="Give a brief description about course"
              name="description"
              value={inputData.descripton}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex md:flex flex-wrap gap-1 items-center md:gap-5">
            <div>
              <Label className={"mb-2"}>Category</Label>
              <Select
                defaultValue={inputData.category}
                onValueChange={selectCategory}
              >
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
                    <SelectItem value="Web Development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="App Development">
                      App Development
                    </SelectItem>
                    <SelectItem value="Game Development">
                      Game Development
                    </SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Arithmetic">Arithmetic</SelectItem>
                    <SelectItem value="Logical Reasoning">
                      Logical Reasoning
                    </SelectItem>
                    <SelectItem value="Verbal Ability">
                      Verbal Ability
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className={"mb-2"}>Course Level</Label>
              <Select
                defaultValue={inputData.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-45 bg-white">
                  <SelectValue placeholder="Select Course Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Difficulty</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={"mb-2"}>Price in (INR)</Label>
              <Input
                type={"number"}
                name="coursePrice"
                placeholder="199"
                className={"w-fit"}
                value={inputData.coursePrice}
                onChange={changeEventHandler}
                required
              />
            </div>
          </div>
          <div>
            <Label className={"mb-2"}>Course Thumbnail</Label>
            <Input
              type={"file"}
              id="file"
              accept="image/"
              className={"w-fit"}
              onChange={selectThumbnail}
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="course-thumbnail"
                className="w-64 h-32 my-2"
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/instructor/course")}
            >
              Cancel
            </Button>
            <Button
              onClick={updateCourseHandler}
              disabled={loading}
              className={"cursor-pointer"}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Saving... <Loader2 className="animate-spin mt-1" />
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
