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
import { Container, Grid } from '@material-ui/core'
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
import { GreatButton } from 'components/GreatButton'

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
    <Container maxWidth="xs" className={style.container}>
  
      <ProcessDescriptionHeader
        title="Criar senha"
        description="Para utilizar  nossos serviços , você deve estar de acordo com os termos de uso"
      />

      <Grid
        container
        direction="column"
        component="form"
        onSubmit={onNextButtonClick}
      >
        <Grid item>
          <PasswordField
            label="Nova Senha"
            value={userFirstAccessForm?.newPassword!}
            placeholder="Digite sua nova senha"
          />
        </Grid>

        <Grid item className={style.gridItem}>
          <PasswordField
            label="Confirmar Senha"
            value={rePasswordInput}
            placeholder="Digite novamente sua nova senha"
            onChange={onRePasswordChange}
          />
        </Grid>
        {condition && (
          <ErrorMessage message="A senha não corresponde à senha anterior" />
        )}
        <Loader open={authState instanceof ChangePasswordLoadingState} />
      </Grid>

      <Grid item className={style.ButtonWrapper}>
        <GreatButton
          palette="primary"
          size="large"
          route={AuthenticationRoutes.signIn}
          id="confirm-pasword-button"
        >
          Salvar
        </GreatButton>
      </Grid>

    </Container>
  )
}
