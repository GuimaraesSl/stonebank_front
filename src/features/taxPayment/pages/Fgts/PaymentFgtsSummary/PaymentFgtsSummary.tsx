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
import { DetailsFgtsDescription } from 'features/taxPayment/components/DetailsFgtsDescription'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import {
  createFgtsPayment,
  updateFgtsPaymentData,
} from 'features/taxPayment/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { SuccessTaxPaymentState } from 'features/taxPayment/redux/state'
import { OperationType } from 'features/account/redux/models/operationType'

export const PaymentFgtsSummary: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const history = useHistory()
  const fgts = useSelector((state: StoreState) => state.taxPayment.fgts)
  const taxPayment = useSelector((state: StoreState) => state.taxPayment)
  const dispatch = useDispatch()
  const { loading, errorMessage } = taxPayment

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createFgtsPayment())
    }
    setOpenAuthorizationSheet(false)
  }

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  React.useEffect(() => {
    if (taxPayment instanceof SuccessTaxPaymentState) {
      history.push({
        pathname: TaxPaymentRoutes.paymentFgtsConclude,
        state: OperationType.fgtsPayment,
      })
      dispatch(updateFgtsPaymentData())
    }
  }, [taxPayment])

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
            title="Impostos - FGTS"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados do pagamento."
          />
        }
        main={
          <DetailsFgtsDescription
            taxPayer={fgts?.contributorTaxId!}
            paymentDate={fgts?.paymentDate!}
            codeRevenue={fgts?.codeRevenue!}
            principalValue={fgts?.principalValue!}
            fgtsIdentifier={fgts?.fgtsIdentifier!}
            socialConnectivityCode={fgts?.socialConnectivityCode!}
            socialConnectivityDigit={fgts?.socialConnectivityDigit!}
            description={fgts?.description!}
            barCode={fgts?.barCode!}
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
