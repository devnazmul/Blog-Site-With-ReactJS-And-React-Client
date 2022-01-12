import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

const AllUsersTable = (props) => {

  const { email, displayName, photoURL, role } = props.user;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={photoURL} alt="" />
          </div>
          <div className="ml-4 text-left">
            <div className="text-sm font-medium text-gray-900">
              {displayName}
            </div>
            <div className="text-sm text-gray-500">{email}</div>
            {role ? 
            (<div className="text-sm flex">Role: <span className='ml-2 bg-green-300 items-center justify-between text-green-600 px-2 w-auto rounded-full flex'>{<RiAdminLine className='mx-1' />} {role}</span> </div>
            ): (<div className="text-sm flex">Role: <span className='ml-2 bg-gray-300 items-center justify-between text-gray-400 px-2 w-auto rounded-full flex'>{<AiOutlineUser className='mx-1' />} general</span> </div>)
            }
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AllUsersTable;
