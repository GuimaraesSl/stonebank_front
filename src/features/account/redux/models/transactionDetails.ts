export interface TransactionDetails {
  value: number;
  fromBank: string;
  fromBankBranch: string;
  fromBankAccount: string;
  fromBankAccountDigit: string;
  toName: string;
  toTaxId: string;
  toBank: string;
  toBankBranch: string;
  toBankAccount: string;
  toBankAccountDigit: string;
  date?: Date;
  dueDate?: Date;
  description?: string;
  tags?: string[];
  externalIdentifier: string;
  institution?: string;
  paymentType?: string;
  transactionID?: string;
  internalProtocol?: string;
  devolutionDate?: Date;
}
