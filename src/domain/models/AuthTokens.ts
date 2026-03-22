export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}
