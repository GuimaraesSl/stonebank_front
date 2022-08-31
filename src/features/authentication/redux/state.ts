import { User } from './models/user'
import { UserFirstAccessForm } from './models/userFirstAccessForm'
import { ResetPasswordForm } from './models/resetPasswordForm'

export interface AuthState {
  token?: string
  user?: User
  loading: boolean
  errorMessage?: string
  userFirstAccessForm?: UserFirstAccessForm
  resetPasswordForm?: ResetPasswordForm
  phoneNumber?: string
}

export class UnauthenticatedState implements AuthState {
  token?: string
  user?: User
  loading: boolean = false
  errorMessage?: string
  phoneNumber?: string
}

export class LoadingAuthState implements AuthState {
  token?: string
  user?: User | undefined
  loading: boolean = true
  errorMessage?: string
}

export class SuccessAuthState implements AuthState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public token: string | undefined,
    public user: User | undefined,
  ) {}
}

export class ErrorAuthState implements AuthState {
  token?: string
  user?: User
  loading: boolean = false

  constructor(public errorMessage: string) {}
}

export class ChangePasswordLoadingState implements AuthState {
  errorMessage?: string | undefined
  loading: boolean = true

  constructor(
    public userFirstAccessForm: UserFirstAccessForm | undefined,
    public user: User | undefined,
    public token: string | undefined,
  ) {}
}

export class ChangePasswordState implements AuthState {
  errorMessage?: string | undefined
  loading: boolean = false

  constructor(
    public userFirstAccessForm: UserFirstAccessForm | undefined,
    public user: User | undefined,
    public token: string | undefined,
  ) {}
}

export class ChangePasswordSuccessState implements AuthState {
  errorMessage?: string | undefined
  loading: boolean = false

  constructor(
    public userFirstAccessForm: UserFirstAccessForm | undefined,
    public user: User | undefined,
    public token: string | undefined,
  ) {}
}

export class ChangePasswordErrorState implements AuthState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public user: User | undefined,
    public token: string | undefined,
  ) {}
}

export class ResetPasswordLoadingState implements AuthState {
  loading: boolean = true
  errorMessage?: string

  constructor(public resetPasswordForm: ResetPasswordForm | undefined) {}
}
export class SuccessResetPasswordState implements AuthState {
  loading: boolean = false
  errorMessage?: string

  constructor(public resetPasswordForm: ResetPasswordForm) {}
}

export class ErrorRecoverState implements AuthState {
  user?: User
  loading: boolean = false

  constructor(public errorMessage: string) {}
}

export class UpdateTermsLoadingState implements AuthState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public token: string | undefined,
    public user: User | undefined,
  ) {}
}
export class UpdateTermsSuccessState implements AuthState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public token: string | undefined,
    public user: User | undefined,
  ) {}
}

export class UpdateTermsFailState implements AuthState {
  user?: User
  loading: boolean = false

  constructor(public errorMessage: string) {}
}
