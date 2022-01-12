import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../../Home/Components/Loading/LoadingAnimation";
import AllUsersTable from "./AllUsersTable";


const AllUserList = () => {
    const [changeData, setChangeData] = useState()
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("https://mighty-ocean-43323.herokuapp.com/users").then((res) => {
      setUsers(res.data.users);
      setIsLoading(false);
    });
  }, [changeData]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-bgPrimary text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    User's Information
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading ? (
                  users.length === 0 ? (
                    <td colSpan={3}>
                      <div className="flex justify-center h-full py-10 items-center text-gray-800 text-5xl">
                      No Data Found
                    </div>
                    </td>
                  ) : (
                    users?.map((user) => <AllUsersTable setChangeData={setChangeData} key={user._id} user={user} />)
                  )
                ) : (
                  <td colSpan={3}>
                      <LoadingAnimation />
                    </td>
                )}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUserList;
