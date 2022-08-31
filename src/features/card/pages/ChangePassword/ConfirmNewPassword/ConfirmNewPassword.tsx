import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './ConfirmNewPassword.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Validator } from 'features/card/components/Validator/Validator'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import {
  changePinCard,
  closeAlert,
  updateCard,
} from 'features/card/redux/actions'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { SuccessCardState } from 'features/card/redux/state'
import { encryptNewPassword } from '_utils/cryptography'

export const ConfirmNewPassword: React.FC = () => {
  const cardState = useSelector((s: StoreState) => s.card)
  const { card, loading, errorMessage } = cardState
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const [confirmationPin, setPasswordInput] = React.useState('')
  const [displayCards, setDisplayCards] = React.useState(card)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [passwordValidate, setPasswordValidate] = React.useState<
    boolean | undefined
  >()
  const history = useHistory()
  const style = useStyles()
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    history.go(-3)
  }

  React.useEffect(() => {
    if (cardState instanceof SuccessCardState) history.go(-4)
  }, [cardState])

  React.useEffect(() => {
    setPasswordValidate(card?.pin === encryptNewPassword(confirmationPin))
  }, [confirmationPin])

  React.useEffect(() => {
    setDisableNextButton(confirmationPin.length !== 4)
  }, [passwordValidate])

  React.useEffect(() => {
    setDisplayCards(card)
    if (card?.confirmationPin) setOpenAuthorizationSheet(true)
  }, [card])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      updateCard({
        ...card!,
        confirmationPin: encryptNewPassword(confirmationPin),
      }),
    )
  }

  const onAuthorizationSheetClose = (validatedToken: boolean) => {
    setOpenAuthorizationSheet(false)

    if (validatedToken) dispatch(changePinCard(card))
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
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
          <Box className={style.header}>
            <ProcessDescriptionHeader
              title={'Alterar senha do Cartão'}
              subtitle={`Cartão final ${displayCards?.panLastDigits}`}
              description="Agora insira novamente a sua nova senha"
            />
          </Box>
        }
        main={
          <Box onSubmit={onSubmit} className={style.main}>
            <Validator
              label="Confirmar senha"
              value={confirmationPin}
              setValue={setPasswordInput}
              strictValidation={passwordValidate}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={disableNextButton}
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
          title="Error"
          message={errorMessage}
          severity="error"
          onClose={onAlertClose}
        />
      )}
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
    </PageContainer>
  )
}
