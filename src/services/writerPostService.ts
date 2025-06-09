import { api } from '../lib/api';
import { CsrfService } from './csrfService';

export interface WriterPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  slug: string;
  viewCount: number;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
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

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: number;
  image?: File;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
  categoryId: number;
}

export interface WriterPostsResponse {
  totalPosts: number;
  posts: WriterPost[];
}

export class WriterPostService {
  static async getUserPosts(userId: number): Promise<WriterPost[]> {
    try {
      const response = await api.get(`/posts/user/${userId}`);
      return response.data.posts;
    } catch (error) {
      console.error('Get user posts error:', error);
      throw new Error('Yazılar getirilemedi');
    }
  }

  static async createPost(postData: CreatePostRequest): Promise<WriterPost> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const formData = new FormData();
      
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('categoryId', postData.categoryId.toString());
      
      if (postData.image) {
        formData.append('image', postData.image);
      }

      const response = await api.post('/posts', formData, {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.post;
    } catch (error) {
      console.error('Create post error:', error);
      throw new Error('Yazı oluşturulamadı');
    }
  }

  static async updatePost(id: number, postData: UpdatePostRequest): Promise<WriterPost> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.put(`/posts/${id}`, postData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      
      return response.data.post;
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

  static async getPostById(id: number): Promise<WriterPost> {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data.post;
    } catch (error) {
      console.error('Get post by id error:', error);
      throw new Error('Yazı getirilemedi');
    }
  }
}
