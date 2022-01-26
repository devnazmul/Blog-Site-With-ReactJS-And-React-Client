import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

const PostTable = (props) => {
  const setChangeData = props.setChangeData;
  const changeData = props.changeData;

  const deletePlant = (id) => {
    if (window.confirm('Are you sure to delete this plant?')) {
      axios.delete(`http://localhost:5000/post/${id}`).then((res) => {
        if (res) {
          changeData ? setChangeData(false) : setChangeData(true)
        }
      });
    } else {
      console.log('canceled');
    }
  }

  const { _id, title, blogImageURL, blogContent } = props.plant;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">

        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 object-contain" src={blogImageURL} alt={title} />
          </div>
          <div className="ml-4 text-left">
          <NavLink
            to={`/purchase/${_id}`}
          >
            <div className="text-sm font-medium text-gray-900">{title}</div>
          </NavLink>
            
            <div className="text-sm text-gray-500">
              {blogContent.slice(0, 30)}...
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap h-full text-right text-sm font-medium">
        <div className="flex items-center justify-around">
          <button title='delete' onClick={() => {
            deletePlant(_id)
          }} className='text-xl text-red-600'>
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PostTable;
