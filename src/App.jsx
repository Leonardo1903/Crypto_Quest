import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from "./components/Quiz";
import Login from "./components/Login"; // Assuming you have a Login component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        
      </Routes>
    </Router>
  );
}

export default App;