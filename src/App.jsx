import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from "./components/Quiz";
import Login from "./components/Login"; 
import Leaderboard from "./components/LeaderBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;