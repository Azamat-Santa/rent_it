import React from 'react';
import {useState} from 'react'
import file from "../../../../assets/img/fileIcon.png";
import send from "../../../../assets/img/send.png";

const ChatForm = ({newMessage,heightFormMsg,sendMsgText,changeText}:any) => {
  
    return (
        <div className="chat__form" ref={heightFormMsg}>
          <div className="chat__form__file">
            <img src={file} alt="" />
          </div>
          <input
            value={sendMsgText}
            onChange={changeText}
            type="text"
            placeholder="Написать сообщение"
          />
          <div
            className="chat__form__send"
            onClick={newMessage}
          >
            <img src={send} alt="" />
          </div>
        </div>
    );
};

export default ChatForm;