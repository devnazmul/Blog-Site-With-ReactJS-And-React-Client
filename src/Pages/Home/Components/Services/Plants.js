import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import LoadingAnimation from "../Loading/LoadingAnimation";
import Card from "./Card/Card";

const Plants = (props) => {
  const numberOfCards = props.numberOfCards;
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => {
      setPlants(res.data.posts);
      setIsLoading(false)
    })
    .catch((err)=>{console.log(err)});
  }, []);



  return (
    <>
    <Header />
    <div id="services" className='Services pt-28'>
      <h2 className="text-3xl text-center text-gray-800 md:text-4xl font-bold mb-5">
        Featured <span className="text-yellow-500">blogs</span> for you{" "}
      </h2>
      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-5 pb-24 mx-auto">
          <div className={`flex flex-wrap -m-4`}>
          {!isLoading ? ( plants.length === 0 ? <div className='flex justify-center items-center text-gray-800 text-5xl'>No Data Found</div> :
              plants?.slice(0).reverse().slice(0,numberOfCards)?.map((plant) => (
                <Card numberOfCards={numberOfCards} key={plant._id} plant={plant} />
              ))
            ) : (
              <LoadingAnimation />
            )}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Plants;
