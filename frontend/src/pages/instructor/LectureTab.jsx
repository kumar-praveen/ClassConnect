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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { setLecture } from "@/redux/lectureSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const LectureTab = () => {
  const params = useParams();
  const { courseId, lectureId } = params;
  const { lecture } = useSelector((store) => store.lecture);
  const selectedLecture = lecture.find((lecture) => lecture._id === lectureId);
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle
  );
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(selectedLecture.isPreviewFree);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading2, setLoading2] = useState(false);
  const [fileChangeLoader, setFileChangeLoader] = useState(false);

  const fileChangeHandler = async (e) => {
    setFileChangeLoader(true);
    e.preventDefault();
    const file = e.target.files[0];
    console.log("File at filechanger", file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(
          `http://localhost:4545/api/media/upload-video`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );

        if (res.data.success) {
          console.log("Res.data at fileChange", res.data);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          toast.success(res.data.messge);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload Failed");
      } finally {
        setMediaProgress(false);
        setFileChangeLoader(false);
      }
    }
  };

  const editLectureHandler = async (e) => {
    e.preventDefault();
    const data = {
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
    };
    console.log("Data at edit lecture", data);
    console.log("videoInfo", uploadVideoInfo);
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:4545/api/course/${courseId}/lecture/${lectureId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(
          setLecture(
            lecture.map((lec) =>
              lec._id === res.data.lecture._id ? res.data.lecture : lec
            )
          )
        );
        toast.success(res.data.message);
        navigate(`/instructor/course/${courseId}/lecture`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit lecture");
    } finally {
      setLoading(false);
    }
  };

  const removeLectureHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading2(true);
      const res = await axios.delete(
        `http://localhost:4545/api/course/lecture/${lectureId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate(`/instructor/course/${courseId}/lecture`);
        toast.success(res.data.success);
      } else {
        toast.error(res.data.messge);
      }
    } catch (error) {
      console.log(error);
      toast.success("Failed to delete lecture");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <Card className="">
      <CardHeader className={"flex justify-between"}>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Sure To Click On Update Lecture, When You're Done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            disabled={loading2}
            onClick={removeLectureHandler}
          >
            {loading2 ? (
              <span className="flex items-center gap-2">
                Please Wait...
                <Loader2 className="animate-spin" />{" "}
              </span>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label className={"mb-2"}>Title</Label>
          <Input
            type={"text"}
            placeholder="eg. Introduction to DMBS"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div>
          <Label className={"mb-2"}>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type={"file"}
            name="file"
            accept="video/*"
            className={"w-fit"}
            onChange={fileChangeHandler}
          />
        </div>

        <div className="flex items-center gap-2">
          <Label>Is this video FREE</Label>
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            className={"bg-gray-800"}
          />
        </div>

        {mediaProgress && (
          <div>
            <Progress value={uploadProgress} />
            <span>{uploadProgress}% uploaded</span>
          </div>
        )}

        <Button disabled={fileChangeLoader} onClick={editLectureHandler}>
          {fileChangeLoader ? (
            <span className="flex items-center gap-2">
              Please Wait...
              <Loader2 className="animate-spin" />{" "}
            </span>
          ) : (
            "Update Lecture"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
