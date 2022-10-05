import { AccountType } from "./accountType";
import { PixKeyType } from "./pixKeyType";

export interface PixKeyInfo {
  searchProtocol?: number;
  payeeName?: string;
  payeeTaxNumber?: string;
  payeeBank?: string;
  payeeBankBranch?: string;
  payeeBankAccount?: string;
  payeeBankAccountDigit?: string;
  payeeAccountType?: AccountType;
  pixKeyType?: PixKeyType;
  pixKeyValue?: string;
}
