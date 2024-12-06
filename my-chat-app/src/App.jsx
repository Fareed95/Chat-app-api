// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './Chat'; // Import your Chat component

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Chat App</h1>
        
        {/* Set up routing */}
        <Routes>
          <Route path="/chat/:room_name" element={<Chat />} />
          {/* You can add more routes here for other pages, such as a home page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
