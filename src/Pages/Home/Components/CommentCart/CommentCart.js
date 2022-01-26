import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiSendPlane2Line } from 'react-icons/ri';
import useAuth from '../../../../hooks/useAuth';
import LoadingAnimation from '../Loading/LoadingAnimation';

export default function CommentCart(props) {
    const { _id, imgUrl, name, commentText, timestamp, userEmail, parentId } = props.comment;

    const [isReplaing, setIsReplaing] = useState(false)
    const [commentIsLoading, setCommentIsLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const { register, handleSubmit, reset } = useForm();


    const commentChange = props.commentChange;
    const postId = props.postId;
    const setCommentChange = props.setCommentChange;
    const postComments = props.postComments;

    const { user } = useAuth();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/comments`)
            .then((res) => {
                setComments(res.data.comments.reverse());
                setCommentIsLoading(false);
            });
    }, [commentChange]);


    const deleteComment = (id, postId) => {
        // if (window.confirm('Are you sure to delete this comment?')) {
        //     axios.delete(`https://source.unsplash.com//comment/${id}*${postId}*${postComments}`).then((res) => {
        //         if (res) {
        //             commentChange ? setCommentChange(false) : setCommentChange(true);
        //             console.log(res);
        //         }
        //     })
        // } else {
        //     console.log('canceled');
        // }
        console.log('delete');
    }


    const onSubmit = (data) => {
        data.timestamp = moment(new Date()).format('DD/MM/YYYY, h:mm:ss a')
        console.log(data);
        axios
            .post("http://localhost:5000/comment", data)
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
        <div className='text-left my-0 pl-12 py-5'>
            <div className='flex items-start'>
                <img className='w-10 rounded-full border-2 border-gray-300 mr-2 shadow-sm' src={imgUrl} alt="name" />
                <div className='w-full'> 
                    <div className='bg-gray-100 px-5 rounded-xl rounded-tl-none py-2 shadow-md'>
                        <h1 className='font-medium my-0 py-0'>{name}</h1>
                        <span className='text-gray-400 text-xs my-0 py-0'>{timestamp}</span>
                        <p className=' mt-0'>{commentText}</p>
                    </div>
                    
                    <div className='w-1/12 ml-5 mt-2 flex justify-between'>
                        <button title='replay' className='text-textPrimary text-xs font-semibold mr-5' onClick={toggleReplay}>
                            Replay
                        </button>
                        {
                            (userEmail === user.email) && (
                                <>
                                    {/* <button title='edit'>
                                        <BsPencilSquare className='text-xl' />
                                    </button> */}

                                    <button title='delete' className='text-textPrimary text-xs font-semibold' onClick={() => deleteComment(_id, postId)}>
                                        Delete
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
                                        className="hidden"
                                    />
                                    <input
                                        {...register("commentText", { required: true })}
                                        type="text"
                                        placeholder="add replay"
                                        className="w-full mt-5 bg-gray-100 rounded-full border-2 border-gray-200 focus:border-gray-300 focus:ring-green-200 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <input
                                        id={parentId || 'sub'}
                                        type="submit"
                                        value='Submit'
                                        className="hidden"
                                    />

                                    <label htmlFor={parentId || 'sub'} className='cursor-pointer mt-5 outline-none flex items-center justify-center'>
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
                {
                    !commentIsLoading ?
                        ((comments.length !== 0) && (
                            <>
                                {
                                    comments.map(
                                        (comment) => (<>
                                            {comment.parentId === _id && (
                                                <CommentCart
                                                    key={comment._id}
                                                    postComments={postComments}
                                                    postId={postId}
                                                    setCommentChange={setCommentChange}
                                                    commentChange={commentChange}
                                                    comment={comment}
                                                />
                                            )
                                            }
                                        </>
                                        )
                                    )
                                }
                            </>
                        ))
                        :
                        <LoadingAnimation />
                }
            </div>
        </div>
    )
}
