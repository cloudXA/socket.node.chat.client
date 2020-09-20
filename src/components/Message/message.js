import React from 'react'

import './message.scss';


const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser 
      ? (
        <div className="messageContainer justifyEnd" justifyEnd>
          <p className="sentText pr-10">
            {trimmedName}
          </p>
          <span className="triangular-arrow right"></span>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">
              {text}
            </p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart" justifyStart>
          <p className="sentText pl-10">{user}</p>
          <span className="triangular-arrow left"></span>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">
              {text}
            </p>
          </div>
      
        </div>
      )
  )
}

export default Message
