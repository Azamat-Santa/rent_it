import React, { useState } from "react";
import { Rate } from "antd";
import { userApi } from "../../api/userApi";
import Title from "../../component/Title/Title";
import "./ownerProfile.scss";
import ProductCard from "../../component/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../../component/Spinner/Spinner";

const navlist = [
  {
    text: "Активные",
  },
  {
    text: "Деактивные",
  },
];

const OwnerProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeData, setActiveData] = useState();
  const [deactiveData, setDeactiveData] = useState();
  const [data, setData] = useState();
  const params = useParams();

  const [getOwenerId, { data: ownerData, isLoading: isLoadingOwnerId }] =
    userApi.useLazyGetOwenerIdQuery();
 
  useEffect(() => {
    getOwenerId(params.ownerId).then((data) => {
      const active = data.data.products.filter((p) => p.active === true);
      const deActive = data.data.products.filter((p) => p.active === false);
      setActiveData(active);
      setDeactiveData(deActive);
      setData(active);
    });
  }, []);

  const openTab = (e) => {
    setActiveTab(+e.target.dataset.index);
    if (activeTab === 1) {
      setData(activeData);
    } else {
      setData(deactiveData);
    }
  };

  return (
    <div className="owner-profile content">
    {
      ownerData ?
      <>
      <div className="owner-profile__name">
        <div>
          <img src={ownerData.imageUrl !== " " ? ownerData.imageUrl : 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png' } alt="" />
        </div>
        <div className="owner-profile__title">
          <Title text={ownerData.fullName} size="25px" margin="0px" /> <br />0 222 222 222
        </div>
      </div>
      <div className="owner-profile__rating">
        <span>Рейтинг профиля</span>
        <Rate disabled defaultValue={ownerData.profileRating / 20 }/>
      </div>
      <div className="favorite-page__left__navigate">
        {navlist.map((el, idx) => (
          <div
            onClick={openTab}
            data-index={idx}
            className={
              activeTab === idx
                ? "favorite-page__left__navigate__item active"
                : "favorite-page__left__navigate__item"
            }
            key={el.text}
          >
            {el.text}
          </div>
        ))}
      </div>

      <div className="favorite-page__left__navigate" style={{}}>
        {data && data.map((p) => <ProductCard product={p} key={p.id} />)}
      </div>
      </>
      :
      <Spinner/>
      
    }
     
    </div>
  );
};

export default OwnerProfile;
