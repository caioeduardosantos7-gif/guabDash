import type { AuthRepository } from '../../domain/repositories/AuthRepository'
import type { LoginCredentials, ChangePasswordPayload } from '../../domain/models/AuthTokens'
import type { User, Company } from '../../domain/models/User'

export class AuthService {
  private repo: AuthRepository

  constructor(repo: AuthRepository) {
    this.repo = repo
  }

  login(credentials: LoginCredentials) {
    return this.repo.login(credentials)
  }

  refreshToken(token: string) {
    return this.repo.refreshToken(token)
  }

  getProfile() {
    return this.repo.getProfile()
  }

  updateProfile(data: { name: string; email: string; company: Company | null }) {
    return this.repo.updateProfile(data)
  }

  changePassword(payload: ChangePasswordPayload) {
    return this.repo.changePassword(payload)
  }
}
