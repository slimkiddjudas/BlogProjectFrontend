import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const isFeature = variant === 'featured';
  const isCompact = variant === 'compact';

  if (isFeature) {
    return (
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover">
        <div className="relative">
          {post.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground transition-all duration-200 hover:scale-105">
              Öne Çıkan
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Avatar className="h-10 w-10 flex-none transition-all duration-200 hover:scale-110">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 justify-items-start min-w-0">
              <p className="text-sm font-medium text-foreground truncate transition-colors duration-200">
                {post.author.name}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(post.publishedAt, 'dd MMM yyyy')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} dk okuma</span>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 cursor-pointer">
            {post.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed transition-colors duration-200">
            {post.excerpt}
          </p>
        </CardHeader>

        <CardFooter className="pt-0">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs transition-all duration-200 hover:scale-105">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (isCompact) {
    return (
      <Card className="group hover:shadow-md transition-all duration-300 card-hover">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {post.imageUrl && (
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors duration-200 cursor-pointer line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                <span>{post.author.name}</span>
                <span>{format(post.publishedAt, 'dd MMM')}</span>
                <span>{post.readTime} dk</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover">
      {post.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-8 w-8 transition-all duration-200 hover:scale-110">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 justify-items-start min-w-0">
            <p className="text-sm font-medium text-foreground truncate transition-colors duration-200">
              {post.author.name}
            </p>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{format(post.publishedAt, 'dd MMM')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime} dk</span>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300 cursor-pointer">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 transition-colors duration-200">
          {post.excerpt}
        </p>
      </CardHeader>

      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs transition-all duration-200 hover:scale-105">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
