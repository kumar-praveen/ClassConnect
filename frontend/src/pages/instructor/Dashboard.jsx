import Sidebar from "@/components/Sidebar";
import React from "react";

const Dashboard = () => {
  return (
      <div className="w-7xl p-6 bg-gray-100 min-h-screen">
        {/* Welcome Card */}
        <div className="bg-blue-500 text-white rounded-xl p-6 flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Welcome back, Rohit Singh!</h1>
          <button className="bg-white text-blue-600 px-4 py-2 w-fit rounded-md font-medium">
            Browse New Courses
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Enrolled Courses" value="5" />
          <StatCard title="Completed Assignments" value="12" />
          <StatCard title="Pending Quizzes" value="3" />
          <StatCard title="Purchased Courses" value="2" />
        </div>

        {/* Active Courses */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Active Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CourseCard title="Course 1" progress={20} />
            <CourseCard title="Course 2" progress={50} />
            <CourseCard title="Course 3" progress={80} />
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>

          <div className="bg-white rounded-lg shadow divide-y">
            <DeadlineItem title="Assignment 1" date="Jan 15, 2025" />
            <DeadlineItem title="Quiz 2" date="Jan 18, 2025" />
          </div>
        </section>
      </div>
  );
};

export default Dashboard;

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
};

const CourseCard = ({ title, progress }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button className="w-full bg-blue-500 text-white py-2 rounded-md">
        View Details
      </button>
    </div>
  );
};

const DeadlineItem = ({ title, date }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <span>{title}</span>
      <span className="text-gray-500 text-sm">Due: {date}</span>
    </div>
  );
};
