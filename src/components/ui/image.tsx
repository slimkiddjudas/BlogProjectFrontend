import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackIcon?: React.ReactNode;
  containerClassName?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallbackIcon,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-muted-foreground",
        containerClassName
      )}>
        {fallbackIcon || <ImageIcon className="h-16 w-16" />}
      </div>
    );
  }

  return (
    <div className={cn("relative", containerClassName)}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-muted-foreground">
          <div className="animate-pulse">
            <ImageIcon className="h-16 w-16" />
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          imageLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};

export { Image };
