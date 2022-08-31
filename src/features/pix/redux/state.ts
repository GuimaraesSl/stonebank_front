import { Bank } from './models/bank'
import { PixKey } from './models/pixKey'
import { PixKeyInfo } from './models/pixKeyInfo'
import { PixQrCodeInfo } from './models/pixQrCodeInfo'
import { PixTransfer } from './models/pixTransfer'
import { PixQrCode } from './models/pixQrCode'
import { Favored } from './models/favored'

export interface PixState {
  pixKey?: PixKey
  pixKeyList?: PixKey[]
  createPixKey?: string
  cancelPixKey?: boolean
  resendPixKeyToken?: boolean
  confirmPixKeyHold?: boolean
  pixKeyInfo?: PixKeyInfo
  pixQrCodeInfo?: PixQrCodeInfo
  pixTransfer?: PixTransfer
  createPixTransfer?: boolean
  bankList?: Bank[]
  staticPixQrCode?: PixQrCode
  createStaticPixQrCode?: number
  favored?: Favored[]
  loading: boolean
  errorMessage?: string
}

export class InitialPixState implements PixState {
  public errorMessage?: string
  public loading: boolean = false

  constructor(
    public pixKey?: PixKey,
    public pixKeyList?: PixKey[],
    public createPixKey?: string,
    public cancelPixKey?: boolean,
    public resendPixKeyToken?: boolean,
    public confirmPixKeyHold?: boolean,
    public pixKeyInfo?: PixKeyInfo,
    public pixQrCodeInfo?: PixQrCodeInfo,
    public pixTransfer?: PixTransfer,
    public createPixTransfer?: boolean,
    public bankList?: Bank[],
    public staticPixQrCode?: PixQrCode,
    public createStaticPixQrCode?: number,
    public favored?: Favored[],
  ) {}
}

export class LoadingPixState implements PixState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public pixKey?: PixKey,
    public pixKeyList?: PixKey[],
    public createPixKey?: string,
    public cancelPixKey?: boolean,
    public resendPixKeyToken?: boolean,
    public confirmPixKeyHold?: boolean,
    public pixKeyInfo?: PixKeyInfo,
    public pixQrCodeInfo?: PixQrCodeInfo,
    public pixTransfer?: PixTransfer,
    public createPixTransfer?: boolean,
    public bankList?: Bank[],
    public staticPixQrCode?: PixQrCode,
    public createStaticPixQrCode?: number,
    public favored?: Favored[],
  ) {}
}

export class SuccessPixState implements PixState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public pixKey?: PixKey,
    public pixKeyList?: PixKey[],
    public createPixKey?: string,
    public cancelPixKey?: boolean,
    public resendPixKeyToken?: boolean,
    public confirmPixKeyHold?: boolean,
    public pixKeyInfo?: PixKeyInfo,
    public pixQrCodeInfo?: PixQrCodeInfo,
    public pixTransfer?: PixTransfer,
    public createPixTransfer?: boolean,
    public bankList?: Bank[],
    public staticPixQrCode?: PixQrCode,
    public createStaticPixQrCode?: number,
    public favored?: Favored[],
  ) {}
}

export class FailPixState implements PixState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public pixKey?: PixKey,
    public pixKeyList?: PixKey[],
    public createPixKey?: string,
    public cancelPixKey?: boolean,
    public resendPixKeyToken?: boolean,
    public confirmPixKeyHold?: boolean,
    public pixKeyInfo?: PixKeyInfo,
    public pixQrCodeInfo?: PixQrCodeInfo,
    public pixTransfer?: PixTransfer,
    public createPixTransfer?: boolean,
    public bankList?: Bank[],
    public staticPixQrCode?: PixQrCode,
    public createStaticPixQrCode?: number,
    public favored?: Favored[],
  ) {}
}
