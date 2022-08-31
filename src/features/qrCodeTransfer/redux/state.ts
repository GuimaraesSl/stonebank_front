import { TransferenceData } from './models/transferenceData'

export interface QrCodeTransferState {
  qrCodeBase64?: string
  errorMessage?: string
  transferenceData?: TransferenceData
  valueToReceive?: number
  loading: boolean
}

export class InitialQrCodeTransferState implements QrCodeTransferState {
  constructor(
    public transferenceData?: TransferenceData,
    public qrCodeBase64?: string,
    public errorMessage?: string,
    public loading: boolean = false,
  ) {}
}

export class LoadingQrCodeTransferState implements QrCodeTransferState {
  qrCodeBase64?: string
  errorMessage?: string
  loading: boolean = true

  constructor(public transferenceData?: TransferenceData) {}
}

export class SuccessQrCodeTransferState implements QrCodeTransferState {
  errorMessage?: string
  loading: boolean = false

  constructor(
    public transferenceData: TransferenceData | undefined,
    public valueToReceive: number | undefined,
    public qrCodeBase64: string | undefined,
  ) {}
}

export class FailQrCodeTransferState implements QrCodeTransferState {
  qrCodeBase64?: string
  loading: boolean = false

  constructor(
    public errorMessage: string | undefined,
    public transferenceData: TransferenceData | undefined,
  ) {}
}
