import { Book, Search, User } from "lucide-react";
import React from "react";
import CountUp from "react-countup";

const Hero = () => {
  return (
    <div className="bg-slate-800">
      <div className="lg:h-175 max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-200">
                Explore Our <span className="text-blue-600">450+</span>
              </h1>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-200">
                Online Courses for all
              </h1>
            </div>

            <p className="text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, cupiditate dolorem. Eum fuga qui rem eveniet
              repudiandae cupiditate nisi ducimus!
            </p>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Course here.."
                className="bg-gray-200 w-2/3 p-2 rounded-l-md"
              />
              <button className="bg-blue-600 p-2 text-gray-200 rounded-r-md flex items-center gap-2 font-semibold cursor-pointer hover:bg-blue-700">
                <span>Search</span>
                <Search />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div>
            <img
              src="/assets/hero.jpg"
              alt="hero_image"
              className="rounded-xl"
            />
          </div>

          <div className="bg-gray-900 text-white hidden md:flex gap-3 items-center rounded-md absolute -top-7 -left-7 px-4 py-2">
            <div className="rounded-full bg-orange-500 p-2">
              <User />
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                <CountUp end={15000} />+
              </h2>
              <span className="italic text-sm text-gray-600 leading-none">
                Active Learners
              </span>
            </div>
          </div>

          <div className="bg-gray-900 text-white hidden md:flex gap-3 items-center rounded-md absolute top-[35%] -right-10 px-4 py-2">
            <div className="rounded-full bg-orange-500 p-2">
              <Book />
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                <CountUp end={450} />+
              </h2>
              <span className="italic text-sm text-gray-600 leading-none">
                Courses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
