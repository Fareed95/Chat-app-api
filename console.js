// 1. Establish WebSocket connection
const roomName = "chat_room_name"; // Replace with your actual room name
const username = "your_username_here"; // Replace with your actual username

// Connect to the WebSocket server
const wsUrl = `ws://127.0.0.1:8000/ws/chat/${roomName}/`; // Replace with your server address if necessary
const chatsocket1 = new WebSocket(wsUrl);

// 2. Handle WebSocket events

// When WebSocket is connected
chatsocket1.onopen = () => {
  console.log("Connected to WebSocket");

  // You can send a message right after the connection is established
  sendMessage("Hello, everyone!");
};

// When a message is received from the server
chatsocket1.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // Display the received message from the server
  console.log("Received message:", data);

  // Assuming the message contains 'username', 'message', and 'timestamp'
  const { username, message, timestamp } = data;
  console.log(`${username} at ${timestamp}: ${message}`);
};

// When WebSocket connection is closed
chatsocket1.onclose = () => {
  console.log("WebSocket connection closed");
};

// 3. Function to send messages to WebSocket server
function sendMessage(messageContent) {
  const messageData = {
    username: username, // The username sending the message
    message: messageContent // The actual message
  };

  // Send the message to WebSocket server
  chatsocket1.send(JSON.stringify(messageData));
  console.log("Message sent:", messageData);
}

// 4. Simulate receiving a message after some delay (just for testing)
setTimeout(() => {
  // Simulating a message from the server
  const simulatedServerMessage = {
    username: "server", // Example username from the server
    message: "This is a test message",
    timestamp: new Date().toISOString() // Simulate the timestamp
  };

  // Send this simulated message as if it came from the server
  chatsocket1.onmessage({
    data: JSON.stringify(simulatedServerMessage)
  });
}, 3000);

// 5. Optionally, simulate a user sending another message after some time
setTimeout(() => {
  sendMessage("This is a second test message.");
}, 5000);
