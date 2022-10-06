import React from "react";
import { useStyles } from "./ReturnTransactionAuthentication.style";

interface ReturnTransactionAuthenticationProps {
  payment: string;
  transactionID: string;
  internalProtocol: string;
}

export const ReturnTransactionAuthentication: React.FC<
  ReturnTransactionAuthenticationProps
> = ({ payment, transactionID, internalProtocol }) => {
  const styleAuthentication = useStyles();

  return (
    <div className={styleAuthentication.autenticationContent}>
      <div> Autenticação </div>
      <div>
        Pago via:
        <strong> {payment} </strong>
      </div>
      <div> ID da transação: {transactionID} </div>
      <div> Protocolo Interno: {internalProtocol} </div>
    </div>
  );
};
