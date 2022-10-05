import React, { useEffect, useState, FormEvent } from "react";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { AppBar } from "components/AppBar";
import { Button } from "components/Button";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { AccountRoutes } from "features/account/constants/routes";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { PageContainer } from "components/PageContainer";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { Box, Grid } from "@material-ui/core";
import { TextField } from "components/TextField";
import { TaxPaymentRoutes } from "features/taxPayment/constants/routes";
import { maskMoney } from "_utils/masks/money";
import { StoreState } from "redux/state";
import { useHistory } from "react-router-dom";
import { useMask } from "hooks/useMask";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyFormatter, parseCurrency } from "_translate";
import { updateGarePaymentData } from "features/taxPayment/redux/actions";
import { ErrorMessage } from "components/ErrorMessage";

export const PaymentGareValues: React.FC = () => {
  const [principalValue, setPrincipalValue] = useMask(maskMoney);
  const [fineValue, setFineValue] = useMask(maskMoney);
  const [interestValue, setInterestValue] = useMask(maskMoney);
  const [isValidTotalValue, setIsValidTotalValue] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = React.useState(Number);
  const [balanceIsInvalid, setBalanceIsInvalid] = React.useState(false);
  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }));

  const onValueGare = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipalValue(event.target.value);
  };
  const onFineValueGare = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFineValue(event.target.value);
  };
  const onInterestValueGare = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestValue(event.target.value);
  };

  const onNextButtonClick = () => {
    dispatch(
      updateGarePaymentData({
        principalValue: parseFloat(parseCurrency(principalValue).toFixed(2)),
        fineValue: parseFloat(parseCurrency(fineValue).toFixed(2)),
        interestValue: parseFloat(parseCurrency(interestValue).toFixed(2)),
      })
    );
    history.push(TaxPaymentRoutes.paymentGareDueDate);
  };
  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData());
    history.replace(AccountRoutes.home);
  };

  React.useEffect(() => {
    setValueInput(
      Number(
        (isNaN(parseCurrency(principalValue))
          ? 0
          : parseCurrency(principalValue)) +
          (isNaN(parseCurrency(fineValue)) ? 0 : parseCurrency(fineValue)) +
          (isNaN(parseCurrency(interestValue))
            ? 0
            : parseCurrency(interestValue))
      )
    );
    setIsValidTotalValue(
      Number(valueInput) > 0 && Number(valueInput) <= balance
    );
    setBalanceIsInvalid(Number(valueInput) > balance);
  }, [principalValue, fineValue, interestValue, valueInput]);

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={<ProcessDescriptionHeader title="Impostos - Gare" />}
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Valor Principal"
                value={
                  isNaN(parseCurrency(principalValue))
                    ? CurrencyFormatter.format(0)
                    : principalValue
                }
                placeholder="R$ 0,00"
                onChange={onValueGare}
                data-test-id="gare-value"
              />
            </Grid>

            <Grid item>
              <TextField
                label="Multa"
                value={
                  isNaN(parseCurrency(fineValue))
                    ? CurrencyFormatter.format(0)
                    : fineValue
                }
                onChange={onFineValueGare}
                placeholder="R$ 0,00"
                data-test-id="fine-value-gare"
              />
            </Grid>

            <Grid item>
              <TextField
                label="Juros"
                value={
                  isNaN(parseCurrency(interestValue))
                    ? CurrencyFormatter.format(0)
                    : interestValue
                }
                placeholder="R$ 0,00"
                onChange={onInterestValueGare}
                data-test-id="interest-value-gare"
              />
            </Grid>
            <Box>
              {balanceIsInvalid && (
                <ErrorMessage message={"Saldo insuficiente"} />
              )}
            </Box>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                disabled={!isValidTotalValue}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  );
};
