import { api } from '@/lib/api';
import { CsrfService } from './csrfService';
import type { Comment, CreateCommentRequest } from '@/types';

export class CommentService {
  /**
   * Get all comments for a specific post
   */
  static async getCommentsByPostId(postId: number): Promise<Comment[]> {
    try {
      const response = await api.get<Comment[]>(`/comments/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Yorumlar yüklenemedi');
    }
  }

  /**
   * Add a new comment to a post
   */
  static async addComment(commentData: CreateCommentRequest): Promise<Comment> {
    try {
      // Get CSRF token and add to headers
      const headers = await CsrfService.addCsrfHeader();
      
      const response = await api.post<Comment>('/comments', commentData, {
        headers,
      });
      
      return response.data;    } catch (error: unknown) {
      console.error('Error adding comment:', error);
      
      // If CSRF token is invalid, clear cache and retry once
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 403) {
          CsrfService.clearCachedToken();
          try {
            const headers = await CsrfService.addCsrfHeader();
            const response = await api.post<Comment>('/comments', commentData, {
              headers,
            });
            return response.data;
          } catch (retryError) {
            console.error('Error adding comment after retry:', retryError);
            throw new Error('Yorum eklenemedi. Lütfen tekrar deneyin.');
          }
        }
      }
      
      throw new Error('Yorum eklenemedi');
    }
  }
}
