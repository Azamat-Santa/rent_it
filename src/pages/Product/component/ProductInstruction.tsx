import React from "react";
import registrImg from "../../../assets/img/registrImg.png";
import calendarImg from "../../../assets/img/calendar.png";
import msg from "../../../assets/img/msg.png";
import Title from './../../../component/Title/Title';
import { img } from "../../../assets/img/indexImg";

const ProductInstruction = () => {
  return (
    <div className="product__instruction ">
      <div className="content">
        <Title
          text="Инструкция по приобретению товара"
          typeClass="productDescTitle"
        />
        <div className="product__instruction__list">
          <div className="product__instruction__card">
            <div className="product__instruction__card__num">1</div>
            Пройдите полную регистрацию
            <img src={img.registrImg} alt="" />
          </div>
          <div className="product__instruction__card">
            <img src={img.calendar} alt="" />
            <div className="product__instruction__card__num">2</div>
            Кликните на кнопку забронировать и выберите даты аренды
          </div>
          <div className="product__instruction__card">
            <img src={img.msg} alt="" />
            <div className="product__instruction__card__num">3</div>
            <div>С Вами свяжутся в ближайшее время</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInstruction;
