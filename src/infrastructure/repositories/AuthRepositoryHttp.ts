import type { AuthRepository } from '../../domain/repositories/AuthRepository'
import type { AuthTokens, LoginCredentials, ChangePasswordPayload } from '../../domain/models/AuthTokens'
import type { User, Company } from '../../domain/models/User'
import type { HttpClient } from '../api/HttpClient'

export class AuthRepositoryHttp implements AuthRepository {
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  login(credentials: LoginCredentials): Promise<AuthTokens & { user: User }> {
    return this.http.post('/api/auth/login', credentials)
  }

  refreshToken(refreshToken: string): Promise<AuthTokens> {
    return this.http.post('/api/auth/refresh', { refreshToken })
  }

  getProfile(): Promise<User> {
    return this.http.get('/api/auth/profile')
  }

  updateProfile(data: { name: string; email: string; company: Company | null }): Promise<User> {
    return this.http.put('/api/auth/profile', data)
  }

  changePassword(payload: ChangePasswordPayload): Promise<void> {
    return this.http.post('/api/auth/change-password', payload)
  }
}
