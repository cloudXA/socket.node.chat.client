### 👀 利用socket实现client - server 通信 
<br > <br >

#### 1.2 [✔] socket通信基础实现--客户端
**Tips:** 客户端，当用户进入chat页面后，useEffect被触发，借助query-string处理？name=1&room=1的url;
借助socket.io-client客户端`socket = io(ENDPOINT); `触发服务器的的socketio的connect事件，监听到组件用户离开，则触发disconnect事件。随之关闭socket.off()
借助socket.io-client客户端
```javascript
socket.emit('join', {name, room},({error} => {
      alert(error)
    }))
```
触发join自定义事件，同时携带{name, room}对象(es6写法)作为参数传递给服务端，()=> {} callback处理来自服务端传递而来的信息（error、success）

```JavaScript
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

    socket.emit('join', {name, room},({error}) => {
      alert(error)
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
    
  },[ENDPOINT, location.search]);  // 仅仅因为此二参数触发 😢


  
  return (
    <div>
      chat
    </div>
  )
}

export default Chat

```
#### 1.2 [✔] socket通信基础实现--服务端
**Tips:** 监听connect事件（是否http协议连接）；然后根据连接产生的socket套接字，进行监听`join`自定义事件，监听http协议断开连接事件。socket通过事件事件客户端与服务端之间的信息交互。
```javascript

io.on('connect', (socket) => {
  console.log('we have a new connection')

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);

    const error = true; 

    if(error) {
      callback({ error: 'error' });
    }
  })

  socket.on('disconnect', () => {
    console.log('user had left!!!')
  })
})
```