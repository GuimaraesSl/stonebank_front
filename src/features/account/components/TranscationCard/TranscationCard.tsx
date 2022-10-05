import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Transaction } from "features/account/redux/models/transaction";
import { CurrencyFormatter } from "_translate";
import { useStyle } from "./TranscationCard.style";
import { useHistory } from "react-router-dom";
import { AccountRoutes } from "features/account/constants/routes";
import { OperationType } from "features/account/redux/models/operationType";
import { TransactionCardButton } from "components/TransactionCardButton";
import { TagChip } from "features/tags/components/TagChip";
import { Icon } from "components/Icon";

interface TranscationCardProps {
  transaction: Transaction;
}

export const TranscationCard: React.FC<TranscationCardProps> = ({
  transaction,
}) => {
  const {
    value,
    title,
    stablishment,
    tags,
    externalIdentifier,
    operationType,
  } = transaction;
  const history = useHistory();
  const style = useStyle();

  const formattedValue = CurrencyFormatter.format(value);

  const isCredit = value >= 0;
  const showDetailsAndReceiptButtons =
    (operationType === OperationType.moneyTransfer ||
      operationType === OperationType.internalTransfer ||
      operationType === OperationType.boletoPayment ||
      operationType === OperationType.garePayment ||
      operationType === OperationType.fgtsPayment ||
      operationType === OperationType.purchaseTopUp ||
      operationType === OperationType.pixOut ||
      operationType === OperationType.pixIn) &&
    externalIdentifier;

  const onDetailsButtonClick = () => {
    history.push(AccountRoutes.detail, {
      externalIdentifier: externalIdentifier,
      operationType: operationType,
    });
  };

  const onReceiptButtonClick = () => {
    history.push(AccountRoutes.receipt, {
      externalIdentifier: externalIdentifier,
      operationType: operationType,
    });
  };

  return (
    <div className={style.card}>
      <Icon className={style.icon} name={isCredit ? "enter" : "exit"} />
      {showDetailsAndReceiptButtons && (
        <Grid
          container
          justify="flex-end"
          spacing={1}
          className={style.buttons}
        >
          <Grid item>
            <TransactionCardButton
              icon={<Icon name="details" />}
              onClick={onDetailsButtonClick}
            >
              Detalhes
            </TransactionCardButton>
          </Grid>
          <Grid item>
            <TransactionCardButton
              icon={<Icon name="receipt" />}
              onClick={onReceiptButtonClick}
            >
              Comprovante
            </TransactionCardButton>
          </Grid>
        </Grid>
      )}
      <div>
        <Typography
          className={style.description}
          variant="caption"
          display="block"
          gutterBottom
          data-test-id="transcation-card-description"
        >
          {title}
        </Typography>
        <strong>{formattedValue}</strong>
        {stablishment && (
          <Typography
            className={style.description}
            variant="caption"
            display="block"
            gutterBottom
            data-test-id="transcation-description"
          >
            {stablishment}
          </Typography>
        )}
        {tags?.map((tag) => (
          <TagChip label={tag} />
        ))}
      </div>
    </div>
  );
};
