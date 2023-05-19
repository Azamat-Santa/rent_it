import "./chat.scss";
import { useState, useEffect, ChangeEvent, LegacyRef } from "react";
import Title from "../../../component/UI/Title/Title";
import { useRef } from "react";
import { chatApi } from "../../../core/api/chat";
import jwt_decode from "jwt-decode";
import Spinner from "../../../component/UI/Spinner/Spinner";
import ChatForm from "../../../component/ChatForm";
import { IChat } from "../../../core/types/IChat";
import  classNames  from 'classnames';
import { img } from "../../../assets/img/indexImg";

interface IJwt {
  user_id:string 
}
const Chat = () => {
  const [activeChat, setActiveChat] = useState<number>(0);
  const [heightMsgsBlock, setHeightMsgsBlock] = useState<number>(0);
  const [currentIdSend, setCurrentIdSend] = useState(0);
  const [currentChat, setCurrentChat] = useState({
    name: "",
    email: "",
  });
  const [sendMsgText, setSendMsgText] = useState("");
  const token = localStorage.getItem("accessTocken")
  const decode = {user_id:'34'}
  const [getChatId, { data: conversations }] = chatApi.useLazyGetChatIdQuery();
  const { data: message } = chatApi.useGetMessageIdQuery(currentIdSend);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const heightBlock = useRef<null | HTMLDivElement>(null);
  const heightFormMsg = useRef<HTMLDivElement| null >(null);
  const dynamicWidth = "calc(100% - " + heightMsgsBlock + "px" + ")";
  
  const [sendMessage] = chatApi.useSendMessageMutation()

  // useEffect(() => {
  //   getChatId(decode?.user_id).then((res) => {
  //     const { email, firstName } = res?.data?[0].chatUsers[0] 
  //     const { id } = res?.data?[0]?.id
  //     setCurrentIdSend(id)
  //     setCurrentChat({
  //       name: firstName,
  //       email
  //     });
  //   });
  // }, []);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  const newMessage = ()=>{
    const option = {
        chatId: currentIdSend,
        senderId: decode.user_id,
        content: sendMsgText,
      };
      sendMessage(option);
      setSendMsgText("");
  }
  const changeText = (e:ChangeEvent<HTMLInputElement>)=>{
    setSendMsgText(e.target.value)
  }
  const activeChatHandler =  (c:IChat,index:number) => {
    setActiveChat(index);
    setCurrentIdSend(c.id);
    setCurrentChat({
      name: c.chatUsers[0].firstName,
      email: c.chatUsers[0].email,
    });
  }

  return (
    <div className="chat">
      <div className="chat__left">
        {conversations ? (
          conversations !== undefined &&
          conversations.length !== 0 &&
          conversations.map((c, index:number) => {
            return conversations[index].chatUsers.map((person, idx) => (
              <div
                className={
                  activeChat === index
                    ? "chat__left__card active"
                    : "chat__left__card"
                }
                key={idx}
                onClick={()=>activeChatHandler(c,index)}
              >
                <div className="chat__left__card__avatar">
                  <img
                    src={
                      person.imageUser !== " "
                        ? person.imageUser
                        : img.noAvatar
                    }
                    alt=""
                  />
                </div>
                <div className="chat__left__card__name">{person.firstName}</div>
                <div className="chat__left__card__msg">{person.text}</div>
              </div>
            ));
          })
        ) : (
          <Spinner color={'blue'}/>
        )}
      </div>
      <Title text="" />
      <div className="chat__right">
        <div className="chat__right__top" ref={heightBlock}>
          <div className="chat__right__top__name">
            <Title text={currentChat.name} typeClass="smallTitle" margin="0" />
            <p>{currentChat.email}</p>
          </div>
        </div>
        <div className="chat__right__msgs" style={{ height: dynamicWidth }}>
          {message ? (
            message.length !== 0 &&
            message.map((msg) => (
              <div
                className={classNames("chat__right__msgs__wrapper" ,{'me':msg.chatUserDto.id === decode.user_id})}
                key={msg.id}
                ref={scrollRef}
              >
                <div
                  className={classNames("chat__right__msgs__msg" , {'me':msg.chatUserDto.id === decode.user_id})}
                >
                  {msg.content}
                </div>
              </div>
            ))
          ) : (
            <Spinner color={'blue'} />
          )}
        </div>
        <ChatForm newMessage={newMessage} heightFormMsg={heightFormMsg} changeText={changeText} sendMsgText={sendMsgText}/>
      </div>
    </div>
  );
};

export default Chat;
