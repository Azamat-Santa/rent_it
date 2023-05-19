import { img } from "../assets/img/indexImg";
import { ChangeEvent,FC, LegacyRef } from 'react';

interface ChatFormProps{
  newMessage:()=>void;
  heightFormMsg:  LegacyRef<HTMLDivElement> | null ;
  sendMsgText: string;
  changeText:(e: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatForm: FC<ChatFormProps> = ({
  newMessage,
  heightFormMsg,
  sendMsgText,
  changeText,
}) => {
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
      <div className="chat__form__send" onClick={newMessage}>
        <img src={img.send} alt="" />
      </div>
    </div>
  );
};

export default ChatForm;
