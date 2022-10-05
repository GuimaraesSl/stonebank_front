import { Dispatch } from "redux";
import {
  AuthAction,
  LoginFailAction,
  LoginStartAction,
  LoginSuccessAction,
  SignOutStartAction,
  SignOutFinishAction,
  UpdateAuthDataAction,
  UpdatePasswordDataAction,
  ChangePasswordStartAction,
  ChangePasswordFailAction,
  ChangePasswordSuccessAction,
  ResetPasswordStartAction,
  ResetPasswordSuccessAction,
  ResetPasswordFailAction,
  UpdateTermsStartAction,
  UpdateTermsSuccessAction,
  UpdateTermsFailAction,
} from "./actionTypes";
import { LoginRequest } from "./models/request/login";
import { LoginResponse } from "./models/response/login";
import { User } from "./models/user";
import { ResetPasswordForm } from "./models/resetPasswordForm";
import { HttpClient } from "_config/http";
import { ApiResponse } from "_config/api";
import { getBaseRequestData } from "_utils/http";
import { GetState } from "redux/state";
import { UserFirstAccessForm } from "./models/userFirstAccessForm";
import { UpdateUserInformationResponse } from "./models/response/updateUserInformationResponse";
import { UpdatePasswordRequest } from "./models/request/updatePasswordRequest";
import { RecoverPasswordRequest } from "./models/request/recoverPassword";
import { UserTermsRequest } from "./models/request/userTermsRequest";

export const login = (
  taxId: string,
  password: string,
  switchAlternateState?: boolean,
  tokenAccess?: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<LoginStartAction>({
        type: AuthAction.LOGIN_START,
      });

      const { url, defaultHeaders } = await getBaseRequestData("/Auth/Login");
      const data: LoginRequest = {
        login: taxId,
        password,
        switchAlternateState,
        tokenAccess,
      };

      const response = await HttpClient.post<LoginResponse>(url, data, {
        headers: defaultHeaders,
      });

      const { token, ...userData } = response.data.data;
      const user = new User(
        userData.userId,
        userData.taxId,
        userData.name,
        userData.mail,
        userData.phoneNumber,
        userData.zipCode,
        userData.street,
        userData.number,
        userData.district,
        userData.complement,
        userData.city,
        userData.state,
        userData.reference,
        userData.country,
        userData.isFirstAccess,
        userData.acceptedTerms,
        userData.tokenAccess
      );

      dispatch<LoginSuccessAction>({
        type: AuthAction.LOGIN_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<LoginFailAction>({
        type: AuthAction.LOGIN_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };
};

export const updateAuthData = (data: User) => (dispatch: Dispatch) => {
  dispatch<UpdateAuthDataAction>({
    type: AuthAction.UPDATE_AUTH_DATA,
    payload: data,
  });
};

export const logout = () => async (dispatch: Dispatch, getState: GetState) => {
  dispatch<SignOutStartAction>({
    type: AuthAction.SIGNOUT_START,
  });
  dispatch<SignOutFinishAction>({
    type: AuthAction.SIGNOUT_FINISH,
  });

  // try {
  //   const { url, defaultHeaders, userTaxId } = await getBaseRequestData(
  //     "/Auth/Signout",
  //     getState()
  //   );
  //   const data = { taxId: userTaxId };

  //   await HttpClient.post(url, data, {
  //     headers: defaultHeaders,
  //   });
  // } catch (error: any) {
  // } finally {
  //   dispatch<SignOutFinishAction>({
  //     type: AuthAction.SIGNOUT_FINISH,
  //   });
  // }
};

export const updatePassword =
  (userFirstAccessForm: UserFirstAccessForm) => async (dispatch: Dispatch) => {
    dispatch<UpdatePasswordDataAction>({
      type: AuthAction.UPDATE_PASSWORD_DATA,
      payload: userFirstAccessForm,
    });
  };

export const changePasswordFirstAccess =
  (userFirstAccessForm: UserFirstAccessForm) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ChangePasswordStartAction>({
      type: AuthAction.CHANGE_PASSWORD_START,
      payload: userFirstAccessForm,
    });

    try {
      const state = getState();

      const { url, userId, defaultHeaders, token } = await getBaseRequestData(
        "/User/ChangePassword",
        state
      );

      const data: UpdatePasswordRequest = {
        userId,
        currentPassword: userFirstAccessForm.currentPassword,
        confirmationNewPassword: userFirstAccessForm.confirmationNewPassword,
        newPassword: userFirstAccessForm.newPassword,
      };

      await HttpClient.post<UpdateUserInformationResponse>(url, data, {
        headers: { ...defaultHeaders, Authorization: `Bearer ${token}` },
      });

      dispatch<ChangePasswordSuccessAction>({
        type: AuthAction.CHANGE_PASSWORD_SUCCESS,
        payload: userFirstAccessForm,
      });
    } catch (errorChangePassword: any) {
      let response: ApiResponse | undefined;
      if (errorChangePassword.response)
        response = errorChangePassword.response?.data;

      dispatch<ChangePasswordFailAction>({
        type: AuthAction.CHANGE_PASSWORD_FAIL,
        payload: response?.message ?? errorChangePassword.message,
      });
    }
  };

export const recoverPwdData =
  (data: ResetPasswordForm) => (dispatch: Dispatch) => {
    dispatch<UpdateAuthDataAction>({
      type: AuthAction.UPDATE_AUTH_DATA,
      payload: data,
    });
  };

export const resetPassword =
  (userForm: ResetPasswordForm) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ResetPasswordStartAction>({
      type: AuthAction.RESET_PASSWORD_START,
      payload: userForm,
    });

    try {
      const state = getState();
      const { url, defaultHeaders } = await getBaseRequestData(
        "/User/ResetPassword",
        state
      );

      const data: RecoverPasswordRequest = {
        login: userForm.taxId!,
      };

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
        },
      });

      dispatch<ResetPasswordSuccessAction>({
        type: AuthAction.RESET_PASSWORD_SUCESS,
        payload: userForm,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<ResetPasswordFailAction>({
        type: AuthAction.RESET_PASSWORD_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

export const updateUserTerms =
  (taxId: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<UpdateTermsStartAction>({
      type: AuthAction.UPDATE_TERMS_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, userId } = await getBaseRequestData(
        "/User/UpdateUserTerms",
        state
      );

      const data: UserTermsRequest = {
        login: taxId,
        userId: userId!,
      };

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
        },
      });

      dispatch<UpdateTermsSuccessAction>({
        type: AuthAction.UPDATE_TERMS_SUCCESS,
        payload: state.auth.user,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<UpdateTermsFailAction>({
        type: AuthAction.UPDATE_TERMS_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };
