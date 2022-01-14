import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillReplyFill, BsTrashFill } from 'react-icons/bs';
import { RiSendPlane2Line } from 'react-icons/ri';
import useAuth from '../../../../hooks/useAuth';

export default function CommentCart(props) {

    const [isReplaing, setIsReplaing] = useState(false)
    const { register, handleSubmit, reset } = useForm();

    const { _id, imgUrl, name, comment, timestamp, userEmail } = props.comment;

    const commentChange = props.commentChange;
    const postId = props.postId;
    const setCommentChange = props.setCommentChange;

    const { user } = useAuth();
    const postComments = props.postComments; 

  
    const deleteComment = (id, postId) => {
        if (window.confirm('Are you sure to delete this comment?')) {
            axios.delete(`https://source.unsplash.com//comment/${id}*${postId}*${postComments}`).then((res) => {
                if (res) {
                    commentChange ? setCommentChange(false) : setCommentChange(true);
                    console.log(res);
                }
            })
        } else {
            console.log('canceled');
        }
    }


    const onSubmit = (data) => {
        console.log('submit');
        axios
            .post("https://mighty-ocean-43323.herokuapp.com/comment", data)
            .then((res) => {
                if (res.data.insertedId) {
                    console.log(res);
                    commentChange ? setCommentChange(false) : setCommentChange(true)
                }
                reset();
            });
    };


    const toggleReplay = () => {
        isReplaing ? setIsReplaing(false) : setIsReplaing(true)
    }

    return (
        <div className='text-left  my-2 px-10 pl-10 py-5'>
            <div className='flex items-start'>
                <img className='w-12 rounded-full border-2 border-gray-300 mr-3' src={imgUrl} alt="name" />
                <div className='w-full'>
                    <h1 className='text-xl font-medium'>{name}</h1>
                    <span className='text-gray-300 text-sm'>{timestamp}</span>
                    <p className=' mt-3'>{comment}</p>
                    <div className='w-1/12 mt-3 flex justify-between'>
                        <button title='replay' onClick={toggleReplay}>
                            <BsFillReplyFill className='text-xl' />
                        </button>
                        {
                            (userEmail === user.email) && (
                                <>
                                    {/* <button title='edit'>
                                        <BsPencilSquare className='text-xl' />
                                    </button> */}

                                    <button title='delete' onClick={() => deleteComment(_id, postId)}>
                                        <BsTrashFill className='text-xl' />
                                    </button>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={`${!isReplaing && "hidden"} w-full lg:mt-0 flex justify-start items-start`} >
                <div className="text-left text-black purchesCard rounded-lg w-full px-5 flex flex-col relative z-10  shadow-xl">
                    <div className="">
                        <div className="relative mb-4 mr-1 w-full flex">
                            {user.photoURL ? (
                                <input
                                    {...register("imgUrl", { required: true })}
                                    className="hidden"
                                    value={`${user.photoURL}`}
                                    type="text"
                                />
                            ) : (
                                <input
                                    {...register("imgUrl", { required: true })}
                                    className="hidden"
                                    value="https://i.ibb.co/fScLdY0/pic-1171831236-1.png"
                                    type="text"
                                />
                            )}
                            {user.displayName ?
                                <>
                                    <input
                                        {...register("parentId", { required: true })}
                                        value={`${_id}`}
                                        type="text"
                                        required
                                        id="parentId"
                                        name="parentId"
                                        className="hidden"
                                    />
                                    <input
                                        {...register("postId", { required: true })}
                                        value={`${postId}`}
                                        type="text"
                                        required
                                        id="postId"
                                        name="postId"
                                        className="hidden"
                                    />
                                    <input
                                        {...register("userEmail", { required: true })}
                                        value={`${user.email}`}
                                        type="text"
                                        required
                                        id="userEmail"
                                        name="userEmail"
                                        className="hidden"
                                    />
                                    <input
                                        {...register("name", { required: true })}
                                        value={`${user.displayName}`}
                                        type="text"
                                        required
                                        id="name"
                                        name="name"
                                        className="hidden"
                                    />
                                    <input
                                        {...register("comment", { required: true })}
                                        type="text"
                                        required
                                        placeholder="add replay"
                                        id="comment"
                                        name="comment"
                                        className="w-full mt-5 bg-gray-100 rounded-full border-2 border-gray-200 focus:border-gray-300 focus:ring-green-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <input
                                        id='sub'
                                        type="submit"
                                        value='Submit'
                                        className="hidden"
                                    />
                                    <label htmlFor='sub' className='cursor-pointer mt-5 outline-none flex items-center justify-center'>
                                        <RiSendPlane2Line className='text-3xl ml-3 text-gray-400 duration-500 hover:text-textPrimary ' />
                                    </label>
                                </>
                                :
                                <>
                                    <h1 className="text-2xl">Please login to submit a comment.</h1>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </form>
            <div>

            </div>
        </div>
    )
}
