import React from 'react';
import { Calendar, Clock, Eye, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAuthorInitials, getAuthorName, formatPostDate, calculateReadTime, formatViewCount } from '@/utils/postUtils';
import type { Post } from '@/types';

interface PostHeaderProps {
  post: Post;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const authorInitials = getAuthorInitials(post.writer);
  const authorName = getAuthorName(post.writer);
  const readTime = calculateReadTime(post.content);

  return (
    <header className="mb-8">
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Badge 
          variant="secondary" 
          className="transition-colors hover:bg-primary/10"
        >
          {post.category.name}
        </Badge>
      </div>
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
        {post.title}
      </h1>

      {/* Author and Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {authorInitials}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{authorName}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatPostDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} dakika okuma</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatViewCount(post.viewCount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
