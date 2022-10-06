import { ApiRequest } from "_config/api";
import { AccountType } from "../accountType";
import { PixKeyType } from "../pixKeyType";

export interface CreatePixTransferRequest extends ApiRequest {
  toName?: string;
  toTaxId?: string;
  toBank?: string;
  toBankBranch?: string;
  toBankAccount?: string;
  toBankAccountDigit?: string;
  toBankName?: string;
  value?: number;
  paymentDate?: Date;
  tags?: string[];
  description?: string;
  customerMessage?: string;
  pixKeyValue?: string;
  pixKeyType?: PixKeyType;
  accountType?: AccountType;
  searchProtocol?: number;
}
