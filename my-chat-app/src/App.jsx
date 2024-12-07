import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatRoom from './ChatRoom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/chat/:roomName" element={<ChatRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
