import { useState, useEffect } from 'react';
import { postService } from '@/services/postService';
import type { Post } from '@/types';

interface UsePostResult {
  post: Post | null;
  loading: boolean;
  error: string | null;
}

export const usePost = (slug: string | undefined): UsePostResult => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Yazı bulunamadı');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await postService.getPostBySlug(slug);
        setPost(response.post);
      } catch (err) {
        console.error('Error fetching post:', err);
        
        // Fallback: try to find post by slug in all posts
        try {
          const allPostsResponse = await postService.getAllPosts();
          const foundPost = allPostsResponse.posts.find(p => p.slug === slug);
          
          if (foundPost) {
            setPost(foundPost);
          } else {
            throw new Error('Yazı bulunamadı');
          }
        } catch (fallbackErr) {
          console.error('Fallback error:', fallbackErr);
          setError('Yazı bulunamadı');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
