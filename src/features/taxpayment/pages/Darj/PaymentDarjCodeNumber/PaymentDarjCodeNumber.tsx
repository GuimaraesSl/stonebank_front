import React from 'react'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Box, Grid } from '@material-ui/core'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { TextField } from 'components/TextField'
import { useMask } from 'hooks/useMask'
import { maskMoney } from '_utils/masks/money'
import { numericOnly } from '_utils/masks/generics'
import { CurrencyFormatter, parseCurrency } from '_translate'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateDarjPaymentData } from 'features/taxPayment/redux/actions'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { ErrorMessage } from 'components/ErrorMessage'

export const PaymentDarjCodeNumber: React.FC = () => {
  const history = useHistory()
  const [monetaryValue, setmonetaryValueInput] = useMask(maskMoney)
  const [codeRevenue, setCodeRevenue] = useMask(numericOnly)
  const [stateRegistration, setStateRegistration] = React.useState('')
  const [isValidValue, setIsValidValue] = React.useState(true)
  const [contributortaxId, setContributortaxId] = useMask(maskTaxPayer)
  const [originDocument, setOriginDocument] = useMask(numericOnly)
  const [rateValueType, setRateValueType] = useMask(numericOnly)
  const dispatch = useDispatch()
  const [balanceIsInvalid, setBalanceIsInvalid] = React.useState(false)
  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))

  const onMonitaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmonetaryValueInput(event.target.value)
  }
  const onCodeRevenue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeRevenue(event.target.value)
  }

  const onContributortaxId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContributortaxId(event.target.value)
  }

  const onStateRegistration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateRegistration(event.target.value)
  }

  const onOriginDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginDocument(event.target.value)
  }

  const onRateValueType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRateValueType(event.target.value)
  }

  React.useEffect(() => {
    setIsValidValue(
      !(
        codeRevenue &&
        monetaryValue &&
        (contributortaxId.length === 14 || contributortaxId.length === 18) &&
        stateRegistration.length > 0 &&
        stateRegistration.length <= 8 &&
        Number(parseCurrency(monetaryValue)) <= balance
      ),
    )
  }, [codeRevenue, monetaryValue, contributortaxId, stateRegistration])

  const onCancelButtonClick = () => {
    dispatch(updateDarjPaymentData())
    history.replace(AccountRoutes.home)
  }

  React.useEffect(() => {
    const convertedValue = parseCurrency(
      isNaN(parseCurrency(monetaryValue))
        ? CurrencyFormatter.format(0)
        : monetaryValue,
    )
    setBalanceIsInvalid(convertedValue > balance)
  }, [monetaryValue])

  const onNextButtonClick = () => {
    history.push(TaxPaymentRoutes.paymentDarjValues)
    dispatch(
      updateDarjPaymentData({
        codeRevenue: codeRevenue,
        monetaryValue: parseFloat(parseCurrency(monetaryValue).toFixed(2)),
        contributorTaxId: maskTaxPayer(contributortaxId),
        stateRegistration: stateRegistration,
        originDocument: Number(originDocument),
        rateValueType: Number(rateValueType),
      }),
    )
  }

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
          <React.Fragment>
            <ProcessDescriptionHeader title="Impostos - DARJ" />
          </React.Fragment>
        }
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Código da Receita"
                value={codeRevenue}
                onChange={onCodeRevenue}
                data-test-id="code-revenue"
              />
            </Grid>
            <Grid item>
              <TextField
                label="CPF/CNPJ do Contribuidor"
                value={contributortaxId}
                onChange={onContributortaxId}
                data-test-id="contributor-taxid"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Valor Monetário"
                value={
                  isNaN(parseCurrency(monetaryValue))
                    ? CurrencyFormatter.format(0)
                    : monetaryValue
                }
                onChange={onMonitaryChange}
                data-test-id="monetary-value"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Registro Estadual"
                value={stateRegistration}
                onChange={onStateRegistration}
                data-test-id="state-registration"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Documento de Origem"
                value={originDocument}
                onChange={onOriginDocument}
                data-test-id="origin-document"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Tipo de taxa"
                value={rateValueType}
                onChange={onRateValueType}
                data-test-id="rate-value-type"
              />
            </Grid>
            <Box>
              {balanceIsInvalid && (
                <ErrorMessage message={'Saldo insuficiente'} />
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
                disabled={isValidValue}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
