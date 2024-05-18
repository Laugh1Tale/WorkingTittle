import { Link, Routes, Route } from "react-router-dom"
import React, { useState, useRef } from 'react';
import 'materialize-css';
import '../css/chat.css';
//import { SignUp } from './SignUp'

export const ChatPage = () => {
  const ChatName = useRef(null)
  const [messages, setMessages] = useState([]);
  const [messages1, setMessages1] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const [messages3, setMessages3] = useState([]);
  const [currentChat, setCurrentChat] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedButton, setSelectedButton] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [context1, setContext1] = useState('');
  const [context2, setContext2] = useState('');
  const [context3, setContext3] = useState('');
  const [topic, setTopic] = useState('');
  const [languageLevel, setLanguageLevel] = useState('A0');

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const handleMouseEnter4 = () => {
    setIsHovered4(true);
  };

  const handleMouseLeave4 = () => {
    setIsHovered4(false);
  };

  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
    event.target.style.height = 'auto'; // Сначала устанавливаем высоту на auto
    event.target.style.height = `${event.target.scrollHeight}px`; // Устанавливаем высоту равной высоте контента
  };

  const calculateHeight = (element) => {
    const lineHeight = parseInt(getComputedStyle(element).lineHeight);
    const previousRows = element.rows;
    element.rows = 1; // Устанавливаем 1 строку, чтобы узнать высоту для одной строки
    const newRows = Math.ceil((element.scrollHeight - lineHeight) / lineHeight);
    if (newRows !== previousRows) {
      element.rows = newRows;
    }
  };

  const handleInput = (event) => {
    setInputMessage(event.target.value)
  };

  const handleInputTopic = (event) => {
    setTopic(event.target.value)
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    const newMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    if (currentChat === 1)
      setMessages1([...messages1, newMessage]);
    if (currentChat === 2)
      setMessages2([...messages2, newMessage]);
    if (currentChat === 3)
      setMessages3([...messages3, newMessage]);
    setInputMessage('');
    document.getElementById('textarea').style.height = '40px';
  };

  const handleChatSwitch = (chatId) => {
    if (chatId === 1) {
      window.location.href = '/listening';
      return;
    }
    if (chatId === 2) {
      window.location.href = '/reading';
      return;
    }
    if (chatId === 3) {
      window.location.href = '/writing';
      return;
    }
    setSelectedButton(chatId);
    setCurrentChat(chatId);
  };

  var closeButtons = document.getElementsByClassName("close");
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function(event) {
    event.stopPropagation();
    handleProfileClick();
  });
}

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleGoHome = () => {
    window.location.href = '/home';
  };

  const handleSubmit = (e) => {
    document.getElementById('textarea').style.height = "20vh";
    e.preventDefault();
  };

  const handleLanguageLevelChange = (e) => {
    setLanguageLevel(e.target.value);
  };

  return (
    <div className="chat-page">
      <div className="sidebar">
      <div className="option1" onClick={handleGoHome}>
          <div className="logo-sidebar">          <img className="logo-sidebar-img" src={require('../pics/logo.png')} /></div>
        <div className="app-name-sidebar">
          LL AI
          </div>
        </div>
        <button className="option" onClick={() => handleChatSwitch(1)} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}
         style={{ border: selectedButton === 1 ? '1px solid #bbbbbb' : 'none' }}>{!isHovered1 ? "Listening" : "Здесь вы можете попрактиковаться в Listening части экзаменов"}</button>
        <button className="option" onClick={() => handleChatSwitch(2)} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}
         style={{ border: selectedButton === 2 ? '1px solid #bbbbbb' : 'none' }}>{!isHovered2 ? "Reading" : "Здесь вы можете попрактиковаться в Reading части экзаменов"}</button>
        <button className="option" onClick={() => handleChatSwitch(3)} onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseLeave3}
         style={{ border: selectedButton === 3 ? '1px solid #bbbbbb' : 'none' }}>{!isHovered3 ? "Writing" : "Здесь вы можете попрактиковаться в Writing части экзаменов"}</button>
        {/* Дополнительные кнопки */}
        <div className="profile" onClick={handleProfileClick}>
        {/* Иконка профиля */}
        <img src={require('../pics/profile-icon.png')} />
        </div>
      </div>
      <div className="chat-container">
        {/* Отображение текущего чата */} 
        <div className="chat">
          {/* Отображение сообщений */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        {/* Поле ввода сообщения и кнопка отправки */}
        <div className="separator"></div>
        <div className="input-container">
        <textarea
          id="textarea"
          value={inputMessage}
          onChange={handleChange}
          onInput={handleInput}
          placeholder="Введите сообщение..."
          style={{ resize: 'none', overflowY: 'auto' }} // Отключаем стандартную прокрутку
        />
        <button className="send" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      {isOpen && (
        <div className="popup">
          <span className="close" onClick={handleProfileClick}>&times;</span>
          <button className="logout"> Logout</button>
        </div>
      )}
    </div>
  );
};
