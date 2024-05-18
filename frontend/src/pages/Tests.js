import { Link, Routes, Route } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import 'materialize-css';
import '../css/tests.css';
import axios from 'axios';

export const TestsPage = () => {
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
    const [languageLevel, setLanguageLevel] = useState('A0');
    const [longText, setLongText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [questionsData, setQuestionsData] = useState([]);

    const fetchQuestions = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/questions`, {
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

    return (
        <div className="test-page">
            <div className="sidebar">
                <div className="option1" onClick={() => window.location.href = '/home'}>
                    <div className="logo-sidebar">
                        <img className="logo-sidebar-img" src={require('../pics/logo.png')} />
                    </div>
                    <div className="app-name-sidebar">LL AI</div>
                </div>
                <button className="option" onClick={() => window.location.href = '/chats'}>Общение</button>
                <button className="option" onClick={() => window.location.href = '/tests'} style={{ border: '1px solid #bbbbbb' }}>Тесты</button>
                <div className="profile" onClick={() => setIsOpen(!isOpen)}>
                    <img src={require('../pics/profile-icon.png')} />
                </div>
            </div>
            <div className="test-container">
                {showStartTest ? (
                    <div className="question-container">
                        <div className="start-test">
                        <form onSubmit={handleSubmit}>
                                <div style={{display: "none"}}>
                                    <span>Уровень знания языка:</span>
                                    <select className="language-level" value={languageLevel} onChange={handleLanguageLevelChange}>
                                        <option value="A0">A0</option>
                                    </select>
                                </div>
                                <button className="save-button" type="submit">Начать тест</button>
                            </form>
                        </div>
                    </div>
                ) : !showScore ? (
                    <>
                        <div className="long-text-container">
                            <p>{longText}</p>
                        </div>
                        <div className="question-container">
                            {questionsData.length > 0 ? (
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
                                            <div className="explanation-icon" onClick={handleToggleExplanation}>Почему так?</div>
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
                                <div>Загрузка вопросов...</div>
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
                    <button className="logout"> Logout</button>
                </div>
            )}
        </div>
    );
};