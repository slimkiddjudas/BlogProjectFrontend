import { api } from '@/lib/api';
import type { PostsResponse, PostDetailResponse } from '@/types';

export const postService = {
  // Get all posts
  getAllPosts: async (): Promise<PostsResponse> => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Get post by ID
  getPostById: async (id: number): Promise<PostDetailResponse> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  // Get post by slug (fallback to filtering all posts if backend doesn't support slug endpoint)
  getPostBySlug: async (slug: string): Promise<PostDetailResponse> => {
    try {
      // Try slug-based endpoint first
      const response = await api.get(`/posts/slug/${slug}`);
      return response.data;
    } catch {
      // Fallback: get all posts and filter by slug
      const allPostsResponse = await postService.getAllPosts();
      const foundPost = allPostsResponse.posts.find(post => post.slug === slug);
      
      if (!foundPost) {
        throw new Error('Post not found');
      }
      
      return { post: foundPost };
    }
  },
};
