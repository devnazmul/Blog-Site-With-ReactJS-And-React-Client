import React from "react";
import { NavLink } from "react-router-dom";


export default function Card(props) {
  const { _id, title, blogImageURL, likes, timestamp, postComments } = props.plant;
  
  const numberOfCards = props.numberOfCards; 
 
  return (
    <div className={`p-4 ${numberOfCards === 8 ? (` md:w-1/2 lg:w-1/3 xl:w-1/4`) : (`md:w-1/2 lg:w-1/3 xl:w-1/4`)}`}>
      <div className="h-96 Card flex-col flex justify-between transition duration-500 ease-in-out hover:shadow-xl rounded-xl overflow-hidden">
        <div className="text-left">
          <img
            className="lg:h-48 md:h-36 w-full object-contain rounded-lg"
            src={blogImageURL}
            alt="blog"
          />
          <div className='px-6 flex justify-between flex-col'>
            <div className="pt-0">
              <NavLink to={`/purchase/${_id}`} >
                <span className={`text-sm bg-yellow-500 rounded-full rounded-bl-none px-3 py-1 text-white`}>{timestamp.split(',')[0]}</span>
                <h1 className="title-font mt-1 mb-2 text-2xl font-medium text-gray-500">
                  {title}
                </h1>
              </NavLink>
              {/* <p>{blogContent.slice(0, 50) + `...`}</p> */}
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="flex justify-between items-center mb-5">
            <p className="text-gray-300">{likes} Like</p>
            {/* <p className="text-gray-300">By {author}</p> */}
            <p className="text-gray-300">{postComments === null ? '0' : postComments} Comments</p>
          </div>
          <NavLink
            to={`/purchase/${_id}`}
            className="hidden px-5 w-full bg-gradient-to-tr transition md:flex justify-center items-center ease-in-out duration-500 border-2 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 hover:text-white py-1 rounded-full text-yellow-600 md:mb-4 lg:mb-4"
          >
            Read mode
          </NavLink>
        </div>
      </div>
    </div>
  )

}
