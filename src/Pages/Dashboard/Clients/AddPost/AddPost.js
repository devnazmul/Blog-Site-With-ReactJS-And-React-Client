import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';

const AddPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const onSubmit = (data) => {
    data.postComments = 0
    data.timestamp=moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
    axios.post("http://localhost:5000/post", data).then((res) => {
      alert("Post Added Successfully.");
      reset();
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="bg-white w-full py-10 px-2 md:px-10 md:w-3/4 lg:w-1/2 mx-auto rounded-lg overflow-hidden">
        <h1 className="text-textPrimary text-center text-4xl font-medium mb-5">
          Create Post
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10 lg:mt-0 flex justify-start items-start" >
          <div className='flex flex-col w-full'>
            <input
              className='hidden'
              value={user.email}
              {...register("email", { required: true })}
            />
            <input
              className='hidden'
              value={user.displayName}
              {...register("author", { required: true })}
            />
            <input
              className='w-full my-1 py-2 px-2 bg-gray-100 rounded-md border border-borderPrimary'
              {...register("title", { required: "Please enter your blog title." })}
              placeholder='Blog Title'
            />
            <input
              className='w-full my-1 py-2 px-2 bg-gray-100 rounded-md border border-borderPrimary'
              {...register("blogImageURL", { required: true })}
              placeholder='Feature image url'
            />
            <textarea
              className='w-full my-1 py-2 px-2 bg-gray-100 rounded-md border border-borderPrimary'
              {...register("blogContent", { required: true })}
              placeholder='Write'
            />
            <input
              className='hidden'
              {...register("likes", { required: true })}
              value={0}
            />
            <input className='cursor-pointer w-full mt-1 bg-bgPrimary text-white py-3 rounded-md' type="submit" />
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPost;