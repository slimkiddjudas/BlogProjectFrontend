import { api } from '../lib/api';
import { CsrfService } from './csrfService';

export interface AdminPost {
  id: number;
  title: string;
  content: string;
  authorId?: number;
  userId?: number;
  categoryId?: number;
  image?: string;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPostsResponse {
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  posts: AdminPost[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: number;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  categoryId?: number;
}

export class AdminPostService {
  static async getAllPosts(page: number = 1, limit: number = 10, sort: string = 'newest'): Promise<AdminPostsResponse> {
    try {
      const response = await api.get(`/posts?page=${page}&limit=${limit}&sort=${sort}`);
      return response.data;
    } catch (error) {
      console.error('Get posts error:', error);
      throw new Error('Yazılar getirilemedi');
    }
  }

  static async getPostById(id: number): Promise<AdminPost> {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get post error:', error);
      throw new Error('Yazı getirilemedi');
    }
  }  static async createPost(postData: CreatePostRequest, imageFile?: File): Promise<AdminPost> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('categoryId', postData.categoryId.toString());
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      const response = await api.post('/posts', formData, {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create post error:', error);
      throw new Error('Yazı oluşturulamadı');
    }
  }

  static async updatePost(id: number, postData: UpdatePostRequest): Promise<AdminPost> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.put(`/posts/${id}`, postData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update post error:', error);
      throw new Error('Yazı güncellenemedi');
    }
  }

  static async deletePost(id: number): Promise<void> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      await api.delete(`/posts/${id}`, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
    } catch (error) {
      console.error('Delete post error:', error);
      throw new Error('Yazı silinemedi');
    }
  }

  static async searchPosts(query: string, page: number = 1, limit: number = 10): Promise<AdminPostsResponse> {
    try {
      const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Search posts error:', error);
      throw new Error('Yazı araması gerçekleştirilemedi');
    }
  }
}
