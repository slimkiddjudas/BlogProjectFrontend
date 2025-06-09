import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Upload, Loader2, ArrowLeft } from 'lucide-react';
import WriterLayout from '../../components/WriterLayout';
import { WriterPostService } from '../../services/writerPostService';
import { AdminCategoryService } from '../../services/adminCategoryService';
import type { WriterPost, CreatePostRequest, UpdatePostRequest } from '../../services/writerPostService';
import type { AdminCategory } from '../../services/adminCategoryService';

const WriterPostForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [post, setPost] = useState<WriterPost | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: 1
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
    if (isEdit && id) {
      fetchPost(parseInt(id));
    }
  }, [isEdit, id]);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await AdminCategoryService.getAllCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0 && !isEdit) {
        setFormData(prev => ({ ...prev, categoryId: fetchedCategories[0].id }));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Kategoriler yüklenirken bir hata oluştu.');
    }
  };

  const fetchPost = async (postId: number) => {
    try {
      setLoading(true);
      const fetchedPost = await WriterPostService.getPostById(postId);
      setPost(fetchedPost);
      setFormData({
        title: fetchedPost.title,
        content: fetchedPost.content,
        categoryId: fetchedPost.categoryId
      });
      
      if (fetchedPost.image) {
        const fileName = fetchedPost.image.split('\\').pop() || fetchedPost.image.split('/').pop() || '';
        setImagePreview(`http://localhost:3000/static/images/${fileName}`);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Yazı yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Lütfen sadece resim dosyası seçin.');
        return;
      }
      
      setSelectedImage(file);
      
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Başlık ve içerik alanları zorunludur.');
      return;
    }

    try {
      setSaving(true);
      
      if (isEdit && post) {
        const updateData: UpdatePostRequest = {
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId
        };
        await WriterPostService.updatePost(post.id, updateData);
      } else {
        const createData: CreatePostRequest = {
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
          image: selectedImage || undefined
        };
        await WriterPostService.createPost(createData);
      }
      
      navigate('/writer/posts');
    } catch (err) {
      console.error('Error saving post:', err);
      alert(isEdit ? 'Yazı güncellenirken bir hata oluştu.' : 'Yazı oluşturulurken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/writer/posts');
  };

  if (loading) {
    return (
      <WriterLayout>
        <div className="flex items-center justify-center min-h-64 p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            {isEdit ? 'Yazı yükleniyor...' : 'Sayfa yükleniyor...'}
          </span>
        </div>
      </WriterLayout>
    );
  }

  if (error) {
    return (
      <WriterLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={() => navigate('/writer/posts')}
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Yazılarıma Dön
            </button>
          </div>
        </div>
      </WriterLayout>
    );
  }

  return (
    <WriterLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-foreground">
                {isEdit ? 'Yazı Düzenle' : 'Yeni Yazı Ekle'}
              </h1>
            </div>
            <p className="text-muted-foreground ml-14">
              {isEdit ? 'Mevcut yazını düzenle' : 'Yeni bir blog yazısı oluştur'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Başlık *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Yazı başlığını girin..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Kategori *
              </label>
              <select
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload - Only for new posts */}
            {!isEdit && (
              <div className="mb-6">
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
                      {selectedImage && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {selectedImage.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                İçerik *
              </label>
              <textarea
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Yazı içeriğini girin..."
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving || !formData.title.trim() || !formData.content.trim()}
              className="px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              <Save className="w-4 h-4" />
              {saving ? (isEdit ? 'Güncelleniyor...' : 'Kaydediliyor...') : (isEdit ? 'Güncelle' : 'Kaydet')}
            </button>
          </div>
        </form>
      </div>
    </WriterLayout>
  );
};

export default WriterPostForm;
