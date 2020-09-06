import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import InfoBar from '../InfoBar/InfoBar'
import io from 'socket.io-client';
import './Chat.scss'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');//初始化message，用户动态渲染
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';
  

  // 相当于componentDidMount 和 componentDidUpdate 
  // 当前后端通过ENDPOINT连接后，执行
  useEffect (() => {
    // 解析url为： ?name=1&room=1 为 {name: 1, room: 1}
    const {name, room} = querystring.parse(location.search);
    socket = io(ENDPOINT);  // 请求了该服务器😢

    setName(name);
    setRoom(room);


    socket.emit('join', { name, room }, ( ) => {
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
    
  },[ENDPOINT, location.search]);  // 仅仅因为此二参数触发 😢

  // 用于处理监听 message事件 
  useEffect(() => {
    socket.on('message', (message) => {  // 监听到message事件也会触发执行
      // 等效于 将新的message注入到已有的messages数组中
      setMessages([...messages, message]);

      console.log(message , 'messages前端收到的数据信息')
      console.log(messages, 'innerMessages');
    })

  }, [messages]); // 监听messages变化才会执行

  // 用于触发sendMessage事件 
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }

  }
  console.log(messages, 'outer messages')
  
  return (
    <div className="outerContainer">
      {message}
      <div className="container">
        <InfoBar room={room} />
        {/* <input 
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
              /> */}
      </div>
    </div>
  )
}

export default Chat