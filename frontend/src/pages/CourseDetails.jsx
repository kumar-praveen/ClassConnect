import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import store from "@/redux/store";
import axios from "axios";
import { ArrowLeft, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const { course } = useSelector((store) => store.course);
  const selectedCourse = course.find((course) => course._id === courseId);
  const [courseLectures, setCourseLectures] = useState(null);

  useEffect(() => {
    const getCourseLectures = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4545/api/course/${courseId}/lecture`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setCourseLectures(res.data.lectures);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCourseLectures();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-10">
      <Card className="max-w-6xl mx-auto bg-white shadow-sm border border-slate-200 rounded-xl p-4 md:p-6 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-slate-300 text-slate-600 hover:bg-slate-100"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                {selectedCourse?.courseTitle}
              </h1>
              {selectedCourse?.subTitle && (
                <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                  {selectedCourse.subTitle}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Thumbnail */}
          <div className="w-full lg:w-1/3">
            <div className="overflow-hidden rounded-lg shadow-sm bg-slate-100">
              <img
                src={
                  selectedCourse?.courseThumbnail || "/assets/course_img.webp"
                }
                alt={selectedCourse?.courseTitle || "Course thumbnail"}
                className="w-full h-full object-cover aspect-video transition-transform duration-200 hover:scale-105"
              />
            </div>
          </div>

          {/* Info + Pricing */}
          <div className="flex-1 space-y-5">
            {/* Description */}
            <div className="space-y-2">
              {selectedCourse?.subTitle && (
                <p className="text-lg font-medium text-slate-800 capitalize">
                  {selectedCourse.subTitle}
                </p>
              )}
              {selectedCourse?.description && (
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {selectedCourse.description}
                </p>
              )}
            </div>

            {/* Pricing + CTA */}
            {typeof selectedCourse?.coursePrice === "number" && (
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl md:text-3xl font-semibold text-slate-900">
                      ₹{selectedCourse.coursePrice.toFixed(2)}
                    </p>
                    <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      50% OFF
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="text-slate-400 line-through">
                      ₹
                      {(
                        selectedCourse.coursePrice +
                        (selectedCourse.coursePrice * 50) / 100
                      ).toFixed(2)}
                    </span>
                    <span className="text-slate-500">Limited-time offer</span>
                  </div>
                </div>

                <Button className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium">
                  Enroll Now
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Details Sections */}
        <section className="grid gap-8 md:grid-cols-3 border-t border-slate-100 pt-6">
          <div className="md:col-span-2 space-y-6">
            {/* What Will You Learn */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                What You Will Learn
              </h2>
              <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li>Build dynamic web applications with React and Node.js</li>
                <li>
                  Deploy websites with modern tools like Vercel and Netlify
                </li>
                <li>Understand REST APIs and database integration</li>
              </ul>
            </div>

            {/* Pre-Requisite */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Prerequisites
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                A lot of eagerness to learn.
              </p>
            </div>

            {/* Who This Course Is For */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Who This Course Is For
              </h2>
              <p className="mt-2 text-sm text-slate-600">Beginners</p>
            </div>
          </div>

          {/* (Optional) Side panel placeholder for future meta info */}
          <div className="hidden md:block border border-dashed border-slate-200 rounded-lg p-4 text-xs text-slate-400">
            {/* Add course duration, level, language, rating, etc. here if available */}
            Course details (duration, level, language, etc.) can go here.
          </div>
        </section>

        {/* Curriculum */}
        <section className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Course Curriculum
            </h2>
            <span className="text-sm font-medium text-slate-500 italic">
              {courseLectures?.length || 0} Lectures
            </span>
          </div>

          {courseLectures?.length ? (
            <Accordion
              type="single"
              collapsible
              className="mt-2 border border-slate-200 rounded-lg divide-y divide-slate-100"
            >
              {courseLectures.map((lec, idx) => (
                <AccordionItem key={idx} value={`lecture-${idx}`}>
                  <AccordionTrigger className="px-3 py-2 text-sm font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center gap-2">
                    <span className="text-slate-500">
                      {lec.isPreviewFree ? (
                        <PlayCircle className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </span>
                    <span className="text-left">
                      {lec.lectureTitle?.toUpperCase()}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="p-3 bg-white">
                    <div className="w-160 h-90 max-w-full mx-auto">
                      <ReactPlayer
                        src={lec.videoUrl}
                        width="100%"
                        height="100%"
                        controls
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Curriculum will be available soon.
            </p>
          )}
        </section>
      </Card>
    </div>
  );
};

export default CourseDetails;
