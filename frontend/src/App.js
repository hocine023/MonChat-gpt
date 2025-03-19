import React, { useState } from "react";
import { motion } from "framer-motion";
import HammyBot from "./HammyBot"; 
import styled from "styled-components";

const App = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <Container>
      {!showChat ? (
        <WelcomeScreen>
          <motion.img
            src="/hamster.gif"
            alt="Hamster"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to HammyBot!
          </motion.h1>
          <motion.button
            onClick={() => setShowChat(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            Start Chat
          </motion.button>
        </WelcomeScreen>
      ) : (
        <HammyBot />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8b500, #ff6b6b);
`;

const WelcomeScreen = styled(motion.div)`
  text-align: center;
  color: white;
  img {
    width: 150px;
  }
  h1 {
    font-size: 2em;
    margin: 20px 0;
  }
  button {
    background: white;
    color: #ff6b6b;
    border: none;
    padding: 10px 20px;
    font-size: 1.2em;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export default App;
