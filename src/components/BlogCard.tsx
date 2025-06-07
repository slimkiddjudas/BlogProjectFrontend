import React from 'react';
import { Calendar, Clock, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Post } from '@/types';

interface BlogCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const navigate = useNavigate();
  const isFeature = variant === 'featured';
  const isCompact = variant === 'compact';

  const handleCardClick = () => {
    navigate(`/post/${post.slug}`);
  };

  // Calculate read time based on content length (average reading speed: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  // Generate excerpt from content
  const generateExcerpt = (content: string, length: number = 150) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  const authorInitials = `${post.writer.firstName.charAt(0)}${post.writer.lastName.charAt(0)}`;
  const authorName = `${post.writer.firstName} ${post.writer.lastName}`;
  const readTime = calculateReadTime(post.content);
  const excerpt = generateExcerpt(post.content);

  if (isFeature) {
    return (
      <Card 
        className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover content-transition cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Clock className="h-16 w-16" />
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground transition-all duration-200 hover:scale-105">
              Öne Çıkan
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Avatar className="h-10 w-10 flex-none transition-all duration-200 hover:scale-110">
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 justify-items-start min-w-0">
              <p className="text-sm font-medium text-foreground truncate transition-colors duration-200">
                {authorName}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(post.createdAt), 'dd MMM yyyy')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{readTime} dk okuma</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.viewCount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed transition-colors duration-200">
            {excerpt}
          </p>
        </CardHeader>

        <CardFooter className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs transition-all duration-200 hover:scale-105">
              {post.category.name}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (isCompact) {
    return (
      <Card 
        className="group hover:shadow-md transition-all duration-300 card-hover cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Clock className="h-8 w-8" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                <span>{authorName}</span>
                <span>{format(new Date(post.createdAt), 'dd MMM')}</span>
                <span>{readTime} dk</span>
                <span>{post.viewCount} görüntülenme</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover content-transition cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="w-full h-full flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
          <Clock className="h-16 w-16" />
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-8 w-8 transition-all duration-200 hover:scale-110">
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 justify-items-start min-w-0">
            <p className="text-sm font-medium text-foreground truncate transition-colors duration-200">
              {authorName}
            </p>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(post.createdAt), 'dd MMM')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{readTime} dk</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{post.viewCount}</span>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 transition-colors duration-200">
          {excerpt}
        </p>
      </CardHeader>

      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs transition-all duration-200 hover:scale-105">
            {post.category.name}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
