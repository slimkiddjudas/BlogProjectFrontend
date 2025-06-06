import React from 'react';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import './App.css';
import { useTheme } from './hooks/useTheme';

// Wrapper component for theme transition
const ThemeTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTransitioning } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isTransitioning ? 'theme-transitioning' : ''
    }`}>
      {children}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemeTransitionWrapper>
        <Header />
        <main className="flex-1">
          <HomePage />
        </main>
        <Footer />
      </ThemeTransitionWrapper>
    </ThemeProvider>
  );
}

export default App;
