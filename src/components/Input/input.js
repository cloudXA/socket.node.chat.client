import React from 'react';

import './input.scss';


const Input = ({ message, setMessage, sendMessage }) => (
  <form action="" className="form">
    <input 
      type="text" 
      className="input"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={event => event.key === 'enter' ? sendMessage(event) : null}
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
  </form>


)

export default Input