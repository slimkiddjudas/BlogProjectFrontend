import { api } from '../lib/api';
import { CsrfService } from './csrfService';
import type { Announcement } from '../types';

export interface AdminAnnouncement extends Announcement {
  views?: number;
}

export interface AdminAnnouncementsResponse {
  totalAnnouncements: number;
  announcements: AdminAnnouncement[];
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
}

export class AdminAnnouncementService {
  static async getAllAnnouncements(page: number = 1, limit: number = 10): Promise<AdminAnnouncementsResponse> {
    try {
      const response = await api.get(`/announcements?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get announcements error:', error);
      throw new Error('Duyurular getirilemedi');
    }
  }

  static async getAnnouncementById(id: number): Promise<AdminAnnouncement> {
    try {
      const response = await api.get(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get announcement error:', error);
      throw new Error('Duyuru getirilemedi');
    }
  }
  static async createAnnouncement(announcementData: CreateAnnouncementRequest): Promise<AdminAnnouncement> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.post('/announcements', announcementData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data.announcement;
    } catch (error) {
      console.error('Create announcement error:', error);
      throw new Error('Duyuru oluşturulamadı');
    }
  }
  static async updateAnnouncement(id: number, announcementData: UpdateAnnouncementRequest): Promise<AdminAnnouncement> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.put(`/announcements/${id}`, announcementData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data.announcement;
    } catch (error) {
      console.error('Update announcement error:', error);
      throw new Error('Duyuru güncellenemedi');
    }
  }
  static async deleteAnnouncement(id: number): Promise<void> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      await api.delete(`/announcements/${id}`, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
    } catch (error) {
      console.error('Delete announcement error:', error);
      throw new Error('Duyuru silinemedi');
    }
  }
}
