import { Bank } from "./models/bank";
import { PixKey } from "./models/pixKey";
import { PixKeyInfo } from "./models/pixKeyInfo";
import { PixQrCode } from "./models/pixQrCode";
import { PixQrCodeInfo } from "./models/pixQrCodeInfo";
import { PixTransfer } from "./models/pixTransfer";
import { Favored } from "./models/favored";

export enum PixActions {
  FIND_PIX_KEY_LIST_START = "FIND_PIX_KEY_LIST_START",
  FIND_PIX_KEY_LIST_SUCCESS = "FIND_PIX_KEY_LIST_SUCCESS",
  FIND_PIX_KEY_LIST_FAIL = "FIND_PIX_KEY_LIST_FAIL",

  CREATE_PIX_KEY_START = "CREATE_PIX_KEY_START",
  CREATE_PIX_KEY_SUCCESS = "CREATE_PIX_KEY_SUCCESS",
  CREATE_PIX_KEY_FAIL = "CREATE_PIX_KEY_FAIL",

  CANCEL_PIX_KEY_START = "CANCEL_PIX_KEY_START",
  CANCEL_PIX_KEY_SUCCESS = "CANCEL_PIX_KEY_SUCCESS",
  CANCEL_PIX_KEY_FAIL = "CANCEL_PIX_KEY_FAIL",

  RESEND_PIX_KEY_TOKEN_START = "RESEND_PIX_KEY_TOKEN_START",
  RESEND_PIX_KEY_TOKEN_SUCCESS = "RESEND_PIX_KEY_TOKEN_SUCCESS",
  RESEND_PIX_KEY_TOKEN_FAIL = "RESEND_PIX_KEY_TOKEN_FAIL",

  CONFIRM_PIX_KEY_HOLD_START = "CONFIRM_PIX_KEY_HOLD_START",
  CONFIRM_PIX_KEY_HOLD_SUCCESS = "CONFIRM_PIX_KEY_HOLD_SUCCESS",
  CONFIRM_PIX_KEY_HOLD_FAIL = "CONFIRM_PIX_KEY_HOLD_FAIL",

  FIND_PIX_KEY_INFO_START = "FIND_PIX_KEY_INFO_START",
  FIND_PIX_KEY_INFO_SUCCESS = "FIND_PIX_KEY_INFO_SUCCESS",
  FIND_PIX_KEY_INFO_FAIL = "FIND_PIX_KEY_INFO_FAIL",

  FIND_PIX_QR_CODE_INFO_START = "FIND_PIX_QR_CODE_INFO_START",
  FIND_PIX_QR_CODE_INFO_SUCCESS = "FIND_PIX_QR_CODE_INFO_SUCCESS",
  FIND_PIX_QR_CODE_INFO_FAIL = "FIND_PIX_QR_CODE_INFO_FAIL",

  CREATE_PIX_TRANSFER_START = "CREATE_PIX_TRANSFER_START",
  CREATE_PIX_TRANSFER_SUCCESS = "CREATE_PIX_TRANSFER_SUCCESS",
  CREATE_PIX_TRANSFER_FAIL = "CREATE_PIX_TRANSFER_FAIL",

  FIND_BANK_LIST_START = "FIND_BANK_LIST_START",
  FIND_BANK_LIST_SUCCESS = "FIND_BANK_LIST_SUCCESS",
  FIND_BANK_LIST_FAIL = "FIND_BANK_LIST_FAIL",

  CREATE_STATIC_PIX_QR_CODE_START = "CREATE_STATIC_PIX_QR_CODE_START",
  CREATE_STATIC_PIX_QR_CODE_SUCCESS = "CREATE_STATIC_PIX_QR_CODE_SUCCESS",
  CREATE_STATIC_PIX_QR_CODE_FAIL = "CREATE_STATIC_PIX_QR_CODE_FAIL",

  FIND_PIX_QR_CODE_START = "FIND_PIX_QR_CODE_START",
  FIND_PIX_QR_CODE_SUCCESS = "FIND_PIX_QR_CODE_SUCCESS",
  FIND_PIX_QR_CODE_FAIL = "FIND_PIX_QR_CODE_FAIL",

  SELECT_FAVORED = "SELECT_FAVORED",

  FIND_FAVORED_LIST_START = "FIND_FAVORED_LIST_START",
  FIND_FAVORED_LIST_SUCCESS = "FIND_FAVORED_LIST_SUCCESS",
  FIND_FAVORED_LIST_FAIL = "FIND_FAVORED_LIST_FAIL",

  CLOSE_ALERT = "CLOSE_ALERT",

  UPDATE_PIX_STATE = "UPDATE_PIX_STATE",

  SELECT_PIX_KEY = "SELECT_PIX_KEY",

  UPDATE_PIX_TRANSFER = "UPDATE_PIX_TRANSFER",
}

//FIND PIX KEY LIST-------------------------------------------------------

export interface FindPixKeyListStartAction {
  type: PixActions.FIND_PIX_KEY_LIST_START;
}

export interface FindPixKeyListSuccessAction {
  type: PixActions.FIND_PIX_KEY_LIST_SUCCESS;
  payload?: PixKey[];
}

export interface FindPixKeyListFailAction {
  type: PixActions.FIND_PIX_KEY_LIST_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//CREATE PIX KEY-------------------------------------------------------

export interface CreatePixKeyStartAction {
  type: PixActions.CREATE_PIX_KEY_START;
}

export interface CreatePixKeySuccessAction {
  type: PixActions.CREATE_PIX_KEY_SUCCESS;
  payload?: string;
}

export interface CreatePixKeyFailAction {
  type: PixActions.CREATE_PIX_KEY_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//CANCEL PIX KEY-------------------------------------------------------

export interface CancelPixKeyStartAction {
  type: PixActions.CANCEL_PIX_KEY_START;
}

export interface CancelPixKeySuccessAction {
  type: PixActions.CANCEL_PIX_KEY_SUCCESS;
  payload: boolean;
}

export interface CancelPixKeyFailAction {
  type: PixActions.CANCEL_PIX_KEY_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//RESEND PIX KEY TOKEN-------------------------------------------------------

export interface ResendPixKeyTokenStartAction {
  type: PixActions.RESEND_PIX_KEY_TOKEN_START;
}

export interface ResendPixKeyTokenSuccessAction {
  type: PixActions.RESEND_PIX_KEY_TOKEN_SUCCESS;
  payload: boolean;
}

export interface ResendPixKeyTokenFailAction {
  type: PixActions.RESEND_PIX_KEY_TOKEN_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//CONFIRM PIX KEY HOLD-------------------------------------------------------

export interface ConfirmPixKeyHoldStartAction {
  type: PixActions.CONFIRM_PIX_KEY_HOLD_START;
}

export interface ConfirmPixKeyHoldSuccessAction {
  type: PixActions.CONFIRM_PIX_KEY_HOLD_SUCCESS;
  payload: boolean;
}

export interface ConfirmPixKeyHoldFailAction {
  type: PixActions.CONFIRM_PIX_KEY_HOLD_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//FIND PIX KEY INFO----------------------------------------------------------

export interface FindPixKeyInfoStartAction {
  type: PixActions.FIND_PIX_KEY_INFO_START;
}

export interface FindPixKeyInfoSuccessAction {
  type: PixActions.FIND_PIX_KEY_INFO_SUCCESS;
  payload: PixKeyInfo;
}

export interface FindPixKeyInfoFailAction {
  type: PixActions.FIND_PIX_KEY_INFO_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//FIND PIX QR CODE INFO----------------------------------------------------------

export interface FindPixQrCodeInfoStartAction {
  type: PixActions.FIND_PIX_QR_CODE_INFO_START;
}

export interface FindPixQrCodeInfoSuccessAction {
  type: PixActions.FIND_PIX_QR_CODE_INFO_SUCCESS;
  payload: PixQrCodeInfo;
}

export interface FindPixQrCodeInfoFailAction {
  type: PixActions.FIND_PIX_QR_CODE_INFO_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//CREATE PIX TRANSFER----------------------------------------------------------

export interface CreatePixTransferStartAction {
  type: PixActions.CREATE_PIX_TRANSFER_START;
}

export interface CreatePixTransferSuccessAction {
  type: PixActions.CREATE_PIX_TRANSFER_SUCCESS;
  payload: boolean;
}

export interface CreatePixTransferFailAction {
  type: PixActions.CREATE_PIX_TRANSFER_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//FIND BANK LIST----------------------------------------------------------

export interface FindBankListStartAction {
  type: PixActions.FIND_BANK_LIST_START;
}

export interface FindBankListSuccessAction {
  type: PixActions.FIND_BANK_LIST_SUCCESS;
  payload: Bank[];
}

export interface FindBankListFailAction {
  type: PixActions.FIND_BANK_LIST_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//CREATE STATIC PIX QR CODE--------------------------------------------------

export interface CreateStaticPixQrCodeStartAction {
  type: PixActions.CREATE_STATIC_PIX_QR_CODE_START;
}

export interface CreateStaticPixQrCodeSuccessAction {
  type: PixActions.CREATE_STATIC_PIX_QR_CODE_SUCCESS;
  payload?: number;
}

export interface CreateStaticPixQrCodeFailAction {
  type: PixActions.CREATE_STATIC_PIX_QR_CODE_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

//FIND PIX QR CODE-----------------------------------------------------------

export interface FindPixQrCodeStartAction {
  type: PixActions.FIND_PIX_QR_CODE_START;
}

export interface FindPixQrCodeSuccessAction {
  type: PixActions.FIND_PIX_QR_CODE_SUCCESS;
  payload: PixQrCode;
}

export interface FindPixQrCodeFailAction {
  type: PixActions.FIND_PIX_QR_CODE_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

export interface CloseAlertAction {
  type: PixActions.CLOSE_ALERT;
}

export interface SelectPixKeyAction {
  type: PixActions.SELECT_PIX_KEY;
  payload?: PixKey;
}

export interface UpdatePixStateAction {
  type: PixActions.UPDATE_PIX_STATE;
}

export interface UpdatePixTransferAction {
  type: PixActions.UPDATE_PIX_TRANSFER;
  payload?: PixTransfer;
}

//---------------------------------------------------------------------------

export interface FindFavoredListStart {
  type: PixActions.FIND_FAVORED_LIST_START;
}
export interface FindFavoredListSuccess {
  type: PixActions.FIND_FAVORED_LIST_SUCCESS;
  payload?: Favored[];
}
export interface FindFavoredListFail {
  type: PixActions.FIND_FAVORED_LIST_FAIL;
  payload: string;
}

//---------------------------------------------------------------------------

export type PixAction =
  | FindPixKeyListStartAction
  | FindPixKeyListSuccessAction
  | FindPixKeyListFailAction
  | CreatePixKeyStartAction
  | CreatePixKeySuccessAction
  | CreatePixKeyFailAction
  | CancelPixKeyStartAction
  | CancelPixKeySuccessAction
  | CancelPixKeyFailAction
  | ResendPixKeyTokenStartAction
  | ResendPixKeyTokenSuccessAction
  | ResendPixKeyTokenFailAction
  | ConfirmPixKeyHoldStartAction
  | ConfirmPixKeyHoldSuccessAction
  | ConfirmPixKeyHoldFailAction
  | FindPixKeyInfoStartAction
  | FindPixKeyInfoSuccessAction
  | FindPixKeyInfoFailAction
  | FindPixQrCodeInfoStartAction
  | FindPixQrCodeInfoSuccessAction
  | FindPixQrCodeInfoFailAction
  | CreatePixTransferStartAction
  | CreatePixTransferSuccessAction
  | CreatePixTransferFailAction
  | FindBankListStartAction
  | FindBankListSuccessAction
  | FindBankListFailAction
  | CreateStaticPixQrCodeStartAction
  | CreateStaticPixQrCodeSuccessAction
  | CreateStaticPixQrCodeFailAction
  | FindPixQrCodeStartAction
  | FindPixQrCodeSuccessAction
  | FindPixQrCodeFailAction
  | SelectPixKeyAction
  | CloseAlertAction
  | UpdatePixStateAction
  | UpdatePixTransferAction
  | FindFavoredListStart
  | FindFavoredListSuccess
  | FindFavoredListFail;
