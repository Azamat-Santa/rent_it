import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './../../../component/Title/Title';

const ProductOwner = ({ownerData,setIsComplaintsModal}:any) => {
    const history = useNavigate()
    return (
        <div className="product__owner">
        <div className="product__owner__left">
          <img src={ownerData.imageUrl !== " " ? ownerData.imageUrl : 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png'} alt="" />
        </div>
        <div className="product__owner__middle">
          <Title text={ownerData.fullName} margin="0px" size="25px"/> 
           {ownerData.phoneNumber} <br />
          <div className="product__owner__complaints"
          onClick={()=>setIsComplaintsModal(true)}
          >Пожаловаться</div>
        </div>
        <div className="product__owner__right"
        onClick={()=>{
          history(`/ownerProfile/${ownerData.userId}`)
        }}
        >Все объявления</div>
      </div>
    );
};

export default ProductOwner;