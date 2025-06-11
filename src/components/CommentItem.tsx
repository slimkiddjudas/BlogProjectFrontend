import React from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Comment } from '@/types';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const authorInitials = `${comment.writer.firstName.charAt(0)}${comment.writer.lastName.charAt(0)}`;
  const authorName = `${comment.writer.firstName} ${comment.writer.lastName}`;
  return (
    <div className="py-4 border-b border-border/50 last:border-b-0">
      <div className="flex space-x-3 items-start">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {authorInitials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-foreground text-sm">{authorName}</span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(comment.createdAt), 'dd MMM yyyy, HH:mm')}
            </span>
          </div>
          
          <div className="text-foreground text-sm whitespace-pre-wrap break-words">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
