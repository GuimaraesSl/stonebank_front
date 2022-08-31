import React from 'react'
import { Grid } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { StoreState } from 'redux/state'
import {
  logout,
  resetPassword,
  updateAuthData,
} from 'features/authentication/redux/actions'
import {
  ErrorAuthState,
  SuccessResetPasswordState,
} from 'features/authentication/redux/state'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useHistory } from 'react-router-dom'
import { useMask } from 'hooks/useMask'
import { maskCpf } from '_utils/masks/taxPayer'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardArrowRight } from '@material-ui/icons'
import { nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { ConfirmTokenSheet } from 'components/ConfirmTokenSheet'

export const RecoverPassword: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [taxIdInput, setCpfInput] = useMask(maskCpf)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const authState = useSelector((state: StoreState) => state.auth)
  const { resetPasswordForm, loading } = authState

  const isValid = taxIdInput.length === 14 || taxIdInput.length === 18

  React.useEffect(() => {
    if (authState instanceof ErrorAuthState) dispatch(updateAuthData({}))
  }, [])

  React.useEffect(() => {
    if (authState instanceof SuccessResetPasswordState)
      history.push(AuthenticationRoutes.confirmRecoverPwd)
  }, [authState])

  const _resetState = () => dispatch(logout())

  const onCpfChange = (event: any) => {
    setCpfInput(event.target.value)
  }

  const onSubmit = () => {
    setOpenAuthorizationSheet(true)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(
        resetPassword({
          ...resetPasswordForm,
          taxId: taxIdInput,
        }),
      )
    }
    setOpenAuthorizationSheet(false)
  }

  return (
    <PageContainer>
      {authState.errorMessage && (
        <Alert
          title="Erro"
          message={authState.errorMessage}
          severity={'error'}
        />
      )}
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <ProcessDescriptionHeader
            title="Recuperar senha"
            subtitle="Informe seu CPF"
            description="Você receberá uma senha temporária para acessar o aplicativo, essa senha deve ser mudada após o primeiro acesso."
          />
        }
        main={
          <Grid item>
            <TextField
              variant="filled"
              value={taxIdInput}
              inputMode="numeric"
              label="CPF"
              placeholder="Digite apenas números"
              onChange={onCpfChange}
            />
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={!isValid}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
            onBackButtonClick={_resetState}
          />
        }
      />
      <Loader open={loading} />
      <ConfirmTokenSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
        taxId={taxIdInput}
      />
    </PageContainer>
  )
}
