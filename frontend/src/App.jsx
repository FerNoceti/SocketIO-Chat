import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'

const socket = io('/');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === '') return
    const newMessage = {
      data: message,
      from: 'Yo',
    };
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
    inputRef.current.value = '';
    setMessage('')
  };

  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  useEffect(() => {
    socket.on('message', (message) => {
      receiveMessage(message);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div className='App'>

      <div className='App'>
        <ul className='messages'>
          {messages.map((message, index) => (
            <li key={index} className={`message ${message.from === 'Yo' ? 'ownMessage' : 'messageContent'}`}>
              <span className="messageFrom">{message.from}</span>
              <span className="messageData">{message.data}</span>
            </li>
          ))}
        </ul>
      </div>

      <form className='inputArea' onSubmit={handleSubmit}>
        <input className='input'
          type="text"
          placeholder="Share your message!"
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
        <button className='submit' type="submit">
          <img src='https://i.imgur.com/5yWRYaK.png'/>
        </button>
      </form>

    </div>
  );
}

export default App;
