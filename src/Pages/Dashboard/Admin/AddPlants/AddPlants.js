import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddPlants = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axios.post("https://mighty-ocean-43323.herokuapp.com/posts", data).then((res) => {
      if (res.data.insertedId) {
        alert("Post Added Successfully.");
        reset();
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="bg-white w-full py-10 px-2 md:px-10 md:w-3/4 lg:w-1/2 mx-auto rounded-lg overflow-hidden">
        <h1 className="text-textPrimary text-center text-4xl font-medium mb-5">
          Add New Plants
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-5">
            <input
              {...register("plantName", { required: true })}
              type="text"
              id="plantName"
              name="plantName"
              placeholder="Plant name"
              className="flex-1 py-2 border-2 px-3 rounded-lg border-gray-400 focus:border-borderPrimary
                      text-gray-600 placeholder-gray-400
                      outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            
            <input
              {...register("imageUrl", { required: true })}
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image url"
              className="flex-1 py-2 border-2 px-3 rounded-lg border-gray-400 focus:border-borderPrimary
              text-gray-600 placeholder-gray-400
              outline-none"
            />
          </div>
          <div className="flex items-center mb-5">
            
            <textarea
              {...register("description", { required: true })}
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="flex-1 py-2 border-2 px-3 rounded-lg border-gray-400 focus:border-borderPrimary
              text-gray-600 placeholder-gray-400
              outline-none"
            />
          </div>



        <div className="flex items-start mb-5">
            <select
            {...register("rating", { required: true })}
            id='rating'
            name="rating"
            title='rating'
            className="flex-1 py-3 border-2 px-2 rounded-lg border-gray-400 focus:border-borderPrimary
              text-gray-600 placeholder-gray-400
              outline-none"
            >
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          <div className="flex flex-col items-start mb-5">
        
            <input
              {...register("price", { required: true })}
              type="number"
              id="price"
              placeholder='Price'
              name="price"
              className="flex-1 py-3 w-full border-2 px-10 rounded-lg border-gray-400 focus:border-borderPrimary
              text-gray-600 placeholder-gray-400
              outline-none"
            />
          </div>


          <div className="text-right">
            <input
              className=" w-full cursor-pointer rounded-lg py-3 px-8 bg-bgPrimary text-white font-bold"
              type="submit"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlants;
