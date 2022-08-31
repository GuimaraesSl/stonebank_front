import {
  FailUpdateUserInformationState,
  FailUserInformationState,
  InitialUserInformationState,
  LoadingUpdateUserInformationState,
  LoadingUserInformationState,
  SuccessUpdateUserInformationState,
  SuccessUserInformationState,
  UserInformationState,
} from './state'
import { UserInformationAction, UserInformationActions } from './actionTypes'

const initialState: UserInformationState = new InitialUserInformationState()

export const userInformationReducer = (
  state = initialState,
  action: UserInformationActions,
) => {
  switch (action.type) {
    case UserInformationAction.GET_USER_INFORMATION_START:
      return new LoadingUserInformationState(state.userInformation)

    case UserInformationAction.GET_USER_INFORMATION_SUCCESS:
      return new SuccessUserInformationState(action.payload)

    case UserInformationAction.GET_USER_INFORMATION_FAIL:
      return new FailUserInformationState(action.payload, state.userInformation)

    case UserInformationAction.UPDATE_USER_INFORMATION_START:
      return new LoadingUpdateUserInformationState(state.userInformation)

    case UserInformationAction.UPDATE_USER_INFORMATION_SUCCESS:
      return new SuccessUpdateUserInformationState(state.userInformation)

    case UserInformationAction.UPDATE_USER_INFORMATION_FAIL:
      return new FailUpdateUserInformationState(
        action.payload,
        state.userInformation,
      )

    case UserInformationAction.CLOSE_ALERT:
      return new SuccessUserInformationState(state.userInformation)

    default:
      return state
  }
}
