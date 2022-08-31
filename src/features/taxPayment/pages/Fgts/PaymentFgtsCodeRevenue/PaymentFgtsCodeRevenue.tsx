import React, { useEffect, useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { updateFgtsPaymentData } from 'features/taxPayment/redux/actions'
import { maskTaxPayer } from '_utils/masks/taxPayer'

export const PaymentFgtsCodeRevenue: React.FC = () => {
  const [codeRevenue, setCodeRevenue] = useMask(numericOnly)
  const [contributorTaxId, setContributorTaxId] = useMask(maskTaxPayer)
  const [isValidValue, setIsValidValue] = useState(true)
  const history = useHistory()

  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  const onNextButtonClick = () => {
    dispatch(
      updateFgtsPaymentData({
        codeRevenue: codeRevenue,
        contributorTaxId: contributorTaxId,
      }),
    )
    history.push(TaxPaymentRoutes.paymentFgtsIdentifier)
  }

  const onCodeRevenue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeRevenue(event.target.value)
  }

  const onContributorTaxId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContributorTaxId(event.target.value)
  }

  useEffect(() => {
    setIsValidValue(
      !(
        codeRevenue &&
        (contributorTaxId.length === 14 || contributorTaxId.length === 18)
      ),
    )
  }, [codeRevenue, contributorTaxId])

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
            <ProcessDescriptionHeader title="Impostos - FGTS" />
          </React.Fragment>
        }
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="CPF/CNPJ do Contribuidor"
                value={contributorTaxId}
                onChange={onContributorTaxId}
                data-test-id="contributor-taxid"
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
