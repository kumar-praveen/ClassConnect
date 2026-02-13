import Hero from "@/components/Hero";
import React from "react";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { course } = useSelector((store) => store.course);
  return (
    <div>
      <Hero />
      <section id="courses" className="bg-gray-100 py-15">
        <div className="min-h-screen max-w-7xl mx-auto">
          <div className="px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Our Courses
            </h1>
            <p className="text-center text-gray-800 mb-4">
              Explore our curated courses to boost your skills and career.
              Whether you're a beginner or an expert, we have something for
              everyone
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {course?.slice(0, 6)?.map((course, idx) => (
                <CourseCard key={idx} course={course} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-6">
          <Link to={"/courses"} onClick={() => scrollTo(0, 0)}>
            <Button className={"max-w-2xl bg-blue-600"}>
              Explore More Courses
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
