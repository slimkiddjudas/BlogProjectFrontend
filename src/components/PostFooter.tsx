import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { getAuthorInitials, getAuthorName, formatPostDate } from '@/utils/postUtils';
import type { Post } from '@/types';

interface PostFooterProps {
  post: Post;
}

const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  const authorInitials = getAuthorInitials(post.writer);
  const authorName = getAuthorName(post.writer);

  return (
    <Card className="mb-12 border-0 shadow-lg bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <CardHeader className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-lg">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">
                {authorName}
              </h3>
              <p className="text-muted-foreground">
                Bu yazı <span className="font-medium text-primary">{formatPostDate(post.createdAt)}</span> tarihinde yayınlandı
              </p>
            </div>
          </div>
          
          <div className="text-left sm:text-right bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              Son güncelleme
            </p>
            <p className="font-medium text-foreground">
              {formatPostDate(post.updatedAt)}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PostFooter;
