import { AuthAction, AuthActions } from "./actionTypes";
import {
  AuthState,
  ErrorAuthState,
  UnauthenticatedState,
  LoadingAuthState,
  SuccessAuthState,
  ChangePasswordSuccessState,
  ChangePasswordState,
  ChangePasswordErrorState,
  ChangePasswordLoadingState,
  ErrorRecoverState,
  SuccessResetPasswordState,
  ResetPasswordLoadingState,
  UpdateTermsLoadingState,
  UpdateTermsSuccessState,
  UpdateTermsFailState,
} from "./state";

const initialState: AuthState = new UnauthenticatedState();

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthAction.LOGIN_START:
    case AuthAction.SIGNOUT_START:
      return new LoadingAuthState();

    case AuthAction.LOGIN_SUCCESS:
      return new SuccessAuthState(action.payload.token, action.payload.user);

    case AuthAction.LOGIN_FAIL:
      return new ErrorAuthState(action.payload);

    case AuthAction.SIGNOUT_FINISH:
      return new UnauthenticatedState();

    case AuthAction.UPDATE_AUTH_DATA:
      if (!action.payload) return new SuccessAuthState(state.token, state.user);
      else return new SuccessAuthState(state.token, action.payload);

    case AuthAction.UPDATE_PASSWORD_DATA:
      return new ChangePasswordState(action.payload, state.user, state.token);

    case AuthAction.CHANGE_PASSWORD_START:
      return new ChangePasswordLoadingState(
        action.payload,
        state.user,
        state.token
      );

    case AuthAction.CHANGE_PASSWORD_SUCCESS:
      return new ChangePasswordSuccessState(
        action.payload,
        state.user,
        state.token
      );

    case AuthAction.CHANGE_PASSWORD_FAIL:
      return new ChangePasswordErrorState(
        action.payload,
        state.user,
        state.token
      );

    case AuthAction.RESET_PASSWORD_START:
      return new ResetPasswordLoadingState(state.resetPasswordForm);

    case AuthAction.RESET_PASSWORD_SUCESS:
      return new SuccessResetPasswordState(action.payload);

    case AuthAction.RESET_PASSWORD_FAIL:
      return new ErrorRecoverState(action.payload);

    case AuthAction.UPDATE_TERMS_START:
      return new UpdateTermsLoadingState(state.token, state.user);

    case AuthAction.UPDATE_TERMS_SUCCESS:
      return new UpdateTermsSuccessState(state.token, state.user);

    case AuthAction.UPDATE_TERMS_FAIL:
      return new UpdateTermsFailState(action.payload);

    default:
      return state;
  }
};
