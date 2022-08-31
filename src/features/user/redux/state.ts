import { UserInformation } from './models/UserInformation'

export interface UserInformationState {
  userInformation?: UserInformation
  loading: boolean
  errorMessage?: string
}

export class InitialUserInformationState implements UserInformationState {
  userInformation?: UserInformation
  loading: boolean = false
  errorMessage?: string
}

export class LoadingUserInformationState implements UserInformationState {
  loading: boolean = true
  errorMessage?: string | undefined

  constructor(public userInformation: UserInformation | undefined) {}
}

export class SuccessUserInformationState implements UserInformationState {
  loading: boolean = false
  errorMessage?: string

  constructor(public userInformation: UserInformation | undefined) {}
}

export class FailUserInformationState implements UserInformationState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public userInformation: UserInformation | undefined,
  ) {}
}

export class InitialUpdateUserInformationState implements UserInformationState {
  userInformation?: UserInformation
  loading: boolean = false
  errorMessage?: string
}

export class SuccessUpdateUserInformationState implements UserInformationState {
  loading: boolean = false
  errorMessage?: string

  constructor(public userInformation: UserInformation | undefined) {}
}

export class LoadingUpdateUserInformationState implements UserInformationState {
  loading: boolean = true
  errorMessage?: string | undefined

  constructor(public userInformation: UserInformation | undefined) {}
}

export class FailUpdateUserInformationState implements UserInformationState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public userInformation: UserInformation | undefined,
  ) {}
}
