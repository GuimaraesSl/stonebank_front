import React from "react";
import { useStyles } from "./TransactionSummary.style";

interface TransactionSummaryProps {
  
  idTransaction: string;
  internalProtocol: string;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> =
  ({ idTransaction, internalProtocol }) => {
    const styleAuthentication = useStyles();

    return (
      <div className={styleAuthentication.autenticationContent}>
        <div> Autenticação </div>
        <div>
          Pago via PIX:
          <strong> {} </strong>
        </div>
        <div> Controle/Protocolo: <strong>{idTransaction}</strong></div>
        <div> Protocolo Interno: <strong>{internalProtocol}</strong> </div>
      </div>
    );
  };
