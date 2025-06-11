import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Megaphone, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAnnouncementBySlug } from '../hooks/useAnnouncements';
import { Button } from '../components/ui/button';

const AnnouncementDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { announcement, isLoading, error } = useAnnouncementBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-12">
              <div className="w-3/4 h-12 bg-muted rounded-lg mb-4 animate-pulse" />
              <div className="w-48 h-6 bg-muted rounded animate-pulse" />
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="w-full h-4 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Duyuru Bulunamadı</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'Aradığınız duyuru bulunamadı veya kaldırılmış olabilir.'}
            </p>
            <Link to="/announcements">
              <Button variant="default">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Duyurulara Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article */}
          <article className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 px-6 md:px-8 py-8 md:py-12 border-b border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Megaphone className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {announcement.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center text-muted-foreground text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <time dateTime={announcement.createdAt}>
                        {formatDate(announcement.createdAt)}
                      </time>
                    </div>
                    {announcement.updatedAt !== announcement.createdAt && (
                      <span className="mt-2 sm:mt-0 sm:ml-4">
                        (Güncellendi: {formatDate(announcement.updatedAt)})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 py-8 md:py-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-base md:text-lg">
                  {announcement.content}
                </div>
              </div>
            </div>

            {/* Footer with navigation hint */}
            <div className="px-6 md:px-8 py-6 bg-muted/20 border-t border-border">
              <Link 
                to="/announcements" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tüm duyuruları görüntüle
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
