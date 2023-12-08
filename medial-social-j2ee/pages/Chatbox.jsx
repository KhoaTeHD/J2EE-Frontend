import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import Head from 'next/head';
import SockJS from 'sockjs-client';
import Stomp from "stompjs";
import Link from 'next/link';
import authService from './api/auth-service.js';
import authHeader from "./api/auth-header.js";
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState(() => [
    { sender: '', content: '' },
    
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [StompClient, setStompClient] = useState();
  const [Friends, setFriends] = useState(undefined);
  const [ActiveID, setActiveID] = useState(1);
  const messageContentArea = useRef(null);
  const [BinaryScroll, setBinaryScroll] = useState(true);
  const [RoomID, setRoomID] = useState("");


  useEffect(() => {
    async function getMessage() {
      try {
        const response = await axios.get(`http://localhost:9091/chat/${RoomID}`);
        console.log(response.data);
        setMessages(()=>response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if(RoomID!=="") getMessage();
  }, [RoomID]);

  useEffect(() => {
    const socket = new SockJS("http:/localhost:9091/ws");
    const client = Stomp.over(socket);
    let isConnected = false;
    client.connect({},()=>{
      client.subscribe(`/topic/chatroom/${RoomID}`,async (message)=>{
        const receivedMessage = await JSON.parse(message.body);
        console.log(receivedMessage);
        setMessages(prev => [...prev,receivedMessage]);
      })
      isConnected = true;
      setStompClient(client);
    })
  
    return  () => {
      if (isConnected) client.disconnect();
    }
  }, [RoomID]);

  var user = authService.getCurrentUser();
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/friends/get/" + user.id, { headers: authHeader() })
        setFriends(response.data);
        reloadUIMessage(response.data[0].userId)
    };
    fetchData();
  }, []);


  useLayoutEffect(() => {
    scrollToBottom();
    
  }, [BinaryScroll]);

  const handleSendMessage = () => {
    if (newMessage=='') return;
    console.log('test');
    let obj = {
      room_id : RoomID,
      user_id: JSON.parse(sessionStorage.getItem("user"))?.id,
      content: newMessage,
    }
    StompClient.send(
      `/app/send/chatroom/${RoomID}`,
      {},
      JSON.stringify(obj)
    );
    setNewMessage(prev => '');
    setBinaryScroll(prevState => !prevState);
  };


  const reloadUIMessage = async (activeID = 1) => {
    try {
      const response = await axios.post("http://localhost:9091/chat/save",messages);
      console.log(response.data);
    } catch  (error) {
      
    }
    let curentUserID = parseInt(user.id+"");
    let chatroomID = curentUserID < activeID ? curentUserID + "" + activeID : activeID + "" + curentUserID;
    setRoomID(prev => chatroomID);
    console.log(RoomID);
    setActiveID(prev => activeID);
    setMessages(() => [
      { sender: '', content: '' },
    ])
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (newMessage=='') return;
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messageContentArea.current) {
      const { scrollHeight, clientHeight } = messageContentArea.current;
      messageContentArea.current.scrollTop = scrollHeight - clientHeight;
      setTimeout(() => {
        messageContentArea.current.scrollTop += 60;
      }, 0);
    }
  };

  return (
    <>
        <Head>
            <link rel="stylesheet" href="/css/chatbox.css" />
        </Head>
        <div className="chat-box">
          <div className="navigation">
            <h2>Đoạn chat</h2>
            <Link href={"/Homepage"} className='btnReturn'><button>Quay lại</button></Link>
          </div>
          <div className="content">

            <div className="listFriend">
              {Friends!=undefined && Friends.map(val=>(
                <div className={val.userId == ActiveID ? "info active" : "info"} 
                      key={val.userId} 
                      onClick={()=>reloadUIMessage(val.userId)} >
                  <img src={val.avatar==null ? "/images/avatar.png" : val.avatar} alt="ảnh lỗi" />
                  <p>{val.profileName}</p>
                </div>
              ))}
            </div>
            <div className='messagesArea'>
              <div className="messages" ref={messageContentArea}>
                  {messages.map((message, index) => (
                    message.sender != '' &&
                    <div key={index} className={user.id == message.user_id ? 'message sender' : 'message receiver'}>
                        <p className='ndk'>{message.content}</p>
                    </div>
                    ))}
              </div>
              <div className="input-box">
                  <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  />
                  <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ChatBox;
