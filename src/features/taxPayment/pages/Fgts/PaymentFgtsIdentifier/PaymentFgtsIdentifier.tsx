import React, { useEffect } from 'react'
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
import { useStyles } from 'features/taxPayment/pages/Fgts/PaymentFgtsIdentifier/PaymentFgtsIdentifier.style'
import { useDispatch } from 'react-redux'
import { updateFgtsPaymentData } from 'features/taxPayment/redux/actions'
import { useMask } from 'hooks/useMask'
import { numericOnly } from '_utils/masks/generics'
import { useState } from 'react'

export const PaymentFgtsIdentifier: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const [fgtsIdentifier, setFgtsIdentifier] = useState('')
  const [socialConnectivityCode, setSocialConnectivityCode] =
    useMask(numericOnly)
  const [socialConnectivityDigit, setSocialConnectivityDigit] =
    useMask(numericOnly)
  const [isValidValue, setIsValidValue] = useState(true)

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  const onNextButtonClick = () => {
    dispatch(
      updateFgtsPaymentData({
        fgtsIdentifier: fgtsIdentifier,
        socialConnectivityCode: Number(socialConnectivityCode),
        socialConnectivityDigit: Number(socialConnectivityDigit),
      }),
    )
    history.push(TaxPaymentRoutes.paymentFgtsValues)
  }

  const onFgtsIdentifier = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFgtsIdentifier(event.target.value)
  }

  const onSocialConnectivityCode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSocialConnectivityCode(event.target.value)
  }

  const onSocialConnectivityDigit = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSocialConnectivityDigit(event.target.value)
  }

  useEffect(() => {
    setIsValidValue(
      !(
        fgtsIdentifier &&
        socialConnectivityDigit.length === 1 &&
        socialConnectivityCode
      ),
    )
  }, [fgtsIdentifier, socialConnectivityCode, socialConnectivityDigit])

  const dispatch = useDispatch()

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
          <Grid className={styles.descriptionHeader}>
            <ProcessDescriptionHeader title="Impostos - FGTS" />
          </Grid>
        }
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Identificador do FGTS"
                value={fgtsIdentifier}
                onChange={onFgtsIdentifier}
                data-test-id="fgts-identifier"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Código de Conexão Social"
                value={socialConnectivityCode}
                onChange={onSocialConnectivityCode}
                data-test-id="social-connectivity-code"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Dígito"
                value={socialConnectivityDigit}
                onChange={onSocialConnectivityDigit}
                data-test-id="social-connectivity-digit"
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={isValidValue}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
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
