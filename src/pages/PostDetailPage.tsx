import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import PostHeader from '@/components/PostHeader';
import PostContent from '@/components/PostContent';
import PostFooter from '@/components/PostFooter';
import CommentsList from '@/components/CommentsList';
import { PostLoading, PostError } from '@/components/PostStates';
import { usePost } from '@/hooks/usePost';
import { scrollToTop } from '@/utils/postUtils';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = usePost(slug);

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Handle loading state
  if (loading) {
    return <PostLoading />;
  }

  // Handle error state
  if (error || !post) {
    return <PostError error={error} />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-5xl">
        {/* Post Header with meta information */}
        <PostHeader post={post} />

        {/* Post Content */}
        <PostContent content={post.content} title={post.title} />

        {/* Post Footer with author info */}
        <PostFooter post={post} />

        {/* Comments Section */}
        <section className="mt-16" aria-label="Yorumlar Bölümü">
          <Separator className="mb-12" />
          <CommentsList postId={post.id} />
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage;
