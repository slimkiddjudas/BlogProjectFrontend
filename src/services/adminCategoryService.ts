import { api } from '../lib/api';
import { CsrfService } from './csrfService';

export interface AdminCategory {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}

export class AdminCategoryService {
  static async getAllCategories(): Promise<AdminCategory[]> {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Get categories error:', error);
      throw new Error('Kategoriler getirilemedi');
    }
  }

  static async getCategoryById(id: number): Promise<AdminCategory> {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get category error:', error);
      throw new Error('Kategori getirilemedi');
    }
  }
  static async createCategory(categoryData: CreateCategoryRequest): Promise<AdminCategory> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.post('/categories', categoryData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data.category;
    } catch (error) {
      console.error('Create category error:', error);
      throw new Error('Kategori oluşturulamadı');
    }
  }

  static async updateCategory(id: number, categoryData: UpdateCategoryRequest): Promise<AdminCategory> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.put(`/categories/${id}`, categoryData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data.category;
    } catch (error) {
      console.error('Update category error:', error);
      throw new Error('Kategori güncellenemedi');
    }
  }

  static async deleteCategory(id: number): Promise<void> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      await api.delete(`/categories/${id}`, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
    } catch (error) {
      console.error('Delete category error:', error);
      throw new Error('Kategori silinemedi');
    }
  }
}
