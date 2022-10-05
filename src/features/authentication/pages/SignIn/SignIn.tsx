/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Typography } from '@material-ui/core'
import { Alert } from 'components/Alert'
import { LoginButton } from 'features/authentication/components/LoginButton'
import { AuthenticationTitle } from 'features/authentication/components/AuthenticationTitle/AuthenticationTitle'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import {
  LoadingAuthState,
  SuccessAuthState,
} from 'features/authentication/redux/state'

import { useMask } from 'hooks/useMask'
import { maskCpf } from '_utils/masks/taxPayer'
import { useStyle } from './SignIn.style'
import { login, logout as signOut } from 'features/authentication/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AccountRoutes } from 'features/account/constants/routes'
import { TextField } from 'components/TextField'
import { PasswordField } from 'components/PasswordField'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { ForgotPassword } from 'features/authentication/components/ForgotPassword'
import { useToken } from 'hooks/useToken'
import { validateToken } from 'features/authentication/utils'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { SaveTaxId } from 'features/authentication/components/SaveTaxId'
import { SwitchIOS } from 'components/SwitchIOS'
import { CookiesProvider, useCookies } from 'react-cookie'
import { colors, theme } from '_config/theme'
import { GreatButton } from 'components/GreatButton'

export const SignIn: React.FC = () => {
  const [passwordInput, setPasswordInput] = React.useState('')
  const authState = useSelector((state: StoreState) => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const [taxIdInput, setCpfInput] = useMask(maskCpf)
  const style = useStyle()
  const { acceptedTerms, firstAccess } = useSelector((store: StoreState) => ({
    acceptedTerms: store.auth.user?.acceptedTerms,
    firstAccess: store.auth.user?.isFirstAccess,
  }))
  const [validationToken, setTokenIsValid] = React.useState(Boolean)
  const token = useToken()
  const [switchAlternateState, setSwitchAlternateState] =
    React.useState(Boolean)
  const [onChange, setOnChange] = React.useState(Boolean)
  const [cookies, setCookie, removeCookie] = useCookies(['login-token'])

  React.useEffect(() => {
    if (token && !validateToken(token)) {
      setTokenIsValid(true)
      dispatch(signOut())
    } else if (authState instanceof SuccessAuthState) {
      if (!acceptedTerms) history.push(OnboardingRoutes.terms)
      else if (firstAccess) history.push(AuthenticationRoutes.temporaryPassword)
      else history.push(AccountRoutes.home)
    }
  }, [token, authState])

  React.useEffect(() => {
    dispatch(signOut())
  }, [history])

  React.useEffect(() => {
    if (localStorage.getItem('TaxId')) {
      setSwitchAlternateState(true)
      setOnChange(true)
    } else {
      setSwitchAlternateState(false)
      localStorage.removeItem('TaxId')
      removeCookie('login-token')
    }
  }, [localStorage])

  const onCpfChange = (event: any) => {
    setCpfInput(event.target.value)
  }

  const onPasswordChange = (event: any) => {
    setPasswordInput(event.target.value)
  }

  const storageTaxId = () => {
    if (switchAlternateState === false) {
      setSwitchAlternateState(true)

      localStorage.setItem('TaxIdLogin', taxIdInput)

      const taxId = localStorage.getItem('TaxIdLogin')

      setCpfInput(taxId!)
      const maskCpfDigits = taxIdInput
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '***.$2')
        .replace(/(\d{3})(\d{1,2})/, '***-$2')
        .replace(/(-\d{2})\d+?$/, '$1')

      localStorage.setItem('TaxId', maskCpfDigits)
      setOnChange(true)
    } else {
      setSwitchAlternateState(false)
      setOnChange(false)
      localStorage.removeItem('TaxId')
      localStorage.removeItem('TaxIdLogin')
    }
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()

    dispatch(
      login(
        taxIdInput,
        passwordInput,
        switchAlternateState,
        cookies['login-token'],
      ),
    )
    localStorage.removeItem('TaxIdLogin')
  }

  const passwordIsValid =
    passwordInput.length >= 8 && passwordInput.length <= 16
  const isValid =
    (taxIdInput.length === 14 || cookies['login-token']) && passwordIsValid

  return (
    <CookiesProvider>
      <Container maxWidth="xs" className={style.container}>
      
        {/* SESSION EXPIRED ALERT */}
        {validationToken && (
          <Alert
            title="Aviso!"
            message="Sua sessão expirou."
            severity={'error'}
          />
        )}

        {/* ERROR LAYOUT ALERT */}
        {authState.errorMessage && (
          <Alert
            title="Erro"
            message={authState.errorMessage}
            severity={'error'}
          />
        )}

        {/* LAYOUT SIGNIN PAGE */}
        <Grid
          container
          direction="column"
          className={style.contentWrapper}
          component="form"
          onSubmit={onSubmit}
        >
          <Typography 
            className={style.loginTitle}
            align="center"
            data-test-id="authentication-login"
          >
            Login
          </Typography>

          <Grid item className={style.header}>
            <AuthenticationTitle />
          </Grid>

          <Grid item container direction="column" spacing={3}>
            <Grid item>
              <TextField
                variant="outlined"
                value={
                  localStorage.getItem('TaxId')
                    ? localStorage.getItem('TaxId')!
                    : taxIdInput
                }
                inputMode="numeric"
                label=""
                placeholder="CPF - Apenas números"
                onChange={onCpfChange}
                data-test-id="taxid-field"
                disabled={onChange}
              />
            </Grid>

            <Grid item>
              <PasswordField
                variant="outlined"
                placeholder="Senha"
                label=""
                value={passwordInput}
                onChange={onPasswordChange}
              />
            </Grid>

            <Grid item className={style.forgotPassword}>
              <ForgotPassword />
            </Grid>
            

            <Grid item>
              <LoginButton
                disabled={!isValid}
                palette="primary"
                size="large"
              >
                Entrar
              </LoginButton>
            </Grid>
            
            <Grid item>
              <SaveTaxId
                text={'Lembre de mim'}
                onClick={storageTaxId}
                save={<SwitchIOS checked={switchAlternateState} />}
              />
            </Grid>
            
          </Grid>
        </Grid>
        <Loader open={authState instanceof LoadingAuthState} />
      </Container>
    </CookiesProvider>
  )
}
