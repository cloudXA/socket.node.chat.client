import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/message'

import './messages.scss';

const Messages = ({ messages,name }) => (// 传入进来messages
  <div className="messagesBox">
    {
      messages.map(
        (message, i) => 
          <div key={i}>
            <Message message={message} name={name}></Message>
          </div>
      )
    }
  </div>
)
  

export default Messages;