import { Link, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import 'materialize-css';
import '../css/tests.css';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

export const ListeningPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showTest, setShowTest] = useState(false);
    const [showStartTest, setShowStartTest] = useState(true);
    const [showScore, setShowScore] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [answerFeedback, setAnswerFeedback] = useState('');
    const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
    const [showIntermediateScreen, setShowIntermediateScreen] = useState(false);
    const [languageLevel, setLanguageLevel] = useState('TOEFL');
    const [longText, setLongText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [audio, setAudio] = useState(null);
    const [questionsData, setQuestionsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [selectedButton, setSelectedButton] = useState(1);
    const [currentChat, setCurrentChat] = useState(1);

    const handleGoHome = () => {
        window.location.href = '/home';
      };

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
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

    const fetchQuestions = async () => {
        try {
            console.log(languageLevel)
            //const res = await fetch(`http://127.0.0.1:8000/listening`, {
            const exam = languageLevel == "TOEFL" ? "toefl" : "JLPT" ? "jlpt" : "";
            const url = "http://194.120.24.48:80/listening" + exam;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            setLongText(data.text);
            setQuestionsData(data.questionData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchAudio = async () => {
        setLoading(true);
        try {
            //const response = await fetch('http://127.0.0.1:8000/listening/audio', {
            const exam = languageLevel == "TOEFL" ? "toefl" : "JLPT" ? "jlpt" : "";
            const url = "http://194.120.24.48:80/listening/audio" + exam;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: longText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            console.log('Audio URL:', audioUrl);  // Добавлен лог для проверки URL
            setAudio(audioUrl);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (longText) {
            fetchAudio();
        }
    }, [longText]);

    const handleLanguageLevelChange = (e) => {
        setLanguageLevel(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchQuestions();
        setShowStartTest(false);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedOption === questionsData[currentQuestion].correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
            setAnswerFeedback('Правильно!');
        } else {
            setAnswerFeedback('Неправильно!');
        }
        setShowAnswerFeedback(true);
        setShowIntermediateScreen(true);
    };

    const handleProceedToNextQuestion = () => {
        if (currentQuestion + 1 >= questionsData.length) {
            setShowScore(true);
            return;
        }
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
        setShowAnswerFeedback(false);
        setShowIntermediateScreen(false);
        setShowExplanation(false);
    };

    const handleToggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    const handleNewTest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setShowStartTest(true);
        setShowAnswerFeedback(false);
        setShowIntermediateScreen(false);
        setShowExplanation(false);
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
                {showStartTest ? (
                    <div className="question-container">
                        <div className="start-test">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <span>Экзамен :  </span>
                                    <select className="language-level" value={languageLevel} onChange={handleLanguageLevelChange}>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="JLPT">JLPT</option>
                                    </select>
                                </div>
                                <button className="save-button" type="submit">Начать тест</button>
                            </form>
                        </div>
                    </div>
                ) : !showScore ? (
                    <>
                        <div className="audio-listening-container">
                            <div className="center-audio-player">
                            {loading && <p>Loading audio...</p>}
                            {audio && !loading && (
                                <ReactAudioPlayer
                                    src={audio}
                                    controls
                                />
                            )}
                            </div>
                        </div>
                        <div className="question-container">
                            {questionsData ? (
                                <>
                                    <h2 className="question-name">{questionsData[currentQuestion].question}</h2>
                                    <ul className="options-list">
                                        {questionsData[currentQuestion].options.map((option, index) => (
                                            <li key={index} className={`option ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionSelect(option)}>{option}</li>
                                        ))}
                                    </ul>
                                    <div className="check-answer">
                                        <button className="button" onClick={handleNextQuestion}>Проверить ответ</button>
                                        {showAnswerFeedback && (
                                            <div className="answer-feedback">
                                                <p>{answerFeedback}</p>
                                            </div>
                                        )}
                                    </div>
                                    {showIntermediateScreen && (
                                        <div className="intermediate-screen">
                                            <div className="explanation-icon" onClick={handleToggleExplanation}>Почему так 
                                            <img className="explanation-pic" src={require('../pics/question2.png')} />
                                            </div>
                                            {showExplanation && (
                                                <div className="explanation">
                                                    <p>{questionsData[currentQuestion].explanation}</p>
                                                </div>
                                            )}
                                            <button className="button" onClick={handleProceedToNextQuestion}>Далее</button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div >Загрузка вопросов...</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="question-container-result">
                        <h2>Тест завершен!</h2>
                        <p>Ваш балл: {score} из {questionsData.length}</p>
                        <button className="new-test" onClick={handleNewTest}>Сгенерировать новый тест</button>
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="popup">
                    <span className="close" onClick={() => setIsOpen(!isOpen)}>&times;</span>
                    <button className="logout" onClick={() => logOut()}> Logout</button>
                </div>
            )}
        </div>
    );
};