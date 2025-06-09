import { format } from 'date-fns';
import type { Writer } from '@/types';

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export const calculateReadTime = (content: string): number => {
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

/**
 * Generate initials from writer's name
 */
export const getAuthorInitials = (writer: Writer): string => {
  return `${writer.firstName.charAt(0)}${writer.lastName.charAt(0)}`.toUpperCase();
};

/**
 * Get full author name
 */
export const getAuthorName = (writer: Writer): string => {
  return `${writer.firstName} ${writer.lastName}`;
};

/**
 * Format date for display
 */
export const formatPostDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMMM yyyy');
};

/**
 * Format view count with proper pluralization
 */
export const formatViewCount = (count: number): string => {
  return `${count.toLocaleString('tr-TR')} görüntülenme`;
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Get image URL from image path
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // Extract filename from the path (remove backslashes and get the last part)
  const fileName = imagePath.split('\\').pop() || imagePath.split('/').pop() || '';
  
  return `http://localhost:3000/static/images/${fileName}`;
};
