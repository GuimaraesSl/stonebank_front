import React from "react";
import { Grid } from "@material-ui/core";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { AppBar } from "components/AppBar";
import { AuthorizationSheet } from "components/AuthorizationSheet";
import { Button } from "components/Button";
import { PageContainer } from "components/PageContainer";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { cancelLabel, concludeLabel } from "constants/buttons/labels";
import { AccountRoutes } from "features/account/constants/routes";
import { DetailsDarjDescription } from "features/taxpayment/components/DetailsDarjDescription";
import { TaxPaymentRoutes } from "features/taxPayment/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StoreState } from "redux/state";
import {
  createDarjPayment,
  updateDarjPaymentData,
} from "features/taxPayment/redux/actions";
import { SuccessTaxPaymentState } from "features/taxPayment/redux/state";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
import { OperationType } from "features/account/redux/models/operationType";

export const PaymentDarjSummary: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const taxPaymentDARJState = useSelector(
    (store: StoreState) => store.taxPayment.darj!
  );
  const taxPaymentDARJData = useSelector(
    (store: StoreState) => store.taxPayment
  );
  const { loading, errorMessage } = taxPaymentDARJData;
  const totalValue =
    taxPaymentDARJState?.principalValue! +
    taxPaymentDARJState?.fineValue! +
    taxPaymentDARJState?.interestValue! +
    taxPaymentDARJState?.monetaryValue!;

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createDarjPayment());
    }
    setOpenAuthorizationSheet(false);
  };

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true);
  };

  const onCancelButtonClick = () => {
    dispatch(updateDarjPaymentData());
    history.replace(AccountRoutes.home);
  };

  React.useEffect(() => {
    if (taxPaymentDARJData instanceof SuccessTaxPaymentState) {
      history.push({
        pathname: TaxPaymentRoutes.paymentDarjConclude,
        state: OperationType.darjPayment,
      });

      dispatch(updateDarjPaymentData());
    }
  }, [taxPaymentDARJData]);

  React.useEffect(() => {
    dispatch(
      updateDarjPaymentData({
        totalValue: totalValue,
      })
    );
  }, [dispatch]);

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
        header={
          <ProcessDescriptionHeader
            title="Impostos - DARJ"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados do pagamento."
          />
        }
        main={
          <DetailsDarjDescription
            contributorTaxId={taxPaymentDARJState?.contributorTaxId!}
            referenceNumber={taxPaymentDARJState?.referenceNumber}
            principalValue={Number(taxPaymentDARJState?.principalValue)}
            fineValue={Number(taxPaymentDARJState?.fineValue)}
            interestValue={Number(taxPaymentDARJState?.interestValue)}
            monetaryValue={Number(taxPaymentDARJState?.monetaryValue)}
            totalValue={taxPaymentDARJState?.totalValue!}
            rateValue={Number(taxPaymentDARJState?.rateValue)}
            dueDate={taxPaymentDARJState?.dueDate}
            paymentDate={taxPaymentDARJState?.paymentDate!}
            tags={taxPaymentDARJState?.tags}
            codeRevenue={taxPaymentDARJState?.codeRevenue!}
            stateRegistration={taxPaymentDARJState?.stateRegistration}
            originDocument={Number(taxPaymentDARJState?.originDocument)}
            rateValueType={Number(taxPaymentDARJState?.rateValueType)}
            description={taxPaymentDARJState?.description}
          />
        }
        footer={
          <Grid>
            <ProcessPageFooter
              primaryButton={
                <Button
                  palette="primary"
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onConcludeButtonClick}
                  data-test-id="conclude-button"
                >
                  {concludeLabel}
                </Button>
              }
            />
          </Grid>
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  );
};
