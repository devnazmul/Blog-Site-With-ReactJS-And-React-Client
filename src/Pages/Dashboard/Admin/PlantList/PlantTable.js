import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";

const PlantTable = (props) => {
   
    const setChangeData = props.setChangeData;
    
    const deletePlant = (id) => {

      if (window.confirm('Are you sure to delete this plant?')) {
        axios.delete(`http://localhost:5000/posts/${id}`).then((res) => {
            setChangeData(Math.random());
        });
      } else {
        console.log('canceled');
      }
        
      }

  const { _id, plantName, imageUrl, description } = props.plant;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={imageUrl} alt="" />
          </div>
          <div className="ml-4 text-left">
            <div className="text-sm font-medium text-gray-900">{plantName}</div>
            <div className="text-sm text-gray-500">
              {description.slice(0, 30)}...
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

export default PlantTable;
