import { api } from '../lib/api';
import { CsrfService } from './csrfService';

export interface AdminGalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryItemRequest {
  title: string;
  description?: string;
  image: File;
}

export class AdminGalleryService {
  static async getAllGalleryItems(): Promise<AdminGalleryItem[]> {
    try {
      const response = await api.get('/gallery');
      return response.data;
    } catch (error) {
      console.error('Get gallery items error:', error);
      throw new Error('Galeri öğeleri getirilemedi');
    }
  }
  static async createGalleryItem(galleryData: CreateGalleryItemRequest): Promise<AdminGalleryItem> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const formData = new FormData();
      formData.append('title', galleryData.title);
      if (galleryData.description) {
        formData.append('description', galleryData.description);
      }
      formData.append('image', galleryData.image);

      const response = await api.post('/gallery', formData, {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.galleryItem;
    } catch (error) {
      console.error('Create gallery item error:', error);
      throw new Error('Galeri öğesi oluşturulamadı');
    }
  }

  static async deleteGalleryItem(id: number): Promise<void> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      await api.delete(`/gallery/${id}`, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
    } catch (error) {
      console.error('Delete gallery item error:', error);
      throw new Error('Galeri öğesi silinemedi');
    }
  }
}
