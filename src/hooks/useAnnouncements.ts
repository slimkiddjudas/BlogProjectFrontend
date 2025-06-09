import { useState, useEffect, useCallback } from 'react';
import type { Announcement } from '../types/index';
import { announcementService } from '../services/announcementService';

export const useAnnouncements = (limit?: number) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAnnouncements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await announcementService.getAnnouncements(limit);
      setAnnouncements(data.announcements);
      setTotalAnnouncements(data.totalAnnouncements);
    } catch (err: any) {
      setError(err.message || 'Duyurular yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);
  
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return {
    announcements,
    totalAnnouncements,
    isLoading,
    error,
    refetch: fetchAnnouncements
  };
};

export const useAnnouncementBySlug = (slug: string) => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(false);  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncement = useCallback(async () => {
    if (!slug) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await announcementService.getAnnouncementBySlug(slug);
      setAnnouncement(data);
    } catch (err: any) {
      setError(err.message || 'Duyuru yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);
  
  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);

  return {
    announcement,
    isLoading,
    error,
    refetch: fetchAnnouncement
  };
};
