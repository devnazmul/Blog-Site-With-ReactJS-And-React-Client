import React from "react";
import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="bg-yellow-500 h-screen justify-center pt-28">
      <center className="mt-24 m-auto">
        <div className=" tracking-widest mt-4">
          <span className="text-gray-900 text-6xl block">
            <span>4 0 4</span>
          </span>
          <span className="text-gray-900 text-xl">
            Sorry, We couldn't find what you are looking for!
          </span>
        </div>
      </center>
      <center className="mt-6">
        <NavLink
          to="/home"
          className="text-white font-mono text-xl bg-gray-900 p-3 rounded-md hover:shadow-md"
        >
          Go back{" "}
        </NavLink>
      </center>
    </div>
  );
};

export default NotFound;
