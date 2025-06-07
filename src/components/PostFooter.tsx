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
    <Card className="mb-8 border-0 shadow-sm">
      <CardHeader className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {authorName}
              </h3>
              <p className="text-muted-foreground text-sm">
                Bu yazı {formatPostDate(post.createdAt)} tarihinde yayınlandı
              </p>
            </div>
          </div>
          
          <div className="text-left sm:text-right">
            <p className="text-sm text-muted-foreground">
              Son güncelleme: {formatPostDate(post.updatedAt)}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PostFooter;
