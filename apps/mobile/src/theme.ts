import React, { createContext, useContext } from 'react';

export const theme = {
  colors: {
    background: '#050507',
    glass: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.2)',
    text: '#ffffff',
    accent: '#00ff99',
  },
};

const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);

export default theme;
