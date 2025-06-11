import {api} from '../lib/api';
import type { Announcement, AnnouncementsResponse } from '../types/index';

export const announcementService = {
  getAnnouncements: async (limit?: number): Promise<AnnouncementsResponse> => {
    const params = limit ? `?limit=${limit}` : '';
    const response = await api.get(`/announcements${params}`);
    return response.data;
  },

  getAnnouncementById: async (id: number): Promise<Announcement> => {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  },
  getAnnouncementBySlug: async (slug: string): Promise<Announcement> => {
    const response = await api.get(`/announcements/slug/${slug}`);
    return response.data;
  }
};
