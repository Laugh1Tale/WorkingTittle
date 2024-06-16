import { Link, Routes, Route } from "react-router-dom"
import React, { useState } from 'react';
import { ChatPage } from './Chat'
import { TestsPage } from './Tests'
import { ListeningPage } from './Listening'
import { ReadingPage } from './Reading'
import { isAuthentificated } from '../App'
import '../css/home.css';

export const HomePage = () => {
    // Создаем состояние для отслеживания наведения на элемент
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
    // Функции-обработчики для событий наведения и ухода курсора с элемента
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

      const handleProfileClick = () => {
        setIsOpen(!isOpen);
      };

      const logOut = () => {
        window.location.href = '/sign-in';
      };
  
    return (
        <div className="home-container">
        <div className="home-sidebar">      
        <div className="home-logo">
        <img src={require('../pics/logo.png')} />
        </div> 
        <div className="home-text">Добро пожаловать в Learn language AI. <br></br>LL AI – веб-сервис для подготовки к экзаменам по иностранным языкам  с применением искусственного интеллекта.<br></br><br></br>

        Погрузитесь в изучение языков с LL AI уже сегодня. Наведите курсор на кнопки справа, чтобы узнать больше о нашем сервисе и начать обучение.</div> 
        <div className="profile" onClick={handleProfileClick}>
        <img src={require('../pics/profile-icon.png')} />
        </div>
        </div>
        <div className="nav-container">
        <a href="/listening" className="button-link" onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
          <div style={{"text-decoration": "none"}} className="button-nav">{isHovered1 ? 'Пройдите тест составленный искуственным интеллектом по Listening части.' : 'Listening'}</div>
        </a>
  
        <Routes>
          <Route path="/listening" element={<ChatPage />} />
        </Routes>
  
        <Link to="/reading" className="button-link" onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
          <div style={{"text-decoration": "none"}} className="button-nav">{isHovered2 ? 'Пройдите тест составленный искуственным интеллектом по Reading части.' : 'Reading'}</div>
        </Link>
  
        <Routes>
          <Route path="/reading" element={<ReadingPage />} />
        </Routes>

        <Link to="/writing" className="button-link" onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseLeave3}>
          <div style={{"text-decoration": "none"}} className="button-nav">{isHovered3 ? 'Пройдите тест составленный искуственным интеллектом по Writing части.' : 'Writing'}</div>
        </Link>
  
        <Routes>
          <Route path="/writing" element={<ListeningPage />} />
        </Routes>
        </div>
        {isOpen && (
        <div className="popup">
          <span className="close" onClick={handleProfileClick}>&times;</span>
          <button className="logout" onClick={logOut}> Logout</button>
        </div>
      )}
      </div>
    );
  };
  