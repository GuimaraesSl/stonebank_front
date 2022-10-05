import { OperationType } from "../operationType";
import { ApiRequest } from "_config/api";

export interface GetTransactionReceiptRequest extends ApiRequest {
  accountId: number;
  externalIdentifier: string;
  operationType: OperationType;
  taxId?: string;
  bank?: string;
  bankBranch?: string;
  bankAccount?: string;
  bankAccountDigit?: string;
}
