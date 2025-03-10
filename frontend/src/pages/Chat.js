import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTimes,
  faSmile,
  faPaperclip,
  faCheck,
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Chat.css';
import { chatResponses } from './chat-data'; // Import chatResponses from chat-data.js

const Chat = ({ isOpen, onClose, artworkId, sellerName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Simulating loading previous messages
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            sender: 'seller',
            text: `Hello! I'm ${sellerName}. How can I help you with the artwork today?`,
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            status: 'read'
          }
        ]);
      }, 1000);
    }
  }, [isOpen, sellerName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate seller response based on chatResponses
    setTimeout(() => {
      const sellerResponse = generateSellerResponse(inputMessage, artworkId);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'seller',
          text: sellerResponse,
          timestamp: new Date().toISOString(),
          status: 'sent'
        }
      ]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);
  };

  const generateSellerResponse = (userMessage, artworkId) => {
    const lowercaseMessage = userMessage.toLowerCase();

    // Find the response that matches the user message
    const responseObj = chatResponses.find(response => 
      response.keywords.some(keyword => lowercaseMessage.includes(keyword))
    );

    if (responseObj) {
      return responseObj.response(artworkId);
    } else {
      return `Thank you for your interest in this artwork. Please share any specific details or questions you have. I'm happy to assist you!`;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      <div className="chat-header">
        <h2>Chat with {sellerName}</h2>
        <button onClick={onClose} className="close-btn">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
            <div className="message-meta">
              <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
              {message.sender === 'user' && (
                <span className="status">
                  {message.status === 'sent' && <FontAwesomeIcon icon={faCheck} />}
                  {message.status === 'delivered' && <FontAwesomeIcon icon={faCheckDouble} />}
                  {message.status === 'read' && <FontAwesomeIcon icon={faCheckDouble} className="read" />}
                </span>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chat-input">
        <button type="button" className="emoji-btn">
          <FontAwesomeIcon icon={faSmile} />
        </button>
        <button type="button" className="attach-btn">
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="send-btn">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
