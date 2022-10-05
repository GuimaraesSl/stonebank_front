import { GetState } from "redux/state";
import { Dispatch } from "redux";
import { HttpClient } from "_config/http";
import { getBaseRequestData } from "_utils/http";
import { FindPixKeyListRequest } from "./models/request/findPixKeyListRequest";
import { FindPixKeyListResponse } from "./models/response/findPixKeyListResponse";
import {
  CancelPixKeyFailAction,
  CancelPixKeyStartAction,
  CancelPixKeySuccessAction,
  CloseAlertAction,
  ConfirmPixKeyHoldFailAction,
  ConfirmPixKeyHoldStartAction,
  ConfirmPixKeyHoldSuccessAction,
  CreatePixKeyFailAction,
  CreatePixKeyStartAction,
  CreatePixKeySuccessAction,
  CreatePixTransferFailAction,
  CreatePixTransferStartAction,
  CreatePixTransferSuccessAction,
  CreateStaticPixQrCodeFailAction,
  CreateStaticPixQrCodeStartAction,
  CreateStaticPixQrCodeSuccessAction,
  FindBankListFailAction,
  FindBankListStartAction,
  FindBankListSuccessAction,
  FindPixKeyInfoFailAction,
  FindPixKeyInfoStartAction,
  FindPixKeyInfoSuccessAction,
  FindPixKeyListFailAction,
  FindPixKeyListStartAction,
  FindPixKeyListSuccessAction,
  FindPixQrCodeFailAction,
  FindPixQrCodeInfoFailAction,
  FindPixQrCodeInfoStartAction,
  FindPixQrCodeInfoSuccessAction,
  FindPixQrCodeStartAction,
  FindPixQrCodeSuccessAction,
  PixActions,
  ResendPixKeyTokenFailAction,
  ResendPixKeyTokenStartAction,
  ResendPixKeyTokenSuccessAction,
  SelectPixKeyAction,
  UpdatePixStateAction,
  UpdatePixTransferAction,
  FindFavoredListStart,
  FindFavoredListSuccess,
  FindFavoredListFail,
} from "./actionTypes";
import { ApiResponse } from "_config/api";
import { PixKey } from "./models/pixKey";
import { ResendPixKeyTokenRequest } from "./models/request/resendPixKeyTokenRequest";
import { CancelPixKeyRequest } from "./models/request/cancelPixKeyRequest";
import { PixKeyType } from "./models/pixKeyType";
import { CreatePixKeyRequest } from "./models/request/createPixKeyRequest";
import { CreatePixKeyResponse } from "./models/response/createPixKeyResponse";
import { ConfirmPixKeyHoldRequest } from "./models/request/confirmPixKeyHoldRequest";
import { FindPixKeyInfoRequest } from "./models/request/findPixKeyInfoRequest";
import { FindPixKeyInfoResponse } from "./models/response/findPixKeyInfoResponse";
import { FindPixQrCodeInfoRequest } from "./models/request/findPixQrCodeInfoRequest";
import { FindPixQrCodeInfoResponse } from "./models/response/findPixQrCodeInfoResponse";
import { KeyType } from "features/pix/redux/models/keyType";
import { PixTransfer } from "./models/pixTransfer";
import { CreatePixTransferRequest } from "./models/request/createPixTransferRequest";
import { CreatePixTransferResponse } from "./models/response/createPixTransferResponse";
import { FindBankListResponse } from "./models/response/findBankListResponse";
import { CreateStaticPixQrCodeRequest } from "./models/request/createStaticPixQrCodeRequest";
import { PixTransactionPurpose } from "./models/pixTransactionPurposeTest";
import { AddressType } from "./models/addressType";
import { CreateStaticPixQrCodeResponse } from "./models/response/createStaticPixQrCodeResponse";
import { FindPixQrCodeRequest } from "./models/request/findPixQrCodeRequest";
import { FindPixQrCodeResponse } from "./models/response/findPixQrCodeResponse";
import { FavoredListRequest } from "./models/request/favoredListRequest";
import { FavoredListResponse } from "./models/response/favoredListResponse";
import { OperationType } from "features/account/redux/models/operationType";

export const findPixKeyList =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindPixKeyListStartAction>({
      type: PixActions.FIND_PIX_KEY_LIST_START,
    });

    try {
      const state = getState();

      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/FindPixKeyList", state);

      const data: FindPixKeyListRequest = {
        accountId: accountId!,
        userId: userId!,
        taxId: state.account.account?.taxId!,
        bank: state.account.account?.spbBank!,
        bankBranch: state.account.account?.spbBankBranch!,
        bankAccount: state.account.account?.spbBankAccount,
        bankAccountDigit: state.account.account?.spbBankAccountDigit,
      };

      const response = await HttpClient.post<FindPixKeyListResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;

      dispatch<FindPixKeyListSuccessAction>({
        type: PixActions.FIND_PIX_KEY_LIST_SUCCESS,
        payload: responseData.pixKeyList,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;

      if (error.response) response = error.response?.data;

      dispatch<FindPixKeyListFailAction>({
        type: PixActions.FIND_PIX_KEY_LIST_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//---------------------------------------------------------------------------------------------------------------------

export const createPixKeyAction =
  (pixKeyType?: PixKeyType, pixKeyValue?: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixKeyStartAction>({
      type: PixActions.CREATE_PIX_KEY_START,
    });

    try {
      const state = getState();

      const { account } = state;

      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/CreatePixKey", state);

      const _pixKeyType =
        account.account?.taxId.length === 11 ? PixKeyType.CPF : PixKeyType.CNPJ;

      const data: CreatePixKeyRequest = {
        userId: userId!,
        accountId: accountId!,
        pixKey: pixKeyValue!,
        pixKeyType: pixKeyType ?? _pixKeyType,
        taxId: state.account.account!.taxId!,
        spbBank: account.account!.spbBank!,
        spbBankAccount: account.account!.spbBankAccount!,
        spbBankBranch: account.account!.spbBankBranch!,
        spbBankAccountDigit: account.account!.spbBankAccountDigit!,
      };

      const response = await HttpClient.post<CreatePixKeyResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data.data;

      dispatch<CreatePixKeySuccessAction>({
        type: PixActions.CREATE_PIX_KEY_SUCCESS,
        payload: responseData.pixKeyValue!,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<CreatePixKeyFailAction>({
        type: PixActions.CREATE_PIX_KEY_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

export const findFavoredListByAccountIdAndOperationType =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindFavoredListStart>({
      type: PixActions.FIND_FAVORED_LIST_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData(
          "/Favored/FindFavoredListByAccountIdAndOperationType",
          state
        );

      const data: FavoredListRequest = {
        accountId: accountId!,
        userId: userId!,
        operationType: OperationType.pixOut,
      };

      const response = await HttpClient.post<FavoredListResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data.data;
      const favoredListResponse = responseData.favoredList;

      dispatch<FindFavoredListSuccess>({
        type: PixActions.FIND_FAVORED_LIST_SUCCESS,
        payload: favoredListResponse,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<FindFavoredListFail>({
        type: PixActions.FIND_FAVORED_LIST_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//---------------------------------------------------------------------------------------------------------------------

export const cancelPixKeyAction =
  (pixKey: PixKey) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CancelPixKeyStartAction>({
      type: PixActions.CANCEL_PIX_KEY_START,
    });
    try {
      const state = getState();
      const { account } = state;
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/CancelPixKey", state);

      const data: CancelPixKeyRequest = {
        userId: userId!,
        accountId: accountId!,
        pixKeyValue: pixKey.pixKeyValue!,
        pixKeyType: pixKey.pixKeyType!,
        taxId: state.account.account!.taxId!,
        spbBank: account.account!.spbBank,
        spbBankAccount: account.account!.spbBankAccount,
        spbBankBranch: account.account!.spbBankBranch,
        spbBankAccountDigit: account.account!.spbBankAccountDigit,
      };

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch<CancelPixKeySuccessAction>({
        type: PixActions.CANCEL_PIX_KEY_SUCCESS,
        payload: true,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<CancelPixKeyFailAction>({
        type: PixActions.CANCEL_PIX_KEY_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const resendPixKeyTokenAction =
  (pixKey?: PixKey) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ResendPixKeyTokenStartAction>({
      type: PixActions.RESEND_PIX_KEY_TOKEN_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/ResendPixKeyToken", state);

      const data: ResendPixKeyTokenRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: state.account.account!.taxId!,
        pixKey: pixKey?.pixKeyValue!,
        pixKeyType: pixKey?.pixKeyType!,
      };

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch<ResendPixKeyTokenSuccessAction>({
        type: PixActions.RESEND_PIX_KEY_TOKEN_SUCCESS,
        payload: true,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<ResendPixKeyTokenFailAction>({
        type: PixActions.RESEND_PIX_KEY_TOKEN_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const confirmPixKeyHoldAction =
  (pixKeyValue: string, pixKeyType: PixKeyType, confirmationCode: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ConfirmPixKeyHoldStartAction>({
      type: PixActions.CONFIRM_PIX_KEY_HOLD_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/ConfirmPixKeyHold", state);

      const data: ConfirmPixKeyHoldRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: state.account.account!.taxId!,
        pixKeyValue: pixKeyValue,
        pixKeyType: pixKeyType,
        confirmationCode: confirmationCode,
      };

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch<ConfirmPixKeyHoldSuccessAction>({
        type: PixActions.CONFIRM_PIX_KEY_HOLD_SUCCESS,
        payload: true,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.message) response = error.response?.data;

      dispatch<ConfirmPixKeyHoldFailAction>({
        type: PixActions.CONFIRM_PIX_KEY_HOLD_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const findPixKeyInfo =
  (pixKeyValue?: string, pixKeyType?: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindPixKeyInfoStartAction>({
      type: PixActions.FIND_PIX_KEY_INFO_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData("/Pix/FindInfosPixKey", state);

      const _pixKeyType =
        pixKeyType === KeyType.random.value
          ? PixKeyType.RandomKeyCode
          : pixKeyType === KeyType.email.value
          ? PixKeyType.Email
          : pixKeyType === KeyType.phone.value
          ? PixKeyType.PhoneNumber
          : pixKeyType === KeyType.taxId.value && pixKeyValue!.length === 14
          ? PixKeyType.CPF
          : PixKeyType.CNPJ;

      const data: FindPixKeyInfoRequest = {
        accountId: accountId!,
        userId: userId!,
        taxId: state.account.account?.taxId!,
        pixKeyType: _pixKeyType,
        pixKeyValue: pixKeyValue,
      };

      const response = await HttpClient.post<FindPixKeyInfoResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;

      dispatch<FindPixKeyInfoSuccessAction>({
        type: PixActions.FIND_PIX_KEY_INFO_SUCCESS,
        payload: responseData,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<FindPixKeyInfoFailAction>({
        type: PixActions.FIND_PIX_KEY_INFO_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const findPixQrCodeInfo =
  (hash: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindPixQrCodeInfoStartAction>({
      type: PixActions.FIND_PIX_QR_CODE_INFO_START,
    });

    try {
      const state = getState();
      const { taxId, url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/FindInfoPixQRCode", state);

      const data: FindPixQrCodeInfoRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: taxId!,
        hash: hash,
      };

      const response = await HttpClient.post<FindPixQrCodeInfoResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;

      dispatch<FindPixQrCodeInfoSuccessAction>({
        type: PixActions.FIND_PIX_QR_CODE_INFO_SUCCESS,
        payload: responseData,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<FindPixQrCodeInfoFailAction>({
        type: PixActions.FIND_PIX_QR_CODE_INFO_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const createPixTransferAction =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixTransferStartAction>({
      type: PixActions.CREATE_PIX_TRANSFER_START,
    });

    try {
      const state = getState();

      const { pixTransfer } = state.pix;

      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData("/Pix/CreatePixOut", state);

      const data: CreatePixTransferRequest = {
        userId: userId!,
        accountId: accountId!,
        toName: pixTransfer?.toName,
        toTaxId: pixTransfer?.toTaxId,
        toBank: pixTransfer?.toBank,
        toBankBranch: pixTransfer?.toBankBranch,
        toBankAccount: pixTransfer?.toBankAccount,
        toBankAccountDigit: pixTransfer?.toBankAccountDigit,
        toBankName: pixTransfer?.toBankName,
        value: pixTransfer?.value,
        paymentDate: pixTransfer?.paymentDate,
        tags: pixTransfer?.tags,
        description: pixTransfer?.description,
        customerMessage: pixTransfer?.customerMessage,
        pixKeyValue: pixTransfer?.pixKeyValue,
        pixKeyType: pixTransfer?.pixKeyType,
        accountType: pixTransfer?.accountType,
        searchProtocol: pixTransfer?.searchProtocol,
      };

      await HttpClient.post<CreatePixTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch<CreatePixTransferSuccessAction>({
        type: PixActions.CREATE_PIX_TRANSFER_SUCCESS,
        payload: true,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<CreatePixTransferFailAction>({
        type: PixActions.CREATE_PIX_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const findBankList =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindBankListStartAction>({
      type: PixActions.FIND_BANK_LIST_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData("/Bank/FindBanks", state);

      const data = {
        accountId: accountId!,
        userId: userId!,
      };

      const response = await HttpClient.post<FindBankListResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data.data;

      responseData.banks = responseData.banks.filter(
        (v: { code: any }, i: any, a: any[]) =>
          a.findIndex((t) => t.code === v.code) === i
      );

      dispatch<FindBankListSuccessAction>({
        type: PixActions.FIND_BANK_LIST_SUCCESS,
        payload: responseData.banks,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<FindBankListFailAction>({
        type: PixActions.FIND_BANK_LIST_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const createStaticPixQrCodeAction =
  (
    principalValue?: number,
    pixKeyValue?: string,
    pixKeyType?: PixKeyType,
    additionalData?: string,
    pixTransactionPurpose?: PixTransactionPurpose,
    description?: string
  ) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreateStaticPixQrCodeStartAction>({
      type: PixActions.CREATE_STATIC_PIX_QR_CODE_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData("/Pix/CreateStaticPixQRCode", state);

      const data: CreateStaticPixQrCodeRequest = {
        accountId: accountId!,
        userId: userId!,
        principalValue: principalValue,
        pixKeyValue: pixKeyValue,
        pixKeyType: pixKeyType,
        additionalData: additionalData,
        pixTransactionPurpose: pixTransactionPurpose,
        description: description,
        address: {
          addressLine1: state.auth?.user?.street!,
          addressLine2: "",
          zipCode: state.auth?.user?.zipCode!,
          neighborhood: "",
          cityName: state.auth?.user?.city!,
          state: state.auth?.user?.state!,
          addressType: AddressType.Residential,
          country: state.auth?.user?.country,
          complement: state.auth?.user?.complement!,
        },
      };

      const response = await HttpClient.post<CreateStaticPixQrCodeResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;

      dispatch<CreateStaticPixQrCodeSuccessAction>({
        type: PixActions.CREATE_STATIC_PIX_QR_CODE_SUCCESS,
        payload: responseData.externalIdentifier,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<CreateStaticPixQrCodeFailAction>({
        type: PixActions.CREATE_STATIC_PIX_QR_CODE_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const findPixQrCode =
  (externalIdentifier?: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindPixQrCodeStartAction>({
      type: PixActions.FIND_PIX_QR_CODE_START,
    });

    try {
      const state = getState();
      const { url, defaultHeaders, token, accountId, userId, accountTaxId } =
        await getBaseRequestData("/Pix/FindPixQrCode", state);

      const data: FindPixQrCodeRequest = {
        accountId: accountId!,
        userId: userId!,
        taxId: accountTaxId!,
        externalIdentifier: externalIdentifier,
      };

      const response = await HttpClient.post<FindPixQrCodeResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data.data;

      responseData.hashCode = atob(responseData.hashCode!);

      dispatch<FindPixQrCodeSuccessAction>({
        type: PixActions.FIND_PIX_QR_CODE_SUCCESS,
        payload: responseData,
      });
    } catch (error: any) {
      let response: ApiResponse | undefined;
      if (error.response) response = error.response?.data;

      dispatch<FindPixQrCodeFailAction>({
        type: PixActions.FIND_PIX_QR_CODE_FAIL,
        payload: response?.message ?? error.message,
      });
    }
  };

//------------------------------------------------------------------------------------------------------------

export const updateState = () => (dispatch: Dispatch) => {
  dispatch<UpdatePixStateAction>({
    type: PixActions.UPDATE_PIX_STATE,
  });
};

export const updatePixTransfer =
  (pixTransfer: PixTransfer) => (dispatch: Dispatch) => {
    dispatch<UpdatePixTransferAction>({
      type: PixActions.UPDATE_PIX_TRANSFER,
      payload: pixTransfer,
    });
  };

export const selectPixKey = (pixKey?: PixKey) => (dispatch: Dispatch) => {
  dispatch<SelectPixKeyAction>({
    type: PixActions.SELECT_PIX_KEY,
    payload: pixKey,
  });
};

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: PixActions.CLOSE_ALERT,
  });
};
