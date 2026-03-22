import type { AuthTokens } from '../../domain/models/AuthTokens'

const ACCESS_TOKEN_KEY = 'gv_access_token'
const REFRESH_TOKEN_KEY = 'gv_refresh_token'

export class TokenStorage {
  private constructor() {}

  static getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

  static save(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
  }

  static clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  static hasTokens(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY)
  }
}
