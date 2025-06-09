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
      <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
        <CardContent className="p-8 md:p-12">
          <div 
            className="prose prose-xl max-w-none dark:prose-invert 
                       prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                       prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                       prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                       prose-strong:text-foreground prose-strong:font-bold
                       prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary 
                       prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic
                       prose-blockquote:bg-muted/50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                       prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm
                       prose-pre:bg-muted prose-pre:border prose-pre:rounded-xl prose-pre:p-6
                       prose-ul:text-foreground prose-ol:text-foreground prose-ul:space-y-2 prose-ol:space-y-2
                       prose-li:text-foreground prose-li:leading-relaxed prose-li:text-lg
                       prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                       first:prose-p:text-xl first:prose-p:font-medium first:prose-p:text-muted-foreground"
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
