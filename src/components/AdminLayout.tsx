import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users, 
  FileText, 
  FolderOpen, 
  Megaphone, 
  Images, 
  BarChart3,
  ChevronLeft
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentSection }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Kullanıcılar', href: '/admin/users', icon: Users },
    { name: 'İçerikler', href: '/admin/posts', icon: FileText },
    { name: 'Kategoriler', href: '/admin/categories', icon: FolderOpen },
    { name: 'Duyurular', href: '/admin/announcements', icon: Megaphone },
    { name: 'Galeri', href: '/admin/gallery', icon: Images },
    { name: 'İstatistikler', href: '/admin/analytics', icon: BarChart3 }
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="px-4 mb-6">
              <Link to="/" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                <span>Ana Siteye Dön</span>
              </Link>
            </div>
            
            <div className="px-4 mb-8">
              <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">CerkBlog Yönetimi</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className={`mr-3 h-4 w-4 transition-colors duration-200 ${
                      active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Mobile header */}
          <div className="lg:hidden bg-card border-b border-border px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ana Siteye Dön
              </Link>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="lg:hidden bg-card border-b border-border px-4 py-2">
            <div className="flex overflow-x-auto space-x-1 scrollbar-hide">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="mr-2 h-3 w-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
