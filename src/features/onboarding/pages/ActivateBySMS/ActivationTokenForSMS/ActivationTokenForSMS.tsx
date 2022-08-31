import React from 'react'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { TokenInput } from 'features/onboarding/components/inputs/TokenInput'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import {
  closeAlert,
  validateActivationToken,
} from 'features/onboarding/redux/actions'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { PageContainer } from 'components/PageContainer'
import { Icon } from 'components/Icon'

interface ResendTokenProps {
  tokenRoute: string
}

export const ActivationToken: React.FC<ResendTokenProps> = ({
  tokenRoute,
}: ResendTokenProps) => {
  const [token, setToken] = React.useState('')
  const { onboardingForm, loading, errorMessage } = useSelector(
    (state: StoreState) => state.onboarding,
  )
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (onboardingForm?.phoneNumber)
      history.push(OnboardingRoutes.createNameForSMS)
  }, [history, onboardingForm])

  const onCancelButtonClick = () => {
    history.go(-1)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.length === 6) dispatch(validateActivationToken(token))
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={OnboardingRoutes.welcome}
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
            title="Ative sua Conta"
            subtitle="Código de Validação"
            description="Informe o Token que você recebeu por SMS para continuar o cadastro."
          />
        }
        main={
          <React.Fragment>
            <Grid direction="column" alignItems="center">
              <TokenInput onChange={setToken} value={token} />
            </Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={token.length !== 6}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
