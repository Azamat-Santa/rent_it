import "./chat.scss";
import { useState, useEffect } from "react";
import Title from "../../../component/UI/Title/Title";
import { useRef } from "react";
import { chatApi } from "../../../core/api/chat";
import jwt_decode from "jwt-decode";
import Spinner from "../../../component/UI/Spinner/Spinner";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import ChatForm from "../../../component/ChatForm";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [heightMsgsBlock, setHeightMsgsBlock] = useState(0);
  const [currentIdSend, setCurrentIdSend] = useState(0);
  const [currentChat, setCurrentChat] = useState({
    name: "",
    email: "",
  });
  const [sendMsgText, setSendMsgText] = useState("");
    
  const userId = jwt_decode(localStorage.getItem("accessTocken")).user_id;
  const [getChatId, { data: conversations }] = chatApi.useLazyGetChatIdQuery();
  const { data: message } = chatApi.useGetMessageIdQuery(currentIdSend);

  useEffect(() => {
    getChatId(userId).then((data) => {
      const { email, imageUser, firstName } = data?.data[0]?.chatUsers[0];
      const { id } = data?.data[0];
      console.log(id, "id");
      setCurrentIdSend(id);
      setActiveChat();
      setCurrentChat({
        name: firstName,
        imageUser,
        email,
      });
    });
  }, []);
  useEffect(() => {
    setHeightMsgsBlock(
      Number(heightBlock.current?.getBoundingClientRect().height) +
        Number(heightFormMsg.current?.getBoundingClientRect().height) +
        20
    );
  }, []);

  const [sendMessage, { data: sendMsgData }] =
    chatApi.useSendMessageMutation(currentIdSend);
  let stompClient = useRef();

  useEffect(() => {
    let socket = new SockJS(`http://139.59.77.163:8080/ws`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, onConnected, () => {
      console.log("disconnect");
    });

    function onConnected(data) {
      // Subscribe to the Public Topic
      stompClient.current.subscribe("/topic/public", onMessageReceived);
      console.log(data, "data");
    }
    function onMessageReceived(pay) {
      console.log(pay, "pay");
    }
  }, []);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  function sendMessage2(chatMessageRequest) {
    if (stompClient.current) {
      stompClient.current.send(
        "/app/chat-sendMessage",
        {},
        JSON.stringify(chatMessageRequest)
      );
    }
    console.log(stompClient);
  }

  const heightBlock = useRef(null);
  const heightFormMsg = useRef(null);
  const dynamicWidth = "calc(100% - " + heightMsgsBlock + "px" + ")";

  const newMessage = ()=>{
    const option = {
        chatId: currentIdSend,
        senderId: userId,
        content: sendMsgText,
      };
      sendMessage(option);
      // sendMessage2(option)
      setSendMsgText("");
  }
  const changeText = (e)=>{
    setSendMsgText(e.target.value)
}
const activeChatHandler =  (c,index) => {
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
          conversations.map((c, index) => {
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
                        : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
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
          <Spinner />
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
                className={
                  msg.chatUserDto.id === userId
                    ? "chat__right__msgs__wrapper"
                    : "chat__right__msgs__wrapper me"
                }
                key={msg.id}
                ref={scrollRef}
              >
                <div
                  className={
                    msg.chatUserDto.id === userId
                      ? "chat__right__msgs__msg"
                      : "chat__right__msgs__msg me"
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
        <ChatForm newMessage={newMessage} heightFormMsg={heightFormMsg} changeText={changeText} sendMsgText={sendMsgText}/>
      </div>
    </div>
  );
};

export default Chat;
