import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from '../Shared/Header/Header';

const SignUp = () => {
  const { signinWithGoogle, signUpWithEmail, user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const url = location.state?.from || '/home';
  if (user.email) {
      history.push(url);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const saveUserName = (e) => {
    setUserName(e.target.value);
  };
  const saveEmail = (e) => {
    setEmail(e.target.value);
  };
  const savePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegistration = (e) => {
    signUpWithEmail(userName, email, password);
    e.preventDefault();
  };


  return (
    <>
    <Header />
    <div className=" SignUp pt-32 pb-10 flex justify-center relative items-center text-black h-screen bg-transparent px-4">
    

      <div className="w-full md:w-1/2 flex testiCard">
        <div
          onSubmit={handleRegistration}
          className="bg-transparent rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
        >
          <form>
            <h2 className="text-textPrimary text-5xl mb-1 font-medium title-font">
              Sign Up
            </h2>
            <div className="relative mb-4 text-left">
              <label
                htmlFor="username"
                className="leading-7 text-sm "
              >
                User Name
              </label>
              <input
                required
                onChange={saveUserName}
                type="text"
                id="username"
                name="username"
                className="w-full rounded bg-gray-100 border border-borderPrimary focus:border-borderPrimary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4 text-left">
              <label
                htmlFor="email"
                className="leading-7 text-sm "
              >
                Email
              </label>
              <input
                required
                onChange={saveEmail}
                type="email"
                id="email"
                name="email"
                className="w-full rounded bg-gray-100 border border-borderPrimary focus:border-borderPrimary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4 text-left">
              <label
                htmlFor="email"
                className="leading-7 text-sm "
              >
                Password
              </label>
              <input
                required
                onChange={savePassword}
                type="password"
                id="password"
                name="password"
                className="w-full rounded bg-gray-100 border border-borderPrimary focus:border-borderPrimary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <p className="text-left text-gray-500">
              Have An Account?{" "}
              <NavLink to="/login" className="text-textPrimary">
                Sign In.
              </NavLink>
            </p>
            <input
              type="submit"
              value="Sign Up"
              className="w-full mt-8 text-white   bg-gradient-to-tr transition  ease-in-out duration-1000 hover:from-green-800 hover:to-green-300 to-green-800 from-green-300 border-0 py-2 px-6 focus:outline-none hover:bg-white rounded text-lg"
            />
          </form>
          <button
            onClick={signinWithGoogle}
            className="flex lg:flex-row md:flex-col mx-auto justify-center items-center w-full md:w-3/7 shadow-md bg-white mt-8 text-black border-0 py-1 px-6 focus:outline-none hover:bg-gray-200 rounded-full text-lg"
          >
            <img className='h-10 mr-5' src="https://i.ibb.co/mTfYM0Y/search.png" alt="" /> Login with Google.
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;