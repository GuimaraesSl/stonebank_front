import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { AccountRoutes } from 'features/account/constants/routes'
import { lettersOnly } from '_utils/masks/generics'
import { useMask } from 'hooks/useMask'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { closeAlert } from 'features/account/redux/actions'
import { updateUserInformation } from 'features/user/redux/actions'
import { SuccessUpdateUserInformationState } from 'features/user/redux/state'
import { UserRoutes } from 'features/user/constants/routes'
import { updateAuthData } from 'features/authentication/redux/actions'

export const ChangeNickname: React.FC = () => {
  const [nickname, setChangeNickname] = useMask(lettersOnly)

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

  React.useEffect(() => {
    if (
      validatedToken &&
      userInformationState instanceof SuccessUpdateUserInformationState
    ) {
      history.push(UserRoutes.changeConclude)
      dispatch(updateAuthData({ ...user, name: nickname }))
    }
  }, [dispatch, history, nickname, userInformationState, user, validatedToken])

  const onChangeNicknameChange = (event: any) => {
    setChangeNickname(event.target.value)
  }

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
          name: nickname,
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
            data-test-id="name-button"
            title="Nome social"
            subtitle={user?.name ?? ''}
            description=""
          />
        }
        main={
          <TextField
            label="Como gostaria que a gente lhe chame"
            placeholder="Seu nome"
            value={nickname}
            required
            onChange={onChangeNicknameChange}
            data-test-id="nickname"
          />
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!nickname}
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
