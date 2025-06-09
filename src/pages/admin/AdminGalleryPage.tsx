import React, { useState, useEffect } from 'react';
import { Search, Upload, Eye, Trash2, Image, X, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { AdminGalleryService } from '../../services/adminGalleryService';
import type { AdminGalleryItem } from '../../services/adminGalleryService';

const AdminGalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AdminGalleryItem | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  
  // Upload form state
  const [newItem, setNewItem] = useState({
    title: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await AdminGalleryService.getAllGalleryItems();
      setGalleryItems(items);
    } catch (err) {
      setError('Galeri öğeleri yüklenirken bir hata oluştu.');
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Dosya boyut kontrolü (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Dosya boyutu 10MB\'dan küçük olmalıdır.');
        return;
      }
      
      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen sadece resim dosyası seçin.');
        return;
      }
      
      setSelectedFile(file);
      
      // Preview oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!newItem.title.trim() || !selectedFile) {
      alert('Başlık ve resim dosyası zorunludur.');
      return;
    }

    try {
      setUploadLoading(true);
      await AdminGalleryService.createGalleryItem({
        title: newItem.title,
        description: newItem.description || undefined,
        image: selectedFile
      });
      
      // Reset form
      setNewItem({ title: '', description: '' });
      setSelectedFile(null);
      setImagePreview(null);
      setShowUploadModal(false);
      
      // Refresh gallery
      await fetchGalleryItems();
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Resim yüklenirken bir hata oluştu.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu görseli silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await AdminGalleryService.deleteGalleryItem(id);
        await fetchGalleryItems();
      } catch (err) {
        console.error('Error deleting gallery item:', err);
        alert('Görsel silinirken bir hata oluştu.');
      }
    }
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setNewItem({ title: '', description: '' });
    setSelectedFile(null);
    setImagePreview(null);
  };

  const filteredItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getImageUrl = (imageUrl: string) => {
    const fileName = imageUrl.split('\\').pop() || imageUrl.split('/').pop() || '';
    return `http://localhost:3000/static/images/${fileName}`;
  };

  if (loading) {
    return (      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Galeri yükleniyor...</span>
        </div>
      </AdminLayout>
    );
  }

  return (    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Galeri Yönetimi</h1>
            <p className="text-muted-foreground mt-1">Medya dosyalarını ve görselleri yönet</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Görsel Yükle
          </button>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Görsel</p>
                <p className="text-2xl font-bold text-foreground">{galleryItems.length}</p>
              </div>
              <Image className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={fetchGalleryItems}
              className="mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Görsel ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Image */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt={item.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="p-1.5 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                    title="Görüntüle"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 bg-black/50 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'Arama kriterlerinize uygun görsel bulunamadı.' : 'Henüz görsel bulunmuyor.'}
            </p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Yeni Görsel Yükle</h2>
                <button
                  onClick={closeUploadModal}
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
                    placeholder="Görsel başlığını girin..."
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Açıklama
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Görsel açıklamasını girin..."
                    rows={3}
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resim *
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Resim yüklemek için tıklayın</span>
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG veya JPEG (MAX. 10MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileSelect}
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
                          onClick={() => {
                            setSelectedFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {selectedFile?.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeUploadModal}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploadLoading || !newItem.title.trim() || !selectedFile}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {uploadLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Yükle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
            <div className="relative max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
              
              <img
                src={getImageUrl(selectedImage.imageUrl)}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              <div className="p-4 bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-muted-foreground mb-2">{selectedImage.description}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Yüklenme: {new Date(selectedImage.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGalleryPage;
