/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { useMask } from 'hooks/useMask'
import { maskBarcode } from '_utils/masks/barCode'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountBalance } from 'features/payment/components/AccountBalance'
import { ShowBalanceButton } from 'features/payment/components/ShowBalanceButton'
import { nextLabel } from 'constants/buttons/labels'
import { KeyboardArrowRight } from '@material-ui/icons'
import {
  getDetailsByNumericSequence,
  updatePaymentData,
} from 'features/payment/redux/actions'
import { useStyles } from './Home.style'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import {
  ErrorPaymentState,
  SuccessPaymentState,
} from 'features/payment/redux/state'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { Icon } from 'components/Icon'

export const Home: React.FC = () => {
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const paymentState = useSelector((state: StoreState) => state.payment)
  const { loading, errorMessage } = paymentState
  const [digitableLine, setDigitableLine] = useMask(maskBarcode)

  let displayValue = JSON.parse(localStorage.getItem('showBalance')!)
  const [showBalance, setShowBalance] = React.useState<boolean>(displayValue)

  React.useEffect(() => {
    localStorage.setItem('showBalance', JSON.stringify(showBalance))
    if (showBalance === null) setShowBalance(true)
  }, [showBalance])

  const dispatch = useDispatch()
  const styles = useStyles()
  const history = useHistory()

  const onOtherTaxPaymentClick = () => {
    history.push(TaxPaymentRoutes.otherPayment)
  }

  React.useEffect(() => {
    setDisableNextButton(digitableLine.length !== 55)
  }, [digitableLine.length])

  React.useEffect(() => {
    if (paymentState instanceof SuccessPaymentState)
      history.push(PaymentRoutes.details)
  }, [paymentState])

  React.useEffect(() => {
    if (paymentState instanceof ErrorPaymentState)
      dispatch(updatePaymentData({}))
  }, [])

  const onBarCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDigitableLine(event.target.value)
  }

  const onShowBalanceButtonClick = () => setShowBalance(!showBalance)

  const onBackButtonClick = () => dispatch(updatePaymentData())

  const onSubmit = () => {
    if (!disableNextButton)
      dispatch(getDetailsByNumericSequence(digitableLine.replace(/\s/g, '')))
  }

  const onScanBarcodeClick = () => {
    history.push(PaymentRoutes.barcodeScanner)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <React.Fragment>
            <ProcessDescriptionHeader
              title="Pagamentos"
              subtitle="Boletos e contas de consumo"
              description="Para pagamentos de boletos e contas de consumo como água, luz, cartão de crédito, etc."
            />
            <Grid container className={styles.optionsSubheader}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container>
                    <Typography
                      data-test-id="balance"
                      className={styles.balance}
                    >
                      Seu saldo:&nbsp;
                    </Typography>
                    <AccountBalance variant="body1" show={showBalance} />
                  </Grid>
                </Grid>
                <Grid item>
                  <ShowBalanceButton
                    showBalance={showBalance}
                    onClick={onShowBalanceButtonClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box mb={3} component="form" onSubmit={onSubmit}>
              <TextField
                multiline={true}
                rows="2"
                inputMode="numeric"
                label="Linha digitável"
                value={digitableLine}
                onChange={onBarCodeChange}
                data-test-id="input-barcode"
              />
            </Box>

            <Box mb={2}>
              <Typography variant="caption">Use a câmera</Typography>
            </Box>
            <Box mb={4} display="flex" justifyContent="space-between">
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<Icon name={'camera'} />}
                  onClick={onScanBarcodeClick}
                >
                  Ler código de barras
                </Button>
              </Box>
              {/* <Box>
                <Button variant="outlined" startIcon={<Pix />}>
                  Pagar com pix
                </Button>
              </Box> */}
            </Box>
            <Box display="flex" justifyContent="center">
              <ButtonWithFloatingIcon
                icon={<Icon name={'buttonBg'} />}
                className={styles.otherTaxPaymentButton}
                onClick={onOtherTaxPaymentClick}
                data-test-id="other-payment-button"
              >
                Outros pagamentos
              </ButtonWithFloatingIcon>
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={disableNextButton}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
            onBackButtonClick={onBackButtonClick}
          />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity={'error'} />
      )}
    </PageContainer>
  )
}
