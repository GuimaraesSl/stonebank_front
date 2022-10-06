import React from "react";
import { TransactionDetails } from "features/account/redux/models/transactionDetails";
import { useMask } from "hooks/useMask";
import { useHistory } from "react-router-dom";
import { maskTaxPayer } from "_utils/masks/taxPayer";
import { useStyle } from "./DetailDescription.style";
import { DateFormatter } from "_translate";
import { ConfigContext } from "_config";
import { OperationType } from "features/account/redux/models/operationType";
import { TransactionDetail } from "components/TransactionDetail";
import { TransactionDetailName } from "components/TransactionDetailName";
import { TransactionDetailValue } from "components/TransactionDetailValue";
import { Box, Typography } from "@material-ui/core";
import { Button } from "components/Button";
import { PixRoutes } from "features/pix/constants/routes";

interface DetailDescriptionProps {
  details?: TransactionDetails;
  operationType: OperationType;
}

export const DetailDescription: React.FC<DetailDescriptionProps> = ({
  details,
  operationType,
}) => {
  const style = useStyle();
  const [maskedTaxId, setMaskedTaxId] = useMask(maskTaxPayer);
  const history = useHistory();

  React.useEffect(() => {
    if (details?.toTaxId) setMaskedTaxId(details.toTaxId);
  }, [details?.toTaxId, setMaskedTaxId]);

  const renderSwitch = (opType: OperationType) => {
    switch (opType) {
      case OperationType.moneyTransfer:
      case OperationType.internalTransfer:
        return (
          <React.Fragment data-test-id="transfer-description">
            <TransactionDetail>
              <TransactionDetailName className={style.transfDetail}>
                Transferência no valor de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> R$ {details?.value ?? "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                para a conta de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>{details?.toName ?? "---"}</strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                com CPF
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>{details?.toTaxId ? maskedTaxId : "---"}</strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                no dia
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>
                  {details?.date ? DateFormatter.format(details.date) : "---"}
                </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                descrição da transferência
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>{details?.description ?? "---"}</strong>
              </TransactionDetailValue>
            </TransactionDetail>
          </React.Fragment>
        );

      case OperationType.darjPayment:
      case OperationType.fgtsPayment:
      case OperationType.garePayment:
        return (
          <React.Fragment data-test-id="payment-description">
            <TransactionDetail>
              <TransactionDetailName className={style.transfDetail}>
                Pagamento no valor de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> R$ {details?.value ?? "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                Com banco emissor
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> {details?.toName ?? "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                CPF/CNPJ do contribuinte
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> {details?.toTaxId ? maskedTaxId : "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                Com pagamento na data de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>
                  {details?.date ? DateFormatter.format(details.date) : "---"}
                </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                E data de vencimento para
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>
                  {details?.dueDate
                    ? DateFormatter.format(details.dueDate)
                    : "---"}
                </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                descrição do pagamento
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> {details?.description ?? "---"} </strong>
              </TransactionDetailValue>

              {details?.tags && (
                <React.Fragment>
                  <div>Suas tags</div>
                  {details.tags.map((t) => (
                    <React.Fragment>
                      <strong>{t}</strong>
                      <br />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </TransactionDetail>
          </React.Fragment>
        );

      case OperationType.purchaseTopUp:
        return (
          <React.Fragment data-test-id="top-up-description">
            <TransactionDetail>
              <TransactionDetailName className={style.transfDetail}>
                Recarga no valor de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> R$ {details?.value ?? "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                Com pagamento na data de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>
                  {details?.date ? DateFormatter.format(details.date) : "---"}
                </strong>
              </TransactionDetailValue>
            </TransactionDetail>
          </React.Fragment>
        );

      case OperationType.boletoPayment:
        return (
          <React.Fragment data-test-id="payment-description">
            <TransactionDetail>
              <TransactionDetailName className={style.transfDetail}>
                Pagamento no valor de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> R$ {details?.value ?? "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                Emitido por
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong> {details?.toName ?? "---"} </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                Com pagamento na data de
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>
                  {details?.date ? DateFormatter.format(details.date) : "---"}
                </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                E data de vencimento para
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>
                  {details?.dueDate
                    ? DateFormatter.format(details.dueDate)
                    : "---"}
                </strong>
              </TransactionDetailValue>
              <TransactionDetailName className={style.transfDetail}>
                descrição do pagamento
              </TransactionDetailName>
              <TransactionDetailValue className={style.transfDetail}>
                <strong>{details?.description ?? "---"}</strong>
              </TransactionDetailValue>

              {details?.tags && (
                <React.Fragment>
                  <div>Suas tags</div>
                  {details.tags.map((t) => (
                    <React.Fragment>
                      <strong>{t}</strong>
                      <br />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </TransactionDetail>
          </React.Fragment>
        );
      case OperationType.pixIn:
      case OperationType.pixOut:
        return (
          <React.Fragment>
            <div> Pix no valor de </div>
            <strong> R$ {details?.value ?? "---"} </strong>
            <div> de </div>
            <strong> {details?.toName ?? "---"} </strong>
            <div> Com CPF </div>
            <strong>
              <strong> {details?.toTaxId ? maskedTaxId : "---"} </strong>
            </strong>
            <div>Instituição</div>
            <strong>{details?.institution ?? "---"}</strong>
            <div> Com pagamento na data de </div>
            <strong>
              {details?.date ? DateFormatter.format(details.date) : "---"}
            </strong>
            <div> descrição do pagamento </div>
            <strong> {details?.description ?? "---"} </strong>
          </React.Fragment>
        );
    }
  };

  return (
    <div className={style.detailContent}>{renderSwitch(operationType!)}</div>
  );
};
