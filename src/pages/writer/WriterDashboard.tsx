import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Eye, 
  Plus,
  TrendingUp,
  Calendar,
  PenTool
} from 'lucide-react';
import WriterLayout from '../../components/WriterLayout';
import { useAuth } from '../../contexts/auth-context';
import { WriterPostService } from '../../services/writerPostService';
import type { WriterPost } from '../../services/writerPostService';

const WriterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<WriterPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?.id) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const userPosts = await WriterPostService.getUserPosts(user.id);
      setPosts(userPosts);
    } catch (err) {
      setError('Yazılar yüklenirken bir hata oluştu.');
      console.error('Error fetching user posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + (post.viewCount || 0), 0),
    recentPosts: posts.slice(0, 5)
  };

  if (loading) {
    return (
      <WriterLayout>
        <div className="flex items-center justify-center min-h-64 p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Dashboard yükleniyor...</span>
        </div>
      </WriterLayout>
    );
  }

  return (
    <WriterLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Yazar Dashboard
              </h1>
              <p className="text-muted-foreground">
                Hoş geldin, {user?.firstName} {user?.lastName}! Yazı yönetim panelindesin.
              </p>
            </div>
            <Link
              to="/writer/posts/new"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Yeni Yazı Ekle
            </Link>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={fetchUserPosts}
              className="mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Toplam Yazı</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalPosts}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-sm text-green-600">Aktif</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Toplam Görüntülenme</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-sm text-green-600">+5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ortalama Görüntülenme</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalPosts > 0 ? Math.round(stats.totalViews / stats.totalPosts) : 0}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />
                  <span className="text-sm text-blue-600">Performans</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/writer/posts/new"
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Yeni Yazı Ekle
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Blog yazısı oluştur ve yayınla
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/writer/posts"
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Yazılarımı Yönet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Mevcut yazıları düzenle ve sil
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Son Yazılar</h2>
            <Link
              to="/writer/posts"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Tümünü Gör
            </Link>
          </div>

          {stats.recentPosts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.viewCount || 0} görüntülenme
                      </div>
                      {post.category && (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/writer/posts/${post.id}/edit`}
                    className="text-primary hover:text-primary/80 text-sm transition-colors"
                  >
                    Düzenle
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Henüz yazın bulunmuyor.</p>
              <Link
                to="/writer/posts/new"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                İlk Yazını Oluştur
              </Link>
            </div>
          )}
        </div>
      </div>
    </WriterLayout>
  );
};

export default WriterDashboard;
