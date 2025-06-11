import { api } from '../lib/api';
import { CsrfService } from './csrfService';

export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserRoleRequest {
  userId: number;
  newRole: string;
}

export interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export class AdminUserService {
  static async getAllUsers(): Promise<AdminUser[]> {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw new Error('Kullanıcılar getirilemedi');
    }
  }
  static async updateUserRole(userId: number, newRole: string): Promise<AdminUser> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.put('/auth/change-role', { userId, newRole }, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data.user;
    } catch (error) {
      console.error('Update user role error:', error);
      throw new Error('Kullanıcı rolü güncellenemedi');
    }
  }
  static async updateUserProfile(profileData: UpdateUserProfileRequest): Promise<AdminUser> {
    try {
      const csrfToken = await CsrfService.getCsrfToken();
      const response = await api.put('/auth/update-profile', profileData, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      return response.data.user;
    } catch (error) {
      console.error('Update user profile error:', error);
      throw new Error('Kullanıcı profili güncellenemedi');
    }
  }
}
