import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Edit2, Trash2, Eye, Calendar, User, Tag, Loader2, Plus, X, Upload, Image } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { AdminPostService } from '../../services/adminPostService';
import { AdminCategoryService } from '../../services/adminCategoryService';
import type { AdminPost } from '../../services/adminPostService';
import type { AdminCategory } from '../../services/adminCategoryService';

// Backend response ile eşleşen interface
interface DisplayPost extends AdminPost {
  writer?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  category?: {
    id: number;
    name: string;
  };
}

interface NewPostData {
  title: string;
  content: string;
  categoryId: number;
}

const AdminPostsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);  const [isCreateModalOpen, setIsCreateModalOpen] = useState(searchParams.get('new') === 'true');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<DisplayPost | null>(null);  const [newPost, setNewPost] = useState<NewPostData>({
    title: '',
    content: '',
    categoryId: 1
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminPostService.getAllPosts(currentPage, 10);
      setPosts(response.posts);
      setTotalPages(response.totalPages);
      setTotalPosts(response.totalPosts);
    } catch (err) {
      setError('Yazılar yüklenirken bir hata oluştu.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchCategories = useCallback(async () => {
    try {
      const fetchedCategories = await AdminCategoryService.getAllCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setNewPost(prev => ({ ...prev, categoryId: fetchedCategories[0].id }));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [fetchPosts, fetchCategories]);

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await AdminPostService.deletePost(id);
        await fetchPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Yazı silinirken bir hata oluştu.');
      }
    }
  };  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Başlık ve içerik alanları zorunludur.');
      return;
    }

    try {
      setCreateLoading(true);
      await AdminPostService.createPost(newPost, selectedImage || undefined);
      setIsCreateModalOpen(false);
      setSearchParams({}); // URL parametresini temizle
      setNewPost({ 
        title: '',
        content: '', 
        categoryId: categories.length > 0 ? categories[0].id : 1 
      });
      setSelectedImage(null);
      setImagePreview(null);
      await fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Yazı oluşturulurken bir hata oluştu.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Dosya boyut kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır.');
        return;
      }
      
      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen sadece resim dosyası seçin.');
        return;
      }
      
      setSelectedImage(file);
      
      // Preview oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };  const closeModal = () => {
    setIsCreateModalOpen(false);
    setSearchParams({}); // URL parametresini temizle
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleEditPost = (post: DisplayPost) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!editingPost || !editingPost.title.trim() || !editingPost.content.trim()) {
      alert('Başlık ve içerik alanları zorunludur.');
      return;
    }

    try {
      setUpdateLoading(true);
      await AdminPostService.updatePost(editingPost.id, {
        title: editingPost.title,
        content: editingPost.content,
        categoryId: editingPost.categoryId
      });
      setIsEditModalOpen(false);
      setEditingPost(null);
      await fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Yazı güncellenirken bir hata oluştu.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingPost(null);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: totalPosts,
    totalViews: posts.reduce((sum, p) => sum + (p.viewCount || 0), 0),
  };
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Yazılar yükleniyor...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive">{error}</p>
          <button 
            onClick={fetchPosts}
            className="mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
          >
            Tekrar Dene
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">İçerik Yönetimi</h1>
            <p className="text-muted-foreground mt-1">Blog yazılarını düzenle ve yönet</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yeni Yazı Ekle
          </button>
        </div>

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
        </div>        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-lg overflow-hidden">              {/* Post Image */}
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={`http://localhost:3000/static/images/${post.image.split('\\').pop() || post.image.split('/').pop() || ''}`} 
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
                        <User className="w-4 h-4" />
                        {post.writer ? `${post.writer.firstName} ${post.writer.lastName}` : 'Admin User'}
                      </div>
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
                    <button
                      onClick={() => handleEditPost(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
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

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Edit2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'Arama kriterlerinize uygun yazı bulunamadı.' : 'Henüz yazı bulunmuyor.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50"
            >
              Önceki
            </button>
            <span className="text-sm text-muted-foreground">
              Sayfa {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/50"
            >
              Sonraki
            </button>
          </div>
        )}

        {/* Create Post Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Yeni Yazı Ekle</h2>                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Yazı başlığını girin..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                  <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kategori *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={newPost.categoryId}
                    onChange={(e) => setNewPost({ ...newPost, categoryId: parseInt(e.target.value) })}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resim (Opsiyonel)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Resim yüklemek için tıklayın</span>
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG veya JPEG (MAX. 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {selectedImage?.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    İçerik *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Yazı içeriğini girin..."
                    rows={8}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={createLoading || !newPost.title.trim() || !newPost.content.trim()}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Yazı Ekle
                </button>
              </div>
            </div>
          </div>        )}

        {/* Edit Post Modal */}
        {isEditModalOpen && editingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Yazıyı Düzenle</h2>
                <button
                  onClick={closeEditModal}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Yazı başlığını girin..."
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kategori *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={editingPost.categoryId || (categories.length > 0 ? categories[0].id : 1)}
                    onChange={(e) => setEditingPost({ ...editingPost, categoryId: parseInt(e.target.value) })}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    İçerik *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Yazı içeriğini girin..."
                    rows={8}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleUpdatePost}
                  disabled={updateLoading || !editingPost.title.trim() || !editingPost.content.trim()}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {updateLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPostsPage;
