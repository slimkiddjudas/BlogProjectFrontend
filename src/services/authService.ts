import { api } from '../lib/api';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types';

export class AuthService {  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch {
      throw new Error('Giriş yapılamadı');
    }
  }

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', credentials);
      return response.data;
    } catch {
      throw new Error('Kayıt olunamadı');
    }
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      throw new Error('Çıkış yapılamadı');
    }
  }static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      // Backend direkt user objesini döndürüyor, .user wrapper'ı yok
      return response.data;
    } catch {
      return null;
    }
  }  static async checkAuth(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user !== null;
    } catch {
      return false;
    }
  }

  static async updateProfile(data: { firstName: string; lastName: string; email: string }): Promise<{ user: User; message: string }> {
    try {
      const response = await api.put('/auth/update-profile', data);
      return response.data;
    } catch {
      throw new Error('Profil güncellenemedi');
    }
  }

  static async changePassword(data: { oldPassword: string; newPassword: string }): Promise<{ message: string }> {
    try {
      const response = await api.put('/auth/change-password', data);
      return response.data;
    } catch {
      throw new Error('Şifre değiştirilemedi');
    }
  }
}