import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../../Home/Components/Loading/LoadingAnimation";
import PlantTable from "./PlantTable";

const PlantList = () => {
    const [changeData, setChangeData] = useState()
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => {
      setPlants(res.data.plants);
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
                    Plant's Details
                  </th>
                  <th scope="col" className="relative py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading ? (
                  plants.length === 0 ? (
                    <td colSpan={3}>
                      <div className="flex justify-center h-full py-10 items-center text-gray-800 text-5xl">
                      No Data Found
                    </div>
                    </td>
                    
                  ) : (
                    plants?.map((plant) => <PlantTable setChangeData={setChangeData} key={plant._id} plant={plant} />)
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

export default PlantList;
