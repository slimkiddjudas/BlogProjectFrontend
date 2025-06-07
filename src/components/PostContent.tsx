import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PostContentProps {
  content: string;
  title: string;
}

const PostContent: React.FC<PostContentProps> = ({ content, title }) => {
  // Clean and process content
  const processedContent = content
    .replace(/\n/g, '<br />')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <article className="mb-8">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert 
                       prose-headings:text-foreground prose-headings:font-semibold
                       prose-p:text-foreground prose-p:leading-relaxed
                       prose-strong:text-foreground prose-strong:font-semibold
                       prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary 
                       prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
                       prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
                       prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg
                       prose-ul:text-foreground prose-ol:text-foreground
                       prose-li:text-foreground prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: processedContent 
            }}
            aria-label={`${title} - Makale İçeriği`}
          />
        </CardContent>
      </Card>
    </article>
  );
};

export default PostContent;
