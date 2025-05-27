import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              CerkBlog
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              Ana Sayfa
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Kategoriler
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Hakkında
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              İletişim
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* <Button 
              variant={theme === 'dark' ? 'ghost' : 'default'}
              size="icon" 
              className="hidden sm:flex transition-all duration-200 hover:scale-105"
            >
              <Search className="h-4 w-4" />
            </Button> */}
            
            <ThemeToggle />
            
            <Button 
              variant={theme === 'dark' ? 'ghost' : 'default'}
              size="sm" 
              className="hidden sm:flex transition-all duration-200 hover:scale-105"
            >
              Abone Ol
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden transition-all duration-200 hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Menu className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-4 px-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Ana Sayfa
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Kategoriler
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Hakkında
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                İletişim
              </a>
              <div className="flex items-center space-x-2 pt-2">
                <Button 
                  variant={theme === 'dark' ? 'ghost' : 'default'}
                  size="icon"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <Button 
                  variant={theme === 'dark' ? 'ghost' : 'default'}
                  size="sm"
                >
                  Abone Ol
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
