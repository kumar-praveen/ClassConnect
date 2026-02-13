import React from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import Dashboard from "./pages/instructor/Dashboard";
import Instructor from "./pages/instructor/Instructor";
import Course from "./pages/instructor/Course";
import CreateCourse from "./pages/instructor/CreateCourse";
import UpdateCourse from "./pages/instructor/UpdateCourse";
import CreateLecture from "./pages/instructor/CreateLecture";
import EditLecture from "./pages/instructor/EditLecture";
import CourseDetails from "./pages/CourseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Home />
      </>
    ),
  },

  {
    path: "/courses",
    element: (
      <>
        <Navbar />
        <Courses />
      </>
    ),
  },

  {
    path: "/courses/:courseId",
    element: (
      <>
        <Navbar />
        <CourseDetails />
      </>
    ),
  },

  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },

  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/instructor",
    element: (
      <>
        <Navbar />
        <Instructor />
      </>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "course/create",
        element: <CreateCourse />,
      },
      {
        path: "course/:courseId",
        element: <UpdateCourse />,
      },
      {
        path: "course/:courseId/lecture",
        element: <CreateLecture />,
      },
      {
        path: "course/:courseId/lecture/:lectureId",
        element: <EditLecture />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
