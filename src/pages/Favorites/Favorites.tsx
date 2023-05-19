import React from "react";
import "./favorites.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Favorite from "./Favorite/Favorite";
import MyAnnouncements from "./MyAnnouncements/MyAnnouncements";
import Chat from "./Chat/Chat";
import SettingsComponent from "./SettingsComponent/SettingsComponent";
import TabContent from "./TabContent/TabContent";
import ProductEdit from './ProductEdit/ProductEdit';
import { navlistFavorite } from "../../consts/navlistFavorite";
import  classNames  from 'classnames';
const Favorites = () => {
   const {tabId} = useParams()
   const [activeTab, setActiveTab] = useState(Number(tabId));
   const openTab = (e:any) => setActiveTab(+e.target.dataset.index);
   const openEditProduct = () => setActiveTab(4);

      const tabContent =[
        {
            content:<Favorite/>
        },
        {
            content:<MyAnnouncements openEditProduct={openEditProduct}/>
        },
        {
            content:<Chat />
        },
        {
            content:<SettingsComponent/>
        },
        {
            content:<ProductEdit/>
        }
      ]

     

  return (
    <div className="favorite-page content">
        <div className="favorite-page__right">
        {navlistFavorite.map((el, idx) => (
          <div
          onClick={openTab}
          data-index={idx}
            className={classNames('favorite-page__right__item',{'active': activeTab === idx })}
            key={el.text}
          >
            {el.text}
          </div>
        ))}
      </div>
      <div className="favorite-page__left" style={{ height : activeTab !== 2 ? 'auto' : '70vh'}}>
          {tabContent[activeTab] &&  <TabContent {...tabContent[activeTab]}/> }
      </div>
    </div>
  );
};

export default Favorites;
