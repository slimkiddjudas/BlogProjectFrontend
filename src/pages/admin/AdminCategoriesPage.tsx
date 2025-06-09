import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, FolderOpen, FileText, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { AdminCategoryService } from '../../services/adminCategoryService';
import type { AdminCategory } from '../../services/adminCategoryService';

interface CategoryData extends AdminCategory {
  postCount: number;
}

const AdminCategoriesPage: React.FC = () => {  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCategories = await AdminCategoryService.getAllCategories();
      // Transform API data to include postCount (default to 0 for now)
      const categoriesWithPostCount = fetchedCategories.map(cat => ({
        ...cat,
        postCount: 0 // TODO: Get actual post count from backend
      }));
      setCategories(categoriesWithPostCount);
    } catch (err) {
      setError('Kategoriler yüklenirken bir hata oluştu.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleAddCategory = async () => {
    if (newCategory.name.trim()) {
      try {
        const createdCategory = await AdminCategoryService.createCategory({
          name: newCategory.name,
          description: newCategory.description || undefined
        });
        const categoryWithPostCount = { ...createdCategory, postCount: 0 };
        setCategories([...categories, categoryWithPostCount]);
        setNewCategory({ name: '', description: '' });
        setIsAddModalOpen(false);
      } catch (err) {
        setError('Kategori eklenirken bir hata oluştu.');
        console.error('Error creating category:', err);
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await AdminCategoryService.deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      setError('Kategori silinirken bir hata oluştu.');
      console.error('Error deleting category:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Kategori Yönetimi</h1>
            <p className="text-muted-foreground">
              Blog kategorilerini düzenle ve yönet
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kategori
          </button>
        </div>

        {/* Search */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Kategori ara..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Kategori</p>
                <p className="text-2xl font-bold text-foreground">{categories.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam İçerik</p>
                <p className="text-2xl font-bold text-foreground">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ortalama İçerik</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(categories.reduce((sum, cat) => sum + cat.postCount, 0) / categories.length) || 0}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Kategoriler yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors duration-200">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>
              
              {category.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{category.postCount} içerik</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(category.updatedAt)}
                </span>              </div>
            </div>
          ))}
            </div>

            {!loading && filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Kategori bulunamadı</h3>
                <p className="text-muted-foreground">
                  Arama kriterlerinize uygun kategori bulunamadı.
                </p>
              </div>
            )}
          </>
        )}

        {/* Add Category Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-foreground mb-4">Yeni Kategori Ekle</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Kategori adını girin..."
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Açıklama
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Kategori açıklamasını girin..."
                    rows={3}
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors duration-200"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategory.name.trim()}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
