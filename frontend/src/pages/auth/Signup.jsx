import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4545/api/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us today! It's quick and easy
        </p>
        <div className="mb-4">
          <Label className={"mb-2"}>Fullname</Label>
          <Input
            placeholder="Enter Your Name"
            type={"text"}
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label className={"mb-2"}>Email Address</Label>
          <Input
            placeholder="Enter Your Email"
            type={"email"}
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label className={"mb-2"}>Password</Label>
          <Input
            placeholder="Enter Your Password"
            type={"password"}
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label>Who are you ?</Label>
          <RadioGroup defaultValue={user.role} className={"flex items-center"}>
            <div className="flex items-center space-x-2">
              <Input
                type={"radio"}
                value="student"
                name="role"
                id="role1"
                checked={user.role === "student"}
                onChange={handleChange}
              />
              <Label htmlFor="role1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type={"radio"}
                value="instructor"
                name="role"
                id="role2"
                checked={user.role === "instructor"}
                onChange={handleChange}
              />
              <Label htmlFor="role2">Instructor</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center my-4">
          <hr className="grow bg-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="grow bg-gray-300" />
        </div>

        <Button
          onClick={handleSubmit}
          className={"w-full bg-primary hover:bg-orange-500 cursor-pointer"}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              Signing up...
              <Loader2 className="animate-spin mt-1" />
            </span>
          ) : (
            "Signup"
          )}
        </Button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
