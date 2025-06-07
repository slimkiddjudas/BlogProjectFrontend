import { api } from '@/lib/api';
import type { CsrfTokenResponse } from '@/types';

export class CsrfService {
  private static cachedToken: string | null = null;
  private static tokenExpiry: number | null = null;

  /**
   * Get CSRF token - cache for 5 minutes to avoid unnecessary requests
   */
  static async getCsrfToken(): Promise<string> {
    const now = Date.now();
    
    // Return cached token if it's still valid (5 minutes)
    if (this.cachedToken && this.tokenExpiry && now < this.tokenExpiry) {
      return this.cachedToken;
    }

    try {
      const response = await api.get<CsrfTokenResponse>('/csrf-token');
      this.cachedToken = response.data.csrfToken;
      // Cache for 5 minutes
      this.tokenExpiry = now + (5 * 60 * 1000);
      return this.cachedToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      throw new Error('CSRF token alınamadı');
    }
  }

  /**
   * Clear cached token - useful when token becomes invalid
   */
  static clearCachedToken(): void {
    this.cachedToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Add CSRF token to request headers
   */
  static async addCsrfHeader(headers: Record<string, string> = {}): Promise<Record<string, string>> {
    const token = await this.getCsrfToken();
    return {
      ...headers,
      'csrf-token': token,
    };
  }
}
