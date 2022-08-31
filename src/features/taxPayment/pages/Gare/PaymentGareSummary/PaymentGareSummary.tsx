import React from 'react'
import { Grid } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { DetailsGareDescription } from 'features/taxPayment/components/DetailsGareDescription'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { GAREType } from 'features/taxPayment/redux/models/enum'
import {
  createGarePayment,
  updateGarePaymentData,
} from 'features/taxPayment/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { SuccessTaxPaymentState } from 'features/taxPayment/redux/state'
import { OperationType } from 'features/account/redux/models/operationType'

export const PaymentGareSummary: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const garePayment = useSelector((state: StoreState) => state.taxPayment)
  const garePaymentData = useSelector(
    (state: StoreState) => state.taxPayment.gare!,
  )
  const { loading, errorMessage } = garePayment
  const { principalValue, fineValue, interestValue } = garePaymentData
  const totalValue: number = parseFloat(
    (
      Number(principalValue) +
      Number(fineValue) +
      Number(interestValue)
    ).toFixed(2),
  )

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createGarePayment())
    }
    setOpenAuthorizationSheet(false)
  }
  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData())
    history.replace(AccountRoutes.home)
  }

  React.useEffect(() => {
    if (garePayment instanceof SuccessTaxPaymentState) {
      history.push({
        pathname: TaxPaymentRoutes.paymentGareConclude,
        state: OperationType.garePayment,
      })
      dispatch(updateGarePaymentData())
    }
  }, [garePayment])

  React.useEffect(() => {
    dispatch(
      updateGarePaymentData({
        totalValue: totalValue,
      }),
    )
  }, [dispatch])

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
            title="Impostos - GARE"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados do pagamento."
          />
        }
        main={
          <DetailsGareDescription
            type={GAREType[garePayment.gare?.GAREType!]}
            taxPayer={garePayment.gare?.contributorTaxId}
            referenceNumber={garePayment.gare
              ?.referenceNumber!.substr(0, 2)
              .concat('/')
              .concat(garePayment.gare?.referenceNumber!.substr(2, 5))}
            codeRevenue={Number(garePayment.gare?.codeRevenue!)}
            quoteNumberNotification={Number(
              garePayment.gare?.quoteNumberNotification!,
            )}
            principalValue={Number(garePayment.gare?.principalValue)}
            fineValue={Number(garePayment.gare?.fineValue)}
            interestValue={Number(garePayment.gare?.interestValue)}
            totalValue={Number(garePayment.gare?.totalValue)}
            dueDate={garePayment.gare?.dueDate!}
            paymentDate={garePayment.gare?.paymentDate!}
            description={garePayment.gare?.description!}
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
  )
}
