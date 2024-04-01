import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { db } from "../firebase";

const socket = io('<http://localhost:3000>');

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Send a message
  const sendMessage = async () => {
    await db.collection('messages').add({
      text: messageText,
      timestamp: new Date()
    });
    setMessageText('');
  };

  // Receive messages
  useEffect(() => {
    const unsubscribe = db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      const messages = [];
      snapshot.forEach(doc => messages.push({ ...doc.data(), id: doc.id }));
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="chat-room">
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;