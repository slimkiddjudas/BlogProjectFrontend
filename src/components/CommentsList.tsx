import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { CommentService } from '@/services/commentService';
import type { Comment } from '@/types';

interface CommentsListProps {
  postId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  const fetchComments = async () => {
    try {
      setError(null);
      const fetchedComments = await CommentService.getCommentsByPostId(postId);
      setComments(fetchedComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err instanceof Error ? err.message : 'Yorumlar yüklenemedi');
    }
  };
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedComments = await CommentService.getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError(err instanceof Error ? err.message : 'Yorumlar yüklenemedi');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);
  const handleCommentAdded = () => {
    fetchComments();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Yorumlar yükleniyor...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

      {/* Comments Section */}
      <Card>        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Yorumlar ({comments.length})</span>
          </CardTitle>
        </CardHeader>        <CardContent className="p-0">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-2">Henüz yorum yok</p>
              <p className="text-sm text-muted-foreground">
                Bu yazı hakkında ilk yorumu sen yap!
              </p>
            </div>
          ) : (
            <div className="p-6 pt-0">
              {error && (
                <div className="mb-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-0">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsList;
