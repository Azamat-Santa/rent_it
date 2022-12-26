
import { img } from "../assets/img/indexImg";

const ChatForm = ({newMessage,heightFormMsg,sendMsgText,changeText}:any) => {
  
    return (
        <div className="chat__form" ref={heightFormMsg}>
          <div className="chat__form__file">
            <img src={img.fileIcon} alt="" />
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
            <img src={img.send} alt="" />
          </div>
        </div>
    );
};

export default ChatForm;