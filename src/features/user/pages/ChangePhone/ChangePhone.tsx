import React from 'react'
import { AppBar } from 'components/AppBar'
import { useMask } from 'hooks/useMask'
import { maskPhone } from '_utils/masks/phone'
import '_assets/css/forms/mainform.scss'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { TextField } from 'components/TextField'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { closeAlert } from 'features/account/redux/actions'
import { updateUserInformation } from 'features/user/redux/actions'
import { UserRoutes } from 'features/user/constants/routes'
import { SuccessUpdateUserInformationState } from 'features/user/redux/state'
import { updateAuthData } from 'features/authentication/redux/actions'

export const ChangePhone: React.FC = () => {
  const [phone, setPhone] = useMask(maskPhone)

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const [validatedToken, setValidatedToken] = React.useState(false)

  const userInformationState = useSelector(
    (store: StoreState) => store.userInformation,
  )

  const { loading, errorMessage } = userInformationState

  const { user } = useSelector((store: StoreState) => store.auth)

  const history = useHistory()

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (
      validatedToken &&
      userInformationState instanceof SuccessUpdateUserInformationState
    ) {
      history.push(UserRoutes.changeConclude)
      dispatch(updateAuthData({ ...user, phoneNumber: phone }))
    }
  }, [dispatch, history, userInformationState, phone, user, validatedToken])

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value)

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
          phoneNumber: phone,
        }),
      )
    }

    setOpenAuthorizationSheet(false)
  }

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
            data-test-id="change-phone-number"
            title="Editar Telefone"
            subtitle={`Sua telefone atual é: ${maskPhone(
              user?.phoneNumber ?? '',
            )}`}
          />
        }
        main={
          <TextField
            label="Número de telefone"
            placeholder="Digite apenas números"
            inputMode="numeric"
            value={phone}
            required
            onChange={onPhoneChange}
            data-test-id="phone-number"
          />
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={phone.length < 16}
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
