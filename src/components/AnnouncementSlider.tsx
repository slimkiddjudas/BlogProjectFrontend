import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Megaphone } from 'lucide-react';
import { useAnnouncements } from '../hooks/useAnnouncements';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementSlider: React.FC = () => {
  const { announcements, isLoading, error } = useAnnouncements(3);

  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Megaphone className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Duyurular</h2>
            </div>
          </div>          <div className="flex space-x-4 overflow-hidden">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="min-w-[320px] max-w-[320px] h-[180px] bg-muted/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || announcements.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Megaphone className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Duyurular</h2>
          </div>
            <Link
            to="/announcements"
            className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 group bg-blue-50 dark:bg-blue-950/30 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/50"
          >
            <span>Tümünü gör</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSlider;
