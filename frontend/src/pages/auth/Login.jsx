import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4545/api/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/");
        dispatch(setUser(response.data.user));
        toast.success(response.data.message || "Logged in successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Login into your account
        </p>
        <div className="mb-4">
          <Label className={"mb-2"}>Email Address</Label>
          <Input
            type={"text"}
            placeholder="Enter Your Email"
            name="email"
            id="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label className={"mb-2"}>Password</Label>
          <Input
            type={"password"}
            placeholder="Enter Your Password"
            name="password"
            id="password"
            value={input.password}
            onChange={handleChange}
          />
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
              Logging in...
              <Loader2 className="animate-spin mt-1" />
            </span>
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
