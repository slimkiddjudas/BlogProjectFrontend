// filepath: c:\Users\umut\Documents\Projects\BlogProjectFrontend\src\components\ui\theme-toggle.tsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 border-2 ${
        theme === 'dark' 
          ? 'border-white/20 bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400' 
          : 'border-gray-200 bg-white/50 hover:bg-gray-50/50 text-gray-700'
      } ${isTransitioning ? 'pointer-events-none opacity-70' : ''}`}
      aria-label={theme === 'light' ? 'Dark mode\'a geç' : 'Light mode\'a geç'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun 
          className={`h-4 w-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`} 
        />
        <Moon 
          className={`h-4 w-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
    </Button>
  );
};