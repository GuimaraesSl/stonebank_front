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
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './CreatePasswordForCard.style'
import { Validator } from 'components/Validator/Validator'
import {
  validateLowerUpperNumber,
  validateLength,
  validateSpecial,
} from '_utils/validate'
import { useDispatch } from 'react-redux'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'

export const CreatePasswordForCard: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const [password, setPassword] = React.useState('')
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [passwordLengthIsValid, setPasswordLenghtIsValid] = React.useState<
    boolean | undefined
  >()
  const [passwordLowerIsValid, setPasswordLowerIsValid] = React.useState<
    boolean | undefined
  >()
  const [passwordUpperIsValid, setPasswordUpperIsValid] = React.useState<
    boolean | undefined
  >()
  const [passwordSpecialIsValid, setPasswordSpecialIsValid] = React.useState<
    boolean | undefined
  >()
  const [passwordValidateNumber, setPasswordValidateNUmber] = React.useState<
    boolean | undefined
  >()

  const condition =
    passwordLengthIsValid &&
    passwordLowerIsValid &&
    passwordUpperIsValid &&
    passwordSpecialIsValid &&
    passwordValidateNumber

  React.useEffect(() => {
    setDisableNextButton(!(condition && passwordLengthIsValid))
  }, [condition, passwordLengthIsValid])

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)

  const onValidateLength = (value: boolean | undefined) => {
    setPasswordLenghtIsValid(value)
  }

  const onValidateLowerUpperNumber = (value: boolean | undefined) => {
    setPasswordLowerIsValid(value)
    setPasswordUpperIsValid(value)
    setPasswordValidateNUmber(value)
  }

  const onCancelButtonClick = () => {
    history.replace(OnboardingRoutes.activateAccount)
  }

  const onNextButtonClick = () => {
    dispatch(
      updateOnboardingForm({
        password,
      }),
    )
    history.push(OnboardingRoutes.confirmPasswordForCard)
  }

  return (
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
          spacing={3}
          onSubmit={onNextButtonClick}
          data-test-id="next-button"
        >
          <Grid item component="form" className={styles.input}>
            <PasswordField
              label="Senha"
              value={password}
              placeholder="Digite a senha..."
              onChange={onPasswordChange}
              data-test-id="password-change-button"
            />
          </Grid>

          <Grid item>
            <Typography className={styles.description}>
              Sua senha deve atender os critérios a baixo:
            </Typography>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Validator
                  value={password}
                  description={'Ao menos um caractere especial'}
                  isValid={passwordSpecialIsValid}
                  validation={validateSpecial}
                  onValidate={setPasswordSpecialIsValid}
                  strictValidation={false}
                />
              </Grid>
              <Grid item>
                <Validator
                  value={password}
                  description={'No mínimo 8 caracteres e no máximo 16'}
                  isValid={passwordLengthIsValid}
                  validation={validateLength}
                  onValidate={onValidateLength}
                  strictValidation={false}
                />
              </Grid>
              <Grid item>
                <Validator
                  value={password}
                  description={'Letras maiúsculas, minúsculas e números'}
                  isValid={
                    passwordUpperIsValid &&
                    passwordLowerIsValid &&
                    passwordValidateNumber
                  }
                  validation={() => validateLowerUpperNumber(password)}
                  onValidate={onValidateLowerUpperNumber}
                  strictValidation={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
      footer={
        <ProcessPageFooter
          primaryButton={
            <Button
              disabled={disableNextButton}
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
  )
}
