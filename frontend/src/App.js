import React from 'react';
import {BrowserRouter as Router, Routes, Navigate, Route, redirect} from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { HomePage } from './pages/Home';
import { ChatPage } from './pages/Chat';
import { TestsPage } from './pages/Tests';
import { ListeningPage } from './pages/Listening';
import { ReadingPage } from './pages/Reading';
import { WritingPage } from './pages/Writing';
import { SpeakingPage } from './pages/Speaking';

var TestPoints=0

function App() {
  //const {token, login, logout, userId} = useAuth()
  const isAuthentificated = true
  if (isAuthentificated) {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/writing" element={<WritingPage />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>   
  );
}

export default App;

//<Route path="/tests" element={<TestsPage />} />
//<Route path="/speaking" element={<SpeakingPage />} />