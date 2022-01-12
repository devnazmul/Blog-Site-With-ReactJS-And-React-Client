import React from "react";
import { NavLink } from "react-router-dom";


function filterComment(arr, id) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].postId === id) newArray.push(arr[i]);
  }
  return newArray;
}



export default function Card(props) {
  const { _id, title, blogImageURL, blogContent, likes, author } = props.plant;
  const numberOfCards = props.numberOfCards;

  return (
    <div className={`p-4 ${numberOfCards === 8 ? (`md:w-1/2 lg:w-1/3 xl:w-1/4`) : (`md:w-1/2 lg:w-1/3 xl:w-1/4`)}`}>
      <div className="Card transition duration-500 ease-in-out hover:shadow-xl rounded-xl overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full  object-cover rounded-lg"
            src={blogImageURL}
            alt="blog"
          />
        <div className="p-6 text-left">
          <div className='flex justify-between flex-col'>
            <div>

              <NavLink to={`/purchase/${_id}`} >
                <h1 className="title-font mb-2 text-2xl font-medium text-gray-500">
                  {title}
                </h1>
              </NavLink>
            </div>

            <p className="flex items-center mb-3 text-sm">
              {blogContent.slice(0, 90)} . . .
            </p>
          </div>

          <div className="flex justify-between items-center pt-2 pb-5">
            <p className="text-gray-300">{likes} Like</p>
            <p className="text-gray-300">By {author}</p>
            {/* <p className="text-gray-300">{comments ? comments : 0} Comments</p> */}
          </div>
          <NavLink
            to={`/purchase/${_id}`}
            className="px-5 w-full bg-gradient-to-tr transition flex justify-center items-center ease-in-out duration-500 border-2 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 hover:text-white py-1 rounded-full text-yellow-600 md:mb-2 lg:mb-0"
          >
            Read mode
          </NavLink>
        </div>
      </div>
    </div>
  )

}
