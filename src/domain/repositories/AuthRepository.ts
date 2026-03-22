import type { AuthTokens, LoginCredentials, ChangePasswordPayload } from '../models/AuthTokens'
import type { User, Company } from '../models/User'

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthTokens & { user: User }>
  refreshToken(refreshToken: string): Promise<AuthTokens>
  getProfile(): Promise<User>
  updateProfile(data: { name: string; email: string; company: Company | null }): Promise<User>
  changePassword(payload: ChangePasswordPayload): Promise<void>
}
