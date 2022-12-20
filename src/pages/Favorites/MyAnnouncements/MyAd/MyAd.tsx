import React, { useState } from "react";
import Spinner from "./../../../../component/Spinner/Spinner";
import { EditOutlined } from "@ant-design/icons";
import { message, Modal, Switch } from "antd";
import { adApi } from "../../../../api/ad";
import Title from "./../../../../component/Title/Title";
import { NavLink } from 'react-router-dom';
import Button from './../../../../component/Button/Button';
import "../myAnnouncements.scss";
import AnnouncementsCard from "../component/AnnouncementsCard";

const MyAd = ({ openEditProduct }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [productId, setProductId] = useState(0);
  

  const { data, isLoading, isError } = adApi.useFetchMyAdsQuery();
  
  const [
    deActiveMyAd,
    { data: deActiveMyAdData, isLoading: deActiveMyAdLoading },
  ] = adApi.useDeActiveMyAdMutation();
  const [activaMyAd, { data: activaMyAdData, isLoading: activaMyAdLoading }] =
    adApi.useActivaMyAdMutation();
  const showModal = (productId: number, checked: boolean) => {
    setChecked(checked);
    setProductId(productId);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleActive = () => {
    if(checked) {deActiveMyAd(productId).then((data:any)=>{
      if(data?.error.originalStatus===200){
        message.success('Успешно декативировано!!!')
        setIsModalOpen(false);
      }else{
        message.error('Ошибка сервера попробуйте чуть позже!!!')
        setIsModalOpen(false);
      }
      console.log(data?.error.originalStatus);
    })}else {
      activaMyAd(productId).then((data:any)=>{
        if(data?.error.originalStatus===200){
          message.success('Успешно ативировано!!!')
          setIsModalOpen(false);
        }else{
          message.error('Ошибка сервера попробуйте чуть позже!!!')
          setIsModalOpen(false);
        }
      })
    };

  };
  return (
    <div className="announcements__content">
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <Title
          text={
            checked
              ? " Вы уверены, что хотите деактивировать объявление?"
              : " Вы уверены, что хотите активировать объявление?"
          }
          typeClass="smallTitle"
          textAlign="center"
        />
        <button onClick={handleActive} className="button ">
          {deActiveMyAdLoading || activaMyAdLoading ? (
            <Spinner color={"white"} />
          ) : (
            "Да"
          )}
        </button>
      </Modal>
      <div style={{ display: "flex", justifyContent: "end" , marginBottom:'20px'}}>
        <NavLink to={"/newProduct"}>
          <Button text="Создать объявление" />
        </NavLink>
      </div>
      {data ? (
        data.map((product: any, index: number) => (
          <AnnouncementsCard product={product} index={index} showModal={showModal} openEditProduct={openEditProduct}/>
        ))
      ) : (
        <Spinner color={"blue"} />
      )}
    </div>
  );
};

export default MyAd;
