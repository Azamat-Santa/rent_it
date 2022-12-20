import React from "react";
import "./button.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

interface IButtonProps {
  typeClass?: string;
  text: string;
  background?:string;
  outline?:boolean;
  onCancel?: ()=>void
  openModal?:()=>void
}

interface IInputTypes {
  baseButton: string;
  productButton: string;
  reviewButton: string;
  [key: string]: string;
}

const buttonTypes:IInputTypes = {
  baseButton: "base-button",
  productButton: "product-button",
  reviewButton: "review-button",
};

const Button = ({ typeClass, text, onCancel ,openModal,background,outline}: IButtonProps) => {
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const isAuth = useSelector((state: any) => state.user.isAuth);
 
  const buttonClick = () => {
    setTimeout(() => {
      if (!isLoading) {
        onCancel?.()
        console.log(isAuth);
      }
    }, 1500);
    if(openModal){
      openModal?.()
    }
  };
  const out = outline ? `1px solid black` : ''
  const colorButton = outline ? `black` : ''

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <button
      className={`button ${buttonTypes[typeClass ? typeClass : '']}`}
      type="button"
      onClick={() => buttonClick()}
      style={{background:background,border:out,color:colorButton}}
    >
      {isLoading ? <Spin indicator={antIcon} /> : text}
    </button>
  );
};

export default Button;
