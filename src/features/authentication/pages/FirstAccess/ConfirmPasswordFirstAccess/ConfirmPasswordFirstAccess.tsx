import React from 'react'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PasswordField } from 'components/PasswordField'
import { Grid } from '@material-ui/core'
import { useStyles } from './ConfirmPasswordFirstAccess.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import {
  changePasswordFirstAccess,
  logout,
} from 'features/authentication/redux/actions'
import { Loader } from 'components/Loader'
import {
  ChangePasswordLoadingState,
  ChangePasswordSuccessState,
  ChangePasswordErrorState,
} from 'features/authentication/redux/state'
import { ErrorMessage } from 'components/ErrorMessage'

export const ConfirmPasswordFirstAccess: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const style = useStyles()

  const [rePasswordInput, setRePasswordInput] = React.useState('')

  const onCancelButtonClick = () => {
    dispatch(logout())
    history.go(-3)
  }

  const { userFirstAccessForm } = useSelector((store: StoreState) => store.auth)

  const onNextButtonClick = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      changePasswordFirstAccess({
        ...userFirstAccessForm,
        confirmationNewPassword: rePasswordInput,
      }),
    )
  }

  const onRePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRePasswordInput(event.target.value)

  const onSamePassword = (password: string, rePassword: string) => {
    if (!(password === rePassword)) return true
  }

  const condition = onSamePassword(
    userFirstAccessForm?.newPassword!,
    rePasswordInput,
  )

  const authState = useSelector((state: StoreState) => state.auth)

  React.useEffect(() => {
    if (authState instanceof ChangePasswordSuccessState)
      history.push(AuthenticationRoutes.changePasswordCompleted)

    if (authState instanceof ChangePasswordErrorState) history.goBack()
  }, [authState, history])

  return (
    <ProcessPageLayout
      appBar={
        <AppBar
          homeRoute={AuthenticationRoutes.changePasswordFirstAccess}
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
          title="Criar senha"
          subtitle="Crie uma senha para sua conta"
          description="Essa é sua senha de acesso ao APLICATIVO e deve seguir os critérios abaixo."
        />
      }
      main={
        <Grid
          container
          direction="column"
          component="form"
          onSubmit={onNextButtonClick}
        >
          <Grid item>
            <PasswordField
              value={userFirstAccessForm?.newPassword!}
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
          {condition && (
            <ErrorMessage message="A senha não corresponde à senha anterior" />
          )}
          <Loader open={authState instanceof ChangePasswordLoadingState} />
        </Grid>
      }
      footer={
        <ProcessPageFooter
          primaryButton={
            <Button
              disabled={condition}
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
