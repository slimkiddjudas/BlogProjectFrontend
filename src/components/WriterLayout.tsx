import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  FileText, 
  Plus,
  ChevronLeft,
  PenTool
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';

interface WriterLayoutProps {
  children: React.ReactNode;
}

const WriterLayout: React.FC<WriterLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/writer', icon: LayoutDashboard },
    { name: 'Yazılarım', href: '/writer/posts', icon: FileText },
    { name: 'Yeni Yazı', href: '/writer/posts/new', icon: Plus }
  ];

  const isActive = (href: string) => {
    if (href === '/writer') {
      return location.pathname === '/writer';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-lg">        {/* Header */}
        <div className="flex items-center px-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xs font-medium text-foreground">Yazar Paneli</h1>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Yazar</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Main Site */}
        <div className="absolute bottom-6 left-3 right-3">
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Ana Siteye Dön
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WriterLayout;
