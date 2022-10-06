import { AccountType } from "./accountType";
import { PixKeyType } from "./pixKeyType";

export interface PixTransfer {
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
