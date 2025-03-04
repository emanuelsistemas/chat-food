import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <FaSun className="theme-icon-light" />
      <FaMoon className="theme-icon-dark" />
    </div>
  );
};

export default ThemeToggle;
