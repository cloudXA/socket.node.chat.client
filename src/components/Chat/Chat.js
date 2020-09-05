import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import io from 'socket.io-client';
import './Chat.scss'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';
  

  // 相当于componentDidMount 和 componentDidUpdate 
  useEffect (() => {
    // 解析url为： ?name=1&room=1 为 {name: 1, room: 1}
    const {name, room} = querystring.parse(location.search);
    socket = io(ENDPOINT);  // 请求了该服务器😢

    setName(name);
    setRoom(room);

    console.log(socket);

    socket.emit('join', { name, room }, ({ error }) => {
      alert(error);
    })
    
  },[ENDPOINT, location.search]);  // 仅仅因为此二参数触发 😢


  
  return (
    <div>
      chat
    </div>
  )
}

export default Chat