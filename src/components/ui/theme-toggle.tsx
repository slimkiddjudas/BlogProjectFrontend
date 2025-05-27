// filepath: c:\Users\umut\Documents\Projects\BlogProjectFrontend\src\components\ui\theme-toggle.tsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={theme === 'dark' ? 'ghost' : 'default'}
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:scale-110"
      aria-label={theme === 'light' ? 'Dark mode\'a geç' : 'Light mode\'a geç'}
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`h-4 w-4 absolute transition-all duration-500 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`} 
        />
        <Moon 
          className={`h-4 w-4 absolute transition-all duration-500 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
    </Button>
  );
};