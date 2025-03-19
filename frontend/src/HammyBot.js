import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from './Loader';
import ToggleSwitch from './ToggleSwitch'; 

const HammyBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Référence vers le dernier message du chatbot
  const messagesEndRef = useRef(null);

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { user: 'You', text: input };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: input });
      const botMessage = { user: 'HammyBot', text: response.data.bot };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { user: 'HammyBot', text: 'Error: Unable to get a response' }]);
    }

    setLoading(false);
    setInput('');
  };

  // Faire défiler la fenêtre vers le bas chaque fois qu'un message est ajouté
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container darkMode={darkMode}>
      <ToggleSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {loading && (
        <FullPageLoader>
          <Loader />
        </FullPageLoader>
      )}

      <ChatContainer>
        <ChatBox darkMode={darkMode}>
          {messages.map((msg, index) => (
            <Message key={index} user={msg.user} darkMode={darkMode}>
              <strong>{msg.user}: </strong> {msg.text}
            </Message>
          ))}
          {/* Ajoute la référence à la fin de la liste des messages */}
          <div ref={messagesEndRef} />
        </ChatBox>
        <InputContainer>
          <StyledInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            darkMode={darkMode}
          />
          <StyledSendButton onClick={sendMessage} darkMode={darkMode}>
            Send
          </StyledSendButton>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatContainer = styled.div``;

const ChatBox = styled.div`
  height: 350px;
  overflow-y: auto;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: ${({ darkMode }) => (darkMode ? "#444" : "#f9f9f9")};
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  text-align: ${({ user }) => (user === "You" ? "right" : "left")};
  background-color: ${({ user, darkMode }) => (user === "You" ? (darkMode ? "#555" : "#d1e7fd") : (darkMode ? "#666" : "#e1e1e1"))};
  color: ${({ user, darkMode }) => (user === "You" ? (darkMode ? "#e0e0e0" : "#000") : (darkMode ? "#e0e0e0" : "#333"))};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 75%;
  display: inline-block;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ccc")};
  background-color: ${({ darkMode }) => (darkMode ? "#555" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#e0e0e0" : "#000")};
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: #00d4ff;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }
`;

const StyledSendButton = styled.button`
  background-color: ${({ darkMode }) => (darkMode ? "#007BFF" : "#0056b3")};
  color: white;
  padding: 17px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#0056b3" : "#003d80")};
    transform: scale(1.05);
  }
`;

const FullPageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default HammyBot;
