// ToggleSwitch.js
import React from 'react';
import styled from 'styled-components';

const ToggleSwitch = ({ darkMode, setDarkMode }) => {
  return (
    <SwitchContainer onClick={() => setDarkMode(!darkMode)}>
      <SwitchLabel>{darkMode ? '🌙' : '🌞'}</SwitchLabel>
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SwitchLabel = styled.span`
  font-size: 24px;
`;

export default ToggleSwitch;
