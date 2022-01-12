import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddAdmin = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios.put("http://localhost:5000/user/admin", data).then((res) => {
        alert("Admin Added Successfully.");
        reset();
    });
  };

    return (
      <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="bg-white w-full py-10 px-2 md:px-10 md:w-3/4 lg:w-1/2 mx-auto rounded-lg overflow-hidden">
        <h1 className="text-textPrimary text-center text-4xl font-medium mb-5">
          Add Admin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-5">
            <input
              {...register("email", { required: true })}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="flex-1 py-2 border-2 px-3 rounded-lg border-gray-400 focus:border-borderPrimary
                      text-gray-600 placeholder-gray-400
                      outline-none"
            />
          </div>
          <div className="text-right">
            <input
              className=" w-full cursor-pointer rounded-lg py-3 px-8 bg-bgPrimary text-white font-bold"
              type="submit"
              value="Make Admin"
            />
          </div>
        </form>
      </div>
    </div>
    );
};

export default AddAdmin;