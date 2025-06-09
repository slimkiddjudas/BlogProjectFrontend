import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  Tag, 
  Loader2, 
  Plus,
  Image
} from 'lucide-react';
import WriterLayout from '../../components/WriterLayout';
import { useAuth } from '../../contexts/auth-context';
import { WriterPostService } from '../../services/writerPostService';
import type { WriterPost } from '../../services/writerPostService';

const WriterPostsPage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<WriterPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDeletePost = async (id: number, title: string) => {
    if (window.confirm(`"${title}" başlıklı yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
      try {
        await WriterPostService.deletePost(id);
        await fetchUserPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Yazı silinirken bir hata oluştu.');
      }
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: posts.length,
    totalViews: posts.reduce((sum, p) => sum + (p.viewCount || 0), 0),
  };

  const getImageUrl = (imageUrl: string) => {
    const fileName = imageUrl.split('\\').pop() || imageUrl.split('/').pop() || '';
    return `http://localhost:3000/static/images/${fileName}`;
  };

  if (loading) {
    return (
      <WriterLayout>
        <div className="flex items-center justify-center min-h-64 p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Yazılar yükleniyor...</span>
        </div>
      </WriterLayout>
    );
  }

  return (
    <WriterLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Yazılarım</h1>
            <p className="text-muted-foreground mt-1">Blog yazılarını düzenle ve yönet</p>
          </div>
          <Link 
            to="/writer/posts/new"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yeni Yazı Ekle
          </Link>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Yazı</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Edit2 className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Görüntülenme</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Yazı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Post Image */}
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={getImageUrl(post.image)} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.category?.name || 'Genel'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.viewCount || 0} görüntülenme
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                      {post.image && (
                        <div className="flex items-center gap-1">
                          <Image className="w-4 h-4" />
                          Resim var
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/writer/posts/${post.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {post.content && (
                  <div className="text-sm text-muted-foreground line-clamp-3">
                    {post.content.substring(0, 200)}...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Edit2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Arama kriterlerinize uygun yazı bulunamadı.' : 'Henüz yazın bulunmuyor.'}
            </p>
            {!searchTerm && (
              <Link
                to="/writer/posts/new"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                İlk Yazını Oluştur
              </Link>
            )}
          </div>
        )}
      </div>
    </WriterLayout>
  );
};

export default WriterPostsPage;
