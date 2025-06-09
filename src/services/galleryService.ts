import { api } from '@/lib/api';
import type { GalleryItem } from '@/types';

export const galleryService = {
  async getAllItems(): Promise<GalleryItem[]> {
    try {
      const response = await api.get<GalleryItem[]>('/gallery');
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw new Error('Galeri öğeleri alınırken hata oluştu');
    }
  },
};
