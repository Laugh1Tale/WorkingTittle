import React, { useState } from 'react';
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


const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  if (true) {
    return (
      <Router>
        <Routes>
        <Route path="/*" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/sign-in" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/sign-up" element={<SignUp setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/writing" element={<WritingPage />} />
        </Routes>
      </Router>
    );
  } else {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/sign-in" element={<SignIn setIsAuth={setIsAuth}/>} />
        <Route path="/sign-up" element={<SignUp setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>   
  );
}
}

export default App;

//<Route path="/tests" element={<TestsPage />} />
//<Route path="/speaking" element={<SpeakingPage />} />
//<Route path="/sign-in" element={<SignIn />} />
//<Route path="/sign-up" element={<SignUp />} />