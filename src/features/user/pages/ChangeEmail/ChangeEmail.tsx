import React, { Fragment } from 'react'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { closeAlert } from 'features/account/redux/actions'
import { updateUserInformation } from 'features/user/redux/actions'
import { UserRoutes } from 'features/user/constants/routes'
import { SuccessUpdateUserInformationState } from 'features/user/redux/state'
import { updateAuthData } from 'features/authentication/redux/actions'
import { TextField } from 'components/TextField'
import { useStyles } from './ChangeEmail.style'
import { validateEmail } from '_utils/validate'

export const ChangeEmail: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(false)

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const [validatedToken, setValidatedToken] = React.useState(false)

  const { user } = useSelector((store: StoreState) => store.auth)

  const userInformationState = useSelector(
    (store: StoreState) => store.userInformation,
  )

  const { loading, errorMessage } = userInformationState

  const history = useHistory()

  const dispatch = useDispatch()
  const style = useStyles()

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  React.useEffect(() => {
    if (
      validatedToken &&
      userInformationState instanceof SuccessUpdateUserInformationState
    ) {
      history.push(UserRoutes.changeConclude)
      dispatch(updateAuthData({ ...user, mail: email }))
    }
  }, [dispatch, email, history, userInformationState, user, validatedToken])

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onCancelButtonClick = () => {
    history.go(-1)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onAuthorizationSheetClose = (isTokenValid: boolean) => {
    if (isTokenValid) {
      setValidatedToken(true)
      dispatch(
        updateUserInformation({
          mail: email,
        }),
      )
    }

    setOpenAuthorizationSheet(false)
  }

  const validateError = () => {
    if (validateEmail(email)) setError(false)
    else setError(true)
  }

  React.useEffect(() => {
    validateError()
  }, [email])

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
          <ProcessDescriptionHeader
            title="Editar email"
            subtitle={`Seu email atual é: ${user?.mail ?? ''}`}
            data-test-id="email"
          />
        }
        main={
          <Fragment>
            <TextField
              label="Edite seu email"
              error={email ? error : false}
              placeholder="seuemail@email.com"
              type="email"
              value={email}
              onChange={onEmailChange}
              variant="outlined"
              required
              data-test-id="change-email"
            />
            {email.length > 0 && error && (
              <span className={style.inputError}>E-mail inválido</span>
            )}
          </Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={error}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        description="Para autenticar a operação"
        onClose={onAuthorizationSheetClose}
      />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </PageContainer>
  )
}
