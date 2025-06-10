import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from '../contexts/auth-context';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleGalleryClick = (e: React.MouseEvent) => {
    if (location.pathname === '/gallery') {
      e.preventDefault();
      scrollToTop();
    }
  };

  const handleAnnouncementsClick = (e: React.MouseEvent) => {
    if (location.pathname === '/announcements') {
      e.preventDefault();
      scrollToTop();
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-6">          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 flex-shrink-0 group"
            onClick={scrollToTop}
          >
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:rotate-3 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25">
              <span className="text-white font-bold text-xl drop-shadow-sm">C</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent truncate leading-tight transition-all duration-300 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-indigo-800">
                CerkBlog
              </h1>
            </div>
          </Link>{/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">            <Link
              to="/"
              className="text-sm font-medium transition-all duration-300 relative group text-muted-foreground hover:text-foreground"
              onClick={scrollToTop}
            >
              Ana Sayfa
              <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 w-0 group-hover:w-full" />
            </Link>            <Link
              to="/gallery"
              className="text-sm font-medium transition-all duration-300 relative group text-muted-foreground hover:text-foreground"
              onClick={handleGalleryClick}
            >
              Galeri
              <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 w-0 group-hover:w-full" />
            </Link>            <Link
              to="/announcements"
              className="text-sm font-medium transition-all duration-300 relative group text-muted-foreground hover:text-foreground"
              onClick={handleAnnouncementsClick}
            >
              Duyurular
              <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 w-0 group-hover:w-full" />
            </Link>

            <a
              href="#recent-posts"
              className="text-sm font-medium transition-all duration-300 relative group text-muted-foreground hover:text-foreground"
            >
              Makaleler
              <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 w-0 group-hover:w-full" />
            </a>

            <a
              href="#contact"
              className="text-sm font-medium transition-all duration-300 relative group text-muted-foreground hover:text-foreground"
            >
              İletişim
              <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 w-0 group-hover:w-full" />
            </a>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-sm font-medium transition-all duration-300 relative group text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              >
                Admin Panel
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            )}
            {(user?.role === 'writer' || user?.role === 'admin') && (
              <Link
                to="/writer"
                className="text-sm font-medium transition-all duration-300 relative group text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Yazar Panel
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            )}
          </nav>{/* Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <ThemeToggle />
              {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <div className="hidden sm:flex items-center space-x-3 px-3 py-2 rounded-lg bg-accent/50 border border-border/50 hover:bg-accent/70 transition-all duration-300 cursor-pointer group">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-semibold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors duration-300">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Profili görüntüle
                      </span>
                    </div>
                  </div>
                </Link>                <Button 
                  variant="default"
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden sm:flex items-center space-x-2 transition-all duration-300 hover:scale-105 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 shadow-sm hover:shadow-md"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Çıkış</span>
                </Button></div>) : (
              <Link to="/login">
                <Button 
                  variant="default"
                  size="sm" 
                  className="hidden sm:flex items-center space-x-2 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 border-0"
                >
                  <span>Giriş Yap</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}            <Button
              variant="default"
              size="icon"
              className="lg:hidden transition-all duration-300 hover:scale-110 hover:bg-accent/70 border border-transparent hover:border-border/50 rounded-lg shadow-sm hover:shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground transition-transform duration-200 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-5 w-5 text-foreground transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-6 px-4 bg-gradient-to-b from-background/50 to-background backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-6">              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4">                <Link
                  to="/"
                  className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToTop();
                  }}
                >
                  Ana Sayfa
                </Link>                <Link
                  to="/gallery"
                  className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  onClick={(e) => {
                    if (location.pathname === '/gallery') {
                      e.preventDefault();
                      scrollToTop();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Galeri
                </Link>                <Link
                  to="/announcements"
                  className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  onClick={(e) => {
                    if (location.pathname === '/announcements') {
                      e.preventDefault();
                      scrollToTop();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Duyurular
                </Link>

                <a
                  href="#recent-posts"
                  className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Makaleler
                </a>

                <a
                  href="#contact"
                  className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  İletişim
                </a>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}

                {(user?.role === 'writer' || user?.role === 'admin') && (
                  <Link
                    to="/writer"
                    className="text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Yazar Panel
                  </Link>
                )}
              </div>
                {isAuthenticated ? (
                <div className="flex flex-col space-y-4 pt-4 border-t border-border/30">
                  <Link to="/profile">
                    <div className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-accent/30 border border-border/30 hover:bg-accent/50 transition-all duration-300 cursor-pointer group">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-semibold">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors duration-300">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Profili görüntüle
                        </span>
                      </div>
                    </div>
                  </Link>                  <Button 
                    variant="default"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 justify-center border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/30">
                  <Link to="/login" className="w-full">
                    <Button 
                      variant="default"
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">                    <Button 
                      variant="default"
                      size="sm"
                      className="w-full border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      Kayıt Ol
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
