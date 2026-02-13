import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [userData, setUserData] = useState({
    name: user?.name,
    description: user?.description,
    file: user?.photoUrl,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setUserData((prev) => ({
      ...userData,
      file: e.target.files?.[0],
    }));
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("description", userData.description);
    if (userData?.file) formData.append("file", userData?.file);
    try {
      const response = await axios.put(
        "http://localhost:4545/api/user/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto p-8 bg-linear-to-r bg-white shadow-xl rounded-2xl mt-14">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={user?.photoUrl ? user.photoUrl : "/assets/user_logo.webp"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-500">
              Welcome, {user?.name.split(" ")[0] || "User"}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              {user?.email || "Email Not Found"}
            </p>
            <p className="text-gray-600 my-1 capitalize">
              <span className="font-bold">Role: </span>
              <span>{user?.role}</span>
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              {" "}
              <span className="font-bold">Bio: </span>{" "}
              {user?.description || "Add your bio"}
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="mt-4 bg-primary text-white px-3 py-2 cursor-pointer rounded-md hover:bg-orange-500">
                Edit Profile
              </DialogTrigger>
              <DialogContent className={"sm:max-w-106.25"}>
                <DialogHeader>
                  <DialogTitle className={"text-center"}>
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className={"text-center"}>
                    Update Your Profile
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className={"text-right"}>
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="col-span-3 text-gray-500"
                      value={userData?.name}
                      onChange={changeEventHandler}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className={"text-right"}>
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      className="col-span-3 text-gray-500"
                      value={userData?.description}
                      onChange={changeEventHandler}
                    />
                  </div>{" "}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="profile" className={"text-right"}>
                      Picture
                    </Label>
                    <Input
                      type={"file"}
                      id="file"
                      accept="image/*"
                      className="col-span-3 text-gray-500"
                      onChange={changeFileHandler}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={submitHandler}
                    disabled={loading}
                    className={"bg-primary hover:bg-orange-500 cursor-pointer"}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Saving Changes...{" "}
                        <Loader2 className="animate-spin mt-1" />
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
