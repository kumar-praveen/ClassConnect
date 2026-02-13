import { Loader2, LogOut, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4545/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message || "Logged out successfully");
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 w-full top-0 p-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-gray-300 text-3xl font-bold flex gap-2 items-center">
          <Notebook className="w-10 h-10" />
          <p>
            Class<span className="text-primary">Connect</span>
          </p>
        </div>

        <nav>
          <ul className="font-semibold text-gray-300 flex items-center gap-6">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <a href="#courses">
              <li>Courses</li>
            </a>

            {user && user?.role === "instructor" && (
              <li>
                <Link to={"/instructor/dashboard"}>Admin</Link>
              </li>
            )}

            {!user ? (
              <div className="flex items-center gap-6">
                <Link to={"/login"}>
                  <Button className="bg-primary hover:bg-orange-500">
                    Login
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="bg-gray-700 hover:bg-gray-600">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger className="cursor-pointer">
                    <Avatar>
                      <AvatarImage src={user.photoUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent>
                    <ul className="flex flex-col">
                      <li className="border-b py-1 border-gray-400 cursor-pointer">
                        <Link to="/profile" onClick={() => setOpen(false)}>
                          Visit Profile
                        </Link>
                      </li>

                      <li className="border-b py-1 border-gray-400 cursor-pointer">
                        <Button
                          size="sm"
                          onClick={logoutHandler}
                          className={"cursor-pointer"}
                        >
                          {loading ? (
                            <>
                              Logging out...
                              <Loader2 className="animate-spin mt-1" />
                            </>
                          ) : (
                            <>
                              Logout
                              <LogOut className="mt-1" />
                            </>
                          )}
                        </Button>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
