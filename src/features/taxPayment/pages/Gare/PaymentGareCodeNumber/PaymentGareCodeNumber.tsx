import React, { useEffect, useState, FormEvent } from 'react'
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
import { Grid } from '@material-ui/core'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { TextField } from 'components/TextField'
import { numericOnly } from '_utils/masks/generics'
import { useMask } from 'hooks/useMask'
import { useDispatch, useSelector } from 'react-redux'
import { updateGarePaymentData } from 'features/taxPayment/redux/actions'
import { maskTaxPayer } from '_utils/masks/taxPayer'

export const PaymentGareCodeNumber: React.FC = () => {
  const [codeRevenue, setCodeRevenue] = useMask(numericOnly)
  const [taxIdContributor, setTaxIdContributor] = useMask(maskTaxPayer)
  const [stateRegistration, setstateRegistration] = useMask(numericOnly)
  const [quotationNumber, setQuotationNumber] = useMask(numericOnly)
  const [isValidValue, setIsValidValue] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData())
    history.replace(AccountRoutes.home)
  }

  const onNextButtonClick = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      updateGarePaymentData({
        contributorTaxId: taxIdContributor,
        codeRevenue: codeRevenue,
        quoteNumberNotification: quotationNumber,
        stateRegistration: stateRegistration,
      }),
    )
    history.push(TaxPaymentRoutes.paymentGareValues)
  }

  const onTaxIdContributor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxIdContributor(event.target.value)
  }

  const onCodeRevenue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeRevenue(event.target.value)
  }

  const onstateRegistration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstateRegistration(event.target.value)
  }

  const onQuotationNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuotationNumber(event.target.value)
  }

  React.useEffect(() => {
    setIsValidValue(
      !(
        codeRevenue &&
        quotationNumber &&
        stateRegistration &&
        (taxIdContributor.length === 14 || taxIdContributor.length === 18)
      ),
    )
  }, [codeRevenue, quotationNumber, stateRegistration, taxIdContributor])

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
            <ProcessDescriptionHeader title="Impostos - GARE" />
          </React.Fragment>
        }
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="CPF/CNPJ do contribuidor"
                value={taxIdContributor}
                onChange={onTaxIdContributor}
                data-test-id="taxid-contributor"
              />
            </Grid>
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
                label="Registro estadual"
                value={stateRegistration}
                onChange={onstateRegistration}
                data-test-id="state-registration"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Núm. de Notificação de Cotação"
                value={quotationNumber}
                onChange={onQuotationNumber}
                data-test-id="quotation-number"
              />
            </Grid>
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
