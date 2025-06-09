import React, { useEffect } from 'react';
import { Megaphone, Calendar, AlertCircle } from 'lucide-react';
import { useAnnouncements } from '../hooks/useAnnouncements';
import AnnouncementCard from '../components/AnnouncementCard';

const AnnouncementsPage: React.FC = () => {
  const { announcements, totalAnnouncements, isLoading, error } = useAnnouncements();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Skeleton */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
              <div className="w-48 h-8 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
              <div className="w-80 h-5 bg-muted rounded mx-auto animate-pulse" />
            </div>
            
            {/* Cards Skeleton */}
            <div className="grid gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-40 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Bir Hata Oluştu</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Megaphone className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Duyurular
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Site haberlerini ve güncellemelerini buradan takip edebilirsiniz.
            </p>
            
            {totalAnnouncements > 0 && (
              <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Toplam {totalAnnouncements} duyuru</span>
              </div>
            )}
          </div>

          {/* Content */}
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Henüz Duyuru Bulunmuyor
              </h2>
              <p className="text-muted-foreground">
                Yeni duyurular yayınlandığında burada görünecektir.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  variant="vertical"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
