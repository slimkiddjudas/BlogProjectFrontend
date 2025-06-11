import { useState, useEffect } from 'react';
import { galleryService } from '@/services/galleryService';
import type { GalleryItem } from '@/types';

export const useGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await galleryService.getAllItems();
        setItems(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Galeri yüklenirken hata oluştu';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  return { items, loading, error };
};
