import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { room_name } = useParams(); // Get the room name from the URL
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // Prompt for username on initial load
  useEffect(() => {
    if (!username) {
      const user = prompt('Enter your username:');
      setUsername(user || 'Anonymous');
    }
  }, [username]);

  // Set up WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${room_name}/`);
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    // Listen for incoming messages
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log('Message received:', messageData);  // Debugging message
      if (messageData.type === 'chat_history') {
        // If it's chat history, update the messages state
        setMessages(messageData.messages);
      } else if (messageData.type === 'chat_message') {
        // If it's a new message, update the message list
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [room_name]);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      // Send the message along with the username
      socket.send(JSON.stringify({ username, message: inputMessage }));
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room: {room_name}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong> <em>{msg.timestamp}</em>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
