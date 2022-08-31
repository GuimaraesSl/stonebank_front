export interface LoginRequest {
  login: string
  password: string
  switchAlternateState?: boolean
  tokenAccess?: string
}
