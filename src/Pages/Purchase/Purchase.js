import axios from "axios";
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
      .get(`https://mighty-ocean-43323.herokuapp.com/post/${_id}`)
      .then((res) => {
        setPost(res.data);
      });
  }, [commentChange]);

  useEffect(() => {
    axios
      .get(`https://mighty-ocean-43323.herokuapp.com/comments`)
      .then((res) => {

        const com = res.data.comments;
        const comnts = filterComment(com, _id);

        setComments(comnts.reverse());
        setCommentIsLoading(false);
      });
  }, [commentChange]);

  const onSubmit = (data) => {
    
    setIsDisableComment(true)
    axios
      .post("https://mighty-ocean-43323.herokuapp.com/comment", data)
      .then((res) => {
        if (res.data) {
          commentChange ? setCommentChange(false) : setCommentChange(true)
          reset();
          setIsDisableComment(false)
        }
      });
  };

  const increaseLike = (id, data) => {
    setIsDisableLike(true)
    axios
      .put(`https://mighty-ocean-43323.herokuapp.com/postLike/${id}`, data)
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
      <div className="purches py-10 px-5 md:px-10 h-auto">
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
                    <div className=" w-full p-5 text-left">
                      <h1 className="text-black text-5xl title-font font-medium mb-5 md:flex md:items-center flex flex-col md:justify-between">
                        {post.title}
                        <br />
                        <p className="text-gray-400 text-sm w-full mt-2">By {post.author}</p> 
                        <br className="md:hidden" />

                        </h1>
                        {
                          post.likedUEmail.includes(user.email) ?
                            <div className="text-xl my-3 flex justify-items-center items-center text-blue-600">
                              <button className="flex items-center mr-1" onClick={() => { !isDisableLike ? (user.email ? (increaseLike(_id, { postData: post, userEmail: user.email })) : (alert('Please login for place a like 😊'))) : (alert('wait')) }}>
                                <BsHeartFill className={`mr-2 text-xl text-blue-600`} /> {post.likes} 
                              </button>
                               Likes
                            </div>
                            :
                            <div className="text-xl mt-3 text-gray-400 flex justify-items-center items-center">
                              <button className="flex items-center mr-1" onClick={() => { !isDisableLike ? (user.email ? (increaseLike(_id, { postData: post, userEmail: user.email })) : (alert('Please login for place a like 😊'))) : (alert('wait')) }}>
                                <BsHeart className={`mr-2 text-xl text-gray-400`} /> {post.likes} 
                              </button>
                              Likes
                            </div>
                        }
                      
                      <p className="leading-relaxed">{post.blogContent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        {user.email ? 
        <form onSubmit={handleSubmit(onSubmit)} className="px-10 w-full mt-10 lg:mt-0 flex flex-col justify-start items-start" >
          <h1>Add a comment</h1>
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
              {...register("comment", { required: true })}
              placeholder='Write'
            />

            <input className='cursor-pointer w-full mt-1 bg-bgPrimary text-white py-3 rounded-md' type="submit" />
          </div>

        </form>
        :
        <h1>
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
      <div className="text-left text-black purchesCard rounded-lg w-full px-20 flex flex-col relative z-10  shadow-xl">
        <h2 className="text-left text-black text-3xl mb-12 font-medium title-font">
          Comments
        </h2>
        <div>
          {
            !commentIsLoading ?
              (comments.length === 0 ?
                (<div className='flex justify-center items-center text-gray-800 text-5xl'>No comments found!</div>)
                :
                <>
                  {
                    comments.map((comment) => <CommentCart postId={post._id} replaies={[]} setCommentChange={setCommentChange} commentChange={commentChange} comment={comment} />)
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
