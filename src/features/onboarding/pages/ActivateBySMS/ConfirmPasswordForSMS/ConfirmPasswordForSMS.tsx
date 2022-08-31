import React from 'react'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PasswordField } from 'components/PasswordField'
import { Grid } from '@material-ui/core'
import { useStyles } from './ConfirmPasswordForSMS.style'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { closeAlert } from 'features/card/redux/actions'
import { createAccount } from 'features/onboarding/redux/actions'
import {
  SuccessOnboardingState,
  LoadingOnboardingState,
} from 'features/onboarding/redux/state'

export const ConfirmPassword: React.FC = () => {
  const history = useHistory()
  const style = useStyles()
  const dispatch = useDispatch()

  const [rePasswordInput, setRePasswordInput] = React.useState('')

  const password = useSelector(
    (state: StoreState) => state.onboarding.onboardingForm?.password,
  )
  const onboardingState = useSelector((state: StoreState) => state.onboarding)

  const onCancelButtonClick = () => {
    history.go(-9)
  }

  React.useEffect(() => {
    if (onboardingState instanceof SuccessOnboardingState)
      history.push(OnboardingRoutes.accountActivationCompletedForSMS)
  }, [onboardingState, history])

  const onNextButtonClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (onboardingState) dispatch(createAccount())
  }

  const onRePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRePasswordInput(event.target.value)

  const onSamePassword = (password: string, rePassword: string) => {
    if (!(password === rePassword)) return true
  }

  const condition = onSamePassword(password!, rePasswordInput)

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  return (
    <React.Fragment>
      <Loader open={onboardingState instanceof LoadingOnboardingState} />
      {onboardingState.errorMessage && (
        <Alert
          title="Erro"
          message={onboardingState.errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
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
            subtitle="Crie uma senha para sua conta"
            description="Essa senha deve ter 8 dígitos e deve ter ao menos uma letra."
          />
        }
        main={
          <Grid
            container
            direction="column"
            component="form"
            onSubmit={onNextButtonClick}
            data-test-id="next-button"
          >
            <Grid item>
              <PasswordField
                value={password!}
                placeholder="Digite a senha..."
              />
            </Grid>
            <Grid item className={style.gridItem}>
              <PasswordField
                label="Digite novamente a nova senha"
                value={rePasswordInput}
                placeholder="Digite a senha..."
                onChange={onRePasswordChange}
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={condition}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                data-test-id="nexts-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </React.Fragment>
  )
}
