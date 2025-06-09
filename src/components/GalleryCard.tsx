import React, { useState, useEffect } from 'react';
import { Calendar, Eye, X } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { getGalleryImageUrl } from '@/utils/postUtils';
import type { GalleryItem } from '@/types';

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-background/80 backdrop-blur-sm"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={getGalleryImageUrl(item.imageUrl)}
          alt={item.title}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          fallbackIcon={<Eye className="h-12 w-12" />}
        />
        
        {/* Overlay with gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Content overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}>
          <h3 className="font-bold text-lg mb-1 truncate">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-white/80 line-clamp-2 mb-2">
              {item.description}
            </p>
          )}
          <div className="flex items-center text-xs text-white/70">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{format(new Date(item.createdAt), 'dd MMM yyyy')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Modal component for fullscreen view
interface GalleryModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          aria-label="Kapat"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Image */}
        <div className="relative max-w-full max-h-full">
          <img
            src={getGalleryImageUrl(item.imageUrl)}
            alt={item.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          
          {/* Info panel */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            {item.description && (
              <p className="text-white/80 mb-2">{item.description}</p>
            )}
            <div className="flex items-center text-sm text-white/70">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{format(new Date(item.createdAt), 'dd MMMM yyyy')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
