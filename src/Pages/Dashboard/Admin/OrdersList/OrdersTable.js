import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";

const OrdersTable = (props) => {
  const setChangeData = props.setChangeData;

  const done = (id) => {
    if (window.confirm('Are you sure this order is done?')) {
      axios
      .put(`http://localhost:5000/orders/done/${id}`)
      .then((res) => {
        setChangeData(Math.random());
      });
    } else {
      console.log('canceled');
    }
    
  };
  const deleteOrder = (id) => {
    if (window.confirm('Are you sure to delete this order?')) {
      axios
      .delete(`http://localhost:5000/orders/${id}`)
      .then((res) => {
        setChangeData(Math.random());
      });
    } else {
      console.log('canceled');
    }
    
  };

  const { _id, procuctImage, procuctName, name, imgUrl, email, address, phone, price, status } =
    props.order;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <img className="h-12 w-12 rounded-full" src={imgUrl} alt="" />
          </div>
          <div className="ml-4 text-left">
            <div className="text-md font-medium text-gray-900">
              Name: {name}
            </div>
            <div className="text-sm text-gray-400">Id: {_id}</div>
            <div className="text-sm text-gray-400">Email: {email}</div>
            <div className="text-sm text-gray-400">Address: {address}</div>
            <div className="text-sm text-gray-400">Phone: {phone}</div>
            <div className="text-sm text-gray-400">Price: {price}</div>
            {status === "done" ? (
              <div className="text-sm  text-green-500 ">Status: {status}</div>
            ) : (
              <div className="text-sm  text-yellow-500 ">Status: {status}</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <img className="h-12 w-12 rounded-full" src={procuctImage} alt="" />
          </div>
          <div className="ml-4 text-left">
            <div className="text-lg font-medium text-gray-300">
              Product Name: <span className='text-textPrimary'>{procuctName}</span> 
            </div>
          </div>
        </div>
      </td>
      
      <td className="py-4 whitespace-nowrap h-full text-right text-sm font-medium">
        <div className="flex items-center justify-around">
          {status === "done" ? (
            <MdOutlineDoneAll className='text-gray-500 text-xl' />
          ) : (
            <button onClick={() => {
              done(_id);
            }}
            className='text-textPrimary text-xl'>
            <MdOutlineDoneAll />
          </button>
          )}

          <button
            onClick={() => {
              deleteOrder(_id)
            }}
            className="text-xl text-red-600"
          >
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrdersTable;
