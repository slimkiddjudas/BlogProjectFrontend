import React from 'react';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <HomePage />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
