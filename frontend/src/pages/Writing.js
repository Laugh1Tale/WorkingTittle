import React, { useState, useEffect } from 'react';
import 'materialize-css';
import '../css/tests.css';
import axios from 'axios';

export const WritingPage = () => {
    const [showStartTest, setShowStartTest] = useState(true);
    const [essayTopic, setEssayTopic] = useState('');
    const [essayText, setEssayText] = useState('');
    const [comments, setComments] = useState('');
    const [showEssayInput, setShowEssayInput] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [languageLevel, setLanguageLevel] = useState('TOEFL');
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [selectedButton, setSelectedButton] = useState(3);
    const [currentChat, setCurrentChat] = useState(3);
    const [isValid, setIsValid] = useState(false);

    const handleGoHome = () => {
        window.location.href = '/home';
      };

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
      };

      const handleAlertClick = () => {
        setIsOpenAlert(!isOpenAlert);
      };
    

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

    const fetchEssayTopic = async () => {
        setLoading(true);
        try {
            const exam = languageLevel == "TOEFL" ? "toefl" : "JLPT" ? "jlpt" : "";
            const url = "http://194.120.24.48:80/writing/" + exam;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            setEssayTopic(data.text);
            setShowStartTest(false);
            setShowEssayInput(true);
            console.log(essayTopic);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchEssayTopic();
    };

    const validateTextArea = (text) => {
        const words = text.trim().split(/\s+/).length;
        setIsValid(words >= 70 && words <= 150);
        if (languageLevel == "JLPT")
            setIsValid(true);
      };

    const handleSubmitEssay = async () => {
        validateTextArea(essayText)
        if (!isValid) {
            setIsOpenAlert(true)
            return;
        }
        setLoading(true);
        console.log(essayTopic)
        console.log(essayText)
        try {
            const exam = languageLevel == "TOEFL" ? "toefl" : "JLPT" ? "jlpt" : "";
            const url = "http://194.120.24.48:80/writing/check/" + exam;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: essayTopic, essay: essayText }),
            });
            console.log(essayText)
            const data = await response.json();
            setComments(data.text);
            setShowEssayInput(false);
            setShowComments(true);
        } catch (error) {
            console.error('Error submitting essay:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setEssayText('');
        setComments('');
        setShowComments(false);
        setShowStartTest(true);
    };

    const handleLanguageLevelChange = (e) => {
        setLanguageLevel(e.target.value);
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

      const logOut = () => {
        window.location.href = '/sign-in';
      };

    return (
        <div className="test-page">
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
            <div className="test-container">
                {showStartTest && (
                    <div className="question-container">
                    <div className="start-test">
                        <form onSubmit={handleSubmit}>
                        <div>
                                <span>Экзамен :  </span>
                                <select className="language-level" value={languageLevel} onChange={handleLanguageLevelChange}>
                                    <option value="TOEFL">TOEFL</option>
                                    {/* <option value="JLPT">JLPT</option> */}
                                </select>
                            </div>
                            <button className="save-button" type="submit">Написать эссе</button>
                        </form>
                    </div>
                </div>
                )}
                {loading && <div>Загрузка...</div>}
                {showEssayInput && (
                    <div>
                        <div className="essay-text-container">
                            <p>Ниже представлен текст, поделитесь своими размышлениями о данном тексте в виде эссе, длиной 70-150 слов: <br></br><br></br><br></br>{essayTopic}</p>
                        </div>
                        <div className='essay-container'>
                        <textarea
                            className='essay-area'
                            value={essayText}
                            pattern="."
                            onChange={(e) => setEssayText(e.target.value)}
                            placeholder="Напишите ваше эссе здесь...">
                        </textarea>
                        <button className="save-button" onClick={handleSubmitEssay}>Отправить</button>
                        </div>
                    </div>
                )}
                {showComments && (
                    <div className="question-container-result">
                        <h2>Комментарии к вашему эссе</h2>
                        <p>{comments}</p>
                        <button className="save-button" onClick={handleRetry}>Попробовать снова</button>
                    </div>
                )}
            </div>
            {isOpen && (
        <div className="popup">
          <span className="close" onClick={handleProfileClick}>&times;</span>
          <button className="logout" onClick={logOut}> Logout</button>
        </div>
      )}
        {isOpenAlert && (
        <div className="popup">
          <span className="close" onClick={handleAlertClick}>&times;</span>
          <div>Текст должен содержать от 70 до 150 слов.</div>
        </div>
      )}
        </div>
    );
};