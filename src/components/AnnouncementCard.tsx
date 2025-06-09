import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import type { Announcement } from '../types/index';

interface AnnouncementCardProps {
  announcement: Announcement;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  variant = 'horizontal',
  className = '' 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/announcements/${announcement.slug}`}
        className={`group block min-w-[320px] max-w-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] ${className}`}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-300 line-clamp-2">
            {announcement.title}
          </h3>
          <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
        </div>
        
        <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {truncateContent(announcement.content)}
        </p>
        
        <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formatDate(announcement.createdAt)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/announcements/${announcement.slug}`}
      className={`group block bg-card hover:bg-accent/50 rounded-xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {announcement.title}
        </h3>
        <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4">
        {truncateContent(announcement.content, 200)}
      </p>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{formatDate(announcement.createdAt)}</span>
      </div>
    </Link>
  );
};

export default AnnouncementCard;
