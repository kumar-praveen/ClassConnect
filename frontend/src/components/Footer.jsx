import React from "react";

const Footer = () => {
  return (
    <footer className="w-full p-5 bg-gray-800">
      <div className="max-w-7xl mx-auto text-white text-center">
        &copy; {new Date().getFullYear()} LMS platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
