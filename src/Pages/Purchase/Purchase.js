import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import CommentCart from "../Home/Components/CommentCart/CommentCart";
import LoadingAnimation from "../Home/Components/Loading/LoadingAnimation";
import Header from "../Shared/Header/Header";

function filterComment(arr, id) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].postId === id) newArray.push(arr[i]);
  }
  return newArray;
}



const Purchase = () => {

  const { user } = useAuth();
  const { _id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentChange, setCommentChange] = useState(false);
  const [commentIsLoading, setCommentIsLoading] = useState(true);
  const [isDisableLike, setIsDisableLike] = useState(false);
  const [isDisableComment, setIsDisableComment] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${_id}`)
      .then((res) => {
        setPost(res.data);
      });
  }, [commentChange]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments`)
      .then((res) => {
        const com = res.data.comments;
        const comnts = filterComment(com, _id);
        setComments(comnts.reverse());
        setCommentIsLoading(false);
      });
  }, [commentChange]);


  const onSubmit = (data) => {
    data.postComments = post.postComments;
    data.parentId = null;
    data.timestamp = moment(new Date()).format('DD/MM/YYYY, h:mm:ss a')

    setIsDisableComment(true)

    axios
      .post("http://localhost:5000/comment", data)
      .then((res) => {
        console.log(res);
        if (res.data) {
          if (commentChange) {
            setCommentChange(false)
            setIsDisableComment(false)
            reset();
          }
          if (!commentChange) {
            setCommentChange(true)
            setIsDisableComment(false)
            reset();
          }
          reset();
        }
      });
  };

  const increaseLike = (id, data) => {

    setIsDisableLike(true)
    axios
      .put(`http://localhost:5000/postLike/${id}`, data)
      .then((res) => {
        if (res) {
          if (commentChange) {
            setCommentChange(false)
            setIsDisableLike(false)
          }
          if (!commentChange) {
            setCommentChange(true)
            setIsDisableLike(false)
          }
        }
      });
  }


  return (
    <>
      <Header />
      <div className="purches py-10 px-1 md:px-10 h-auto">
        {post.length !== 0 ?
          <>
            <div className="lg:flex">
              <div className="text-black purchesCard w-full body-font overflow-hidden rounded-lg shadow-xl">
                <div className="container p-5 mx-auto">
                  <div className="mx-auto flex flex-col md:mt-10">
                    <img
                      alt="ecommerce"
                      className="md:w-full self-center lg:h-auto h-64 object-cover object-center rounded"
                      src={post.blogImageURL}
                    />
                    <div className=" w-full py-5 text-left">
                      <h1 className="text-black text-4xl md:text-5xl title-font font-medium mb-5">
                        {post.title}
                        <br />
                        <div className="flex w-full">
                          <p className="text-gray-400 text-sm w-full mt-2">By {post.author}</p>
                          <p className="text-white text-sm w-56 mt-2 bg-yellow-500 rounded-full px-2 py-1 text-center">{post.timestamp.split(',')[0]}</p>
                        </div>

                      </h1>
                      {
                        post.likedUEmail.includes(user.email) ?
                          <div className="text-xl my-4 flex justify-items-center items-center ">
                            <button className="flex items-center mr-1" onClick={() => { !isDisableLike ? (user.email ? (increaseLike(_id, { postData: post, userEmail: user.email })) : (alert('Please login for place a like 😊'))) : (alert('wait')) }}>
                              <BsHeartFill className={`mr-2 text-xl text-red-700`} /> {post.likes}
                            </button>
                            Likes
                          </div>
                          :
                          <div className="text-xl mt-4 text-gray-400 flex justify-items-center items-center">
                            <button className="flex items-center mr-1" onClick={() => { !isDisableLike ? (user.email ? (increaseLike(_id, { postData: post, userEmail: user.email })) : (alert('Please login for place a like 😊'))) : (alert('wait')) }}>
                              <BsHeart className={`mr-2 text-xl text-gray-400`} /> {post.likes}
                            </button>
                            Likes
                          </div>
                      }

                      <p className="leading-relaxed mt-5">{post.blogContent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user.email ?
              <form onSubmit={handleSubmit(onSubmit)} className="px-5 md:px-10 w-full mt-10 lg:mt-0 flex flex-col justify-start items-start" >
                <h1 className="text-2xl">Add a comment</h1>
                <div className='flex flex-col w-full'>
                  {
                    user.photoURL ? (
                      <input
                        className='hidden'
                        value={user.photoURL}
                        {...register("imgUrl", { required: true })}
                      />
                    ) : (
                      <input
                        className='hidden'
                        value='https://i.postimg.cc/7hZmCXy4/User-Avatar-2.png'
                        {...register("imgUrl", { required: true })}
                      />
                    )
                  }
                  <input
                    className='hidden'
                    value={_id}
                    {...register("postId", { required: true })}
                  />
                  <input
                    className='hidden'
                    value={user.email}
                    {...register("userEmail", { required: true })}
                  />
                  <input
                    className='hidden'
                    value={user.displayName}
                    {...register("name", { required: true })}
                  />

                  <textarea
                    className='w-full my-1 py-2 px-2 bg-gray-100 rounded-md border border-borderPrimary'
                    {...register("commentText", { required: true })}
                    placeholder='Write'
                  />
                  {!isDisableComment ? (
                    <input className='cursor-pointer w-full mt-1 bg-bgPrimary text-white py-3 rounded-md' type="submit" />
                  ) : (
                    <input disabled className='cursor-pointer w-full mt-1 bg-gray-100 text-gray-400 py-3 rounded-md' type="submit" />
                  )}
                </div>
              </form>
              :
              <h1 className="text-red-600 text-2xl font-medium text-left pl-10">
                Please Login To place a comment.
              </h1>
            }
          </>

          :
          <div className="flex items-center justify-center h-screen w-full ">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-borderPrimary  h-64 w-64"></div>
          </div>
        }
      </div>
      <div className="text-left text-black purchesCard rounded-lg w-full px-5 md:px-20 flex flex-col relative z-10  shadow-xl">
        <h2 className="text-left text-black text-3xl mb-5 font-medium title-font">
          Comments
        </h2>
        <div>
          {
            !commentIsLoading ?
              (comments.length === 0 ?
                (<div className='text-red-600 font-medium text-left text-2xl ml-10'>No comments found!</div>)
                :
                <>
                  {
                    comments.map(
                      (comment) => (
                        <>
                          {
                            comment.parentId === null && (
                              <CommentCart
                                key={comment._id}
                                postComments={post.postComments}
                                postId={post._id}
                                setCommentChange={setCommentChange}
                                commentChange={commentChange}
                                comment={comment}
                              />)
                          }
                        </>

                      )
                    )
                  }
                </>
              )
              :
              <LoadingAnimation />
          }
        </div>
      </div>
    </>
  );
};
export default Purchase;
