import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  FolderOpen, 
  Megaphone, 
  Images, 
  BarChart3, 
  Settings,
  Plus,
  TrendingUp,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { AdminAnnouncementService } from '../services/adminAnnouncementService';
import { AdminUserService } from '../services/adminUserService';
import { AdminPostService } from '../services/adminPostService';
import { AdminCategoryService } from '../services/adminCategoryService';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();  const [announcementStats, setAnnouncementStats] = useState({
    total: 0,
    loading: true
  });const [userStats, setUserStats] = useState({
    total: 0,
    loading: true
  });  const [postStats, setPostStats] = useState({
    total: 0,
    totalViews: 0,
    loading: true
  });
  const [categoryStats, setCategoryStats] = useState({
    total: 0,
    loading: true
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAnnouncementStats();
    fetchUserStats();
    fetchPostStats();
    fetchCategoryStats();
  }, []);
  const fetchAnnouncementStats = async () => {
    try {
      const response = await AdminAnnouncementService.getAllAnnouncements();
      setAnnouncementStats({
        total: response.announcements.length,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching announcement stats:', error);
      setAnnouncementStats(prev => ({ ...prev, loading: false }));
    }
  };
  const fetchUserStats = async () => {
    try {
      const users = await AdminUserService.getAllUsers();
      setUserStats({
        total: users.length,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      setUserStats(prev => ({ ...prev, loading: false }));
    }
  };
  const fetchPostStats = async () => {
    try {
      const response = await AdminPostService.getAllPosts(1, 1000); // Get all posts for count
      const totalViews = response.posts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
      setPostStats({
        total: response.totalPosts,
        totalViews: totalViews,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching post stats:', error);
      setPostStats(prev => ({ ...prev, loading: false }));
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const categories = await AdminCategoryService.getAllCategories();
      setCategoryStats({
        total: categories.length,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching category stats:', error);
      setCategoryStats(prev => ({ ...prev, loading: false }));
    }
  };

  const handleCreateAnnouncement = () => {
    navigate('/admin/announcements');
  };  const dashboardCards = [
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Tüm kullanıcıları görüntüle ve rollerini yönet',
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/users',
      stats: { 
        label: userStats.loading ? 'Yükleniyor...' : 'Toplam Kullanıcı', 
        value: userStats.loading ? '-' : userStats.total.toString()
      }
    },    {
      title: 'İçerik Yönetimi',
      description: 'Blog yazılarını düzenle, güncelle ve yönet',
      icon: FileText,
      color: 'bg-green-500',
      href: '/admin/posts',
      stats: { 
        label: postStats.loading ? 'Yükleniyor...' : 'Toplam Post', 
        value: postStats.loading ? '-' : postStats.total.toString(),
        subLabel: postStats.loading ? '' : `${postStats.totalViews.toLocaleString()} görüntülenme`
      }
    },
    {
      title: 'Kategori Yönetimi',
      description: 'Yeni kategoriler ekle ve mevcut kategorileri düzenle',
      icon: FolderOpen,
      color: 'bg-purple-500',
      href: '/admin/categories',
      stats: { 
        label: categoryStats.loading ? 'Yükleniyor...' : 'Toplam Kategori', 
        value: categoryStats.loading ? '-' : categoryStats.total.toString()
      }
    },    {
      title: 'Duyuru Yönetimi',
      description: 'Site duyurularını ekle, düzenle ve yönet',
      icon: Megaphone,
      color: 'bg-orange-500',
      href: '/admin/announcements',
      stats: { 
        label: announcementStats.loading ? 'Yükleniyor...' : 'Toplam Duyuru', 
        value: announcementStats.loading ? '-' : announcementStats.total.toString()
      }
    },
    {
      title: 'Galeri Yönetimi',
      description: 'Fotoğraf galerisi ve medya dosyalarını yönet',
      icon: Images,
      color: 'bg-pink-500',
      href: '/admin/gallery',
      stats: { label: 'Medya Dosyası', value: '89' }
    },
    {
      title: 'İstatistikler',
      description: 'Site trafiği ve performans verilerini görüntüle',
      icon: BarChart3,
      color: 'bg-indigo-500',
      href: '/admin/analytics',
      stats: { label: 'Günlük Ziyaret', value: '1.2K' }
    }
  ];
  const quickActions = [
    { title: 'Yeni Post Ekle', icon: Plus, href: '/admin/posts/new', color: 'bg-blue-500' },
    { title: 'Duyuru Yayınla', icon: Megaphone, action: handleCreateAnnouncement, color: 'bg-orange-500' },
    { title: 'Kategori Ekle', icon: FolderOpen, href: '/admin/categories/new', color: 'bg-purple-500' },
    { title: 'Medya Yükle', icon: Images, href: '/admin/gallery/upload', color: 'bg-pink-500' }
  ];  const recentStats = [
    { 
      label: 'Toplam Görüntülenme', 
      value: postStats.loading ? '-' : postStats.totalViews.toLocaleString(), 
      icon: Eye, 
      trend: '+12%', 
      trendColor: 'text-green-600' 
    },
    { 
      label: 'Toplam Kullanıcı', 
      value: userStats.loading ? '-' : userStats.total.toString(), 
      icon: Users, 
      trend: '+8%', 
      trendColor: 'text-green-600' 
    },
    { 
      label: 'Toplam İçerik', 
      value: postStats.loading ? '-' : postStats.total.toString(), 
      icon: FileText, 
      trend: '+3%', 
      trendColor: 'text-green-600' 
    },
    { 
      label: 'Toplam Duyuru', 
      value: announcementStats.loading ? '-' : announcementStats.total.toString(), 
      icon: Megaphone, 
      trend: '+5%', 
      trendColor: 'text-green-600' 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Hoş geldin, {user?.firstName} {user?.lastName}! CerkBlog yönetim paneline.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Admin Yetkileri</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {recentStats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`h-4 w-4 mr-1 ${stat.trendColor}`} />
                    <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              action.href ? (
                <Link
                  key={index}
                  to={action.href}
                  className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {action.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={action.action}
                  className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {action.title}
                    </span>
                  </div>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <Link
              key={index}
              to={card.href}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{card.stats.label}</p>
                    <p className="text-lg font-bold text-foreground">{card.stats.value}</p>
                    {card.stats.subLabel && (
                      <p className="text-xs text-muted-foreground mt-1">{card.stats.subLabel}</p>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
              
              <div className="px-6 py-4 bg-muted/30 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Yönetim Paneli</span>
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-muted/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Admin Panel Özellikleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">İçerik Yönetimi</h4>
              <ul className="space-y-1">
                <li>• Blog yazılarını düzenle ve yayınla</li>
                <li>• Kategorileri organize et</li>
                <li>• Medya dosyalarını yönet</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Kullanıcı Yönetimi</h4>
              <ul className="space-y-1">
                <li>• Kullanıcı rollerini düzenle</li>
                <li>• Yetkilendirme ayarları</li>
                <li>• Aktivite takibi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Sistem Yönetimi</h4>
              <ul className="space-y-1">
                <li>• Site duyurularını yönet</li>
                <li>• İstatistikleri görüntüle</li>
                <li>• Sistem ayarları</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
