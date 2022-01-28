import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { logOut, user } = useAuth();
  const [logoClass, setLogoClass] = useState("text-white");

  let location = useLocation();

  const toggleNav = () => {
    const resNav = document.getElementById("res_nav");
    if (resNav.classList.contains("hidden")) {
      resNav.classList.replace("hidden", "flex");
    } else {
      resNav.classList.replace("flex", "hidden");
    }
  };

  useEffect(() => {
    const resNav = document.getElementById("res_nav");
    if (resNav.classList.contains("hidden")) {
      resNav.classList.replace("hidden", "hidden");
    } else {
      resNav.classList.replace("flex", "hidden");
    }
  }, [location.pathname]);

  window.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    if (scroll <= 50) {
      setLogoClass("text-white")
    } else {
      setLogoClass("text-black")
    }
  });

  return (
    <div className={`Header z-40 text-black body-font h-auto fixed w-full p-5 `} >
      <div className="mx-auto block md:flex flex-wrap flex-row items-center">
        <div className='flex justify-between items-center'>
          <div className="flex items-center text-3xl mb-4 md:mb-0">
            <NavLink to='/' className={`${logoClass} logo cursor-pointer flex justify-center items-center`}>
              <img
              className="h-12 mr-3"
              src="https://i.postimg.cc/L5yr8pmt/coding-language.png"
              alt=""
            />{" "}
            Programming Stack
            </NavLink>
            
          </div>

          <div>
            <button onClick={toggleNav}>
              <BiMenu className="block md:hidden text-3xl" />
            </button>
          </div>
        </div>
        
        
        <nav id="res_nav" className="bg-transparent py-5 flex md:hidden flex-col  ">
          <NavLink
            to="/home"
            activeClassName="font-semibold text-white"
            className="text-black hover:text-white hover:bg-gray-900 py-2 rounded-full overflow-hidden"
          >
            Home
          </NavLink>
          <NavLink
            to="/plants"
            activeClassName="font-semibold text-white"
            className="text-black hover:text-white hover:bg-gray-900 py-2 rounded-full overflow-hidden"
          >
            All Posts
          </NavLink>

          {user.email ? (
            <span className="flex-col flex">
              
              <NavLink
                to="/dashboard"
                activeClassName="font-semibold text-white"
                className="text-black hover:text-white hover:bg-gray-900 py-2 rounded-full overflow-hidden"
              >
                Dashboard
              </NavLink>
              
              <button
                onClick={logOut}
                className="text-black hover:text-white hover:bg-gray-900 py-2 rounded-full overflow-hidden"
              >
                Log Out
              </button>
            </span>
          ) : (
            <NavLink
              to="/login"
              activeClassName="font-semibold text-white"
              className="text-black hover:text-white hover:bg-gray-900 py-2 rounded-full overflow-hidden"
            >
              Log In
            </NavLink>
          )}

          {user.email && (
            <NavLink
              to="/"
              className="cursor-pointer text-white bg-gradient-to-tr to-yellow-800 from-yellow-400 hover:from-yellow-800 hover:to-yellow-400 mx-auto rounded-full px-1 py-1 flex justify-between items-center"
            >
              <span className="text-white ml-2 block">
                {user.displayName || user.email}
              </span>
              <img
                className="h-10 w-10 rounded-full ml-3 block"
                src={
                  user.photoURL ||
                  "https://i.ibb.co/fScLdY0/pic-1171831236-1.png"
                }
                alt=""
              />
            </NavLink>
          )}
        </nav>

        <nav className="h-full md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
          <NavLink
            to="/home"
            activeClassName="font-semibold text-textPrimary"
            className={`mr-5 text-white hover:text-gray-500`}
          >
            Home
          </NavLink>
          <NavLink
            to="/plants"
            activeClassName="font-semibold text-textPrimary"
            className={`mr-5 text-white hover:text-gray-500`}
          >
            All Posts
          </NavLink>
          

          {user.email ? (
            <span>
              <NavLink
                to="/dashboard"
                activeClassName="font-semibold text-textPrimary"
                className={`mr-5 text-white hover:text-gray-500`}
              >
                Dashboard
              </NavLink>
              
              <button
                onClick={logOut}
                className={`mr-5 text-white hover:text-gray-500`}
              >
                Log Out
              </button>
            </span>
          ) : (
            <NavLink
              to="/login"
              activeClassName="font-semibold text-textPrimary"
              className={`mr-5 text-white hover:text-gray-500`}
            >
              Log In
            </NavLink>
          )}
          {user.email && (
          <div
            to="/"
            className="lg:bg-gradient-to-tr lg:to-yellow-800 lg:from-yellow-400 hover:from-yellow-800 hover:to-yellow-400 bg-transparent rounded-full px-1 py-1 flex justify-between items-center text-white cursor-pointer"
          >
            <span className="ml-2 hidden lg:block">
              {user.displayName || user.email}
            </span>
            <img
              className="h-10 w-10 rounded-full ml-3 hidden md:block"
              src={
                user.photoURL || "https://i.ibb.co/fScLdY0/pic-1171831236-1.png"
              }
              alt=""
            />
          </div>
        )}
        </nav>

        
      </div>
    </div>
  );
};

export default Header;
