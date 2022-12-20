import React, { useState } from "react";
import Title from "../../../component/Title/Title";
import "./myAnnouncements.scss";
import MyAd from "./MyAd/MyAd";
import BookingRequests from "./BookingRequests/BookingRequests";
import { navlistMyAd } from "./const";


const MyAnnouncements = ({ openEditProduct }: any) => {
  const [activeTab, setActiveTab] = useState(0)
  const openTab = (e:any) => setActiveTab(+e.target.dataset.index);
  const tabContent =[
    {
        content:<MyAd openEditProduct={openEditProduct} />
    },
    {
        content:<BookingRequests/>
    },
    
  ]
  return (
    <div className="">
       <div className="favorite-page__left__navigate">
        {navlistMyAd.map((el:any, idx:number) => (
          <div
          onClick={openTab}
          data-index={idx}
            className={
              activeTab === idx
                ? "favorite-page__left__navigate__item active"
                : "favorite-page__left__navigate__item"
            }
            key={el.path}
          >
            {el.text}
          </div>
        ))}
      </div>
      {tabContent[activeTab] &&  <div> {tabContent[activeTab].content}</div> }
      

      
    </div>
  );
};

export default MyAnnouncements;
