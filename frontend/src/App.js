import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="App">
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <Features />
    </div>
  );
}

export default App;