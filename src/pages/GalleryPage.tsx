import React, { useState, useEffect } from 'react';
import { Camera, Images, Loader2, AlertCircle, Search, Grid, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GalleryCard, { GalleryModal } from '@/components/GalleryCard';
import { useGallery } from '@/hooks/useGallery';
import { scrollToTop } from '@/utils/postUtils';
import type { GalleryItem } from '@/types';

const GalleryPage: React.FC = () => {
  const { items, loading, error } = useGallery();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCardClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Galeri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">Galeri Yüklenemedi</h2>
            <p className="text-muted-foreground text-center max-w-md">
              {error}
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Galeri
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fotoğraf koleksiyonumuzu keşfedin. Her bir görsel, özel anıları ve yaratıcı çalışmaları barındırıyor.
          </p>
        </div>

        {/* Stats and Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Images className="h-4 w-4 mr-2" />
              {filteredItems.length} Fotoğraf
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Fotoğraflarda ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'masonry' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('masonry')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Images className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz fotoğraf yok'}
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                {searchTerm 
                  ? `"${searchTerm}" araması için sonuç bulunamadı. Farklı bir terim deneyin.`
                  : 'Galeri henüz boş görünüyor. İlk fotoğrafların eklenmesini bekleyin.'
                }
              </p>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                  className="mt-4"
                >
                  Aramayı Temizle
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6"
          }>
            {filteredItems.map((item) => (
              <div key={item.id} className={viewMode === 'masonry' ? 'break-inside-avoid' : ''}>
                <GalleryCard
                  item={item}
                  onClick={() => handleCardClick(item)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Gallery Modal */}
        <GalleryModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default GalleryPage;
