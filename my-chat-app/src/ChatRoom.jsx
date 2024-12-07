import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
    const { roomName } = useParams(); // url se chat room ka name lena ........ it can be infinite rooms .. 
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const webSocketRef = useRef(null);

    useEffect(() => {
        const user = prompt("Enter your username:"); //prompt
        setUsername(user || 'Anonymous');

        const ws = new WebSocket(`wss://chat-app-api-qupx.onrender.com/ws/chat/${roomName}/`);
        webSocketRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection opened");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message received:", data);

            if (data.type === 'chat_history') {
                //  receiving chat history
                setMessages(data.messages);
            } else {
                // receiving a single chat message
                setMessages((prev) => [...prev, data]);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => ws.close();
    }, [roomName]);

    const sendMessage = () => {
        if (message.trim() && webSocketRef.current) {
            const data = {
                username,
                message,
            };
            webSocketRef.current.send(JSON.stringify(data));
            setMessage('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Chat Room: {roomName}</h2>
            <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{msg.username}</strong> <em>({msg.timestamp})</em>: {msg.message}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ width: '80%' }}
                />
                <button onClick={sendMessage} style={{ width: '18%' }}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
