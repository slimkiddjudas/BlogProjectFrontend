import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Eye, User } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { postService } from '@/services/postService';
import type { Post } from '@/types';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchPost = async () => {
      if (!slug) {
        setError('Yazı bulunamadı');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
          // Try to get post by slug first, fallback to getting all posts and filtering
        try {
          const response = await postService.getPostBySlug(slug);
          setPost(response.post);
        } catch {
          // If slug endpoint doesn't exist, get all posts and filter by slug
          const allPostsResponse = await postService.getAllPosts();
          const foundPost = allPostsResponse.posts.find(p => p.slug === slug);
          
          if (!foundPost) {
            throw new Error('Yazı bulunamadı');
          }
          
          setPost(foundPost);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Yazı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Hata</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <p 
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              Ana Sayfaya Dön
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const authorInitials = `${post.writer.firstName.charAt(0)}${post.writer.lastName.charAt(0)}`;
  const authorName = `${post.writer.firstName} ${post.writer.lastName}`;
  const readTime = calculateReadTime(post.content);
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="transition-all duration-200 hover:scale-105">
              {post.category.name}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold leading-tight mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12 transition-all duration-200 hover:scale-110">
              <AvatarFallback className="bg-primary/10 text-primary">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{authorName}</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.createdAt), 'dd MMMM yyyy')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} dakika okuma</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.viewCount} görüntülenme</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Image Placeholder */}
        <div className="aspect-video mb-8 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Clock className="h-24 w-24" />
          </div>
        </div>

        {/* Article Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary prose-code:text-primary prose-pre:bg-muted"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>

        {/* Article Footer */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{authorName}</h3>
                  <p className="text-muted-foreground">
                    Bu yazı {format(new Date(post.createdAt), 'dd MMMM yyyy')} tarihinde yayınlandı
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Son güncelleme: {format(new Date(post.updatedAt), 'dd MMMM yyyy')}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailPage;
