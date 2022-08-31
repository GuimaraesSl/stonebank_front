import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import React from 'react'
import { PasswordInput } from 'features/card/components/Inputs/PasswordInput'
import { useStyles } from './ConfirmPasswordCard.style'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { CardRoutes } from 'features/card/constants/routes'
import { Box } from '@material-ui/core'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'
import { Validator } from 'features/card/components/Validator/Validator'
import { changePinCard, updateCard } from 'features/card/redux/actions'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { SuccessCardState } from 'features/card/redux/state'

export const ConfirmPasswordCard: React.FC = () => {
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [confirmationPin, setPasswordInput] = React.useState('')
  const [displayCards, setDisplayCards] = React.useState(card)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [sentRequest, setSentRequest] = React.useState(false)
  const cardState = useSelector((state: StoreState) => state.card)

  const [passwordValidate, setPasswordValidate] = React.useState<
    boolean | undefined
  >()

  React.useEffect(() => {
    setPasswordValidate(card?.pin === confirmationPin)
  }, [confirmationPin])

  React.useEffect(() => {
    setDisableNextButton(confirmationPin.length !== 4)
  }, [passwordValidate])

  React.useEffect(() => {
    setDisplayCards(card)
  }, [card])

  React.useEffect(() => {
    if (sentRequest && cardState instanceof SuccessCardState)
      history.push(CardRoutes.activateCardConclude)
  }, [cardState])

  const lastCardDigits = (lastDigits: number) => {
    if (lastDigits === null) return `Cartão final`
    else return `Cartão final ${displayCards?.panLastDigits}`
  }

  const onCancelButton = () => {
    history.push(AccountRoutes.home)
    dispatch(updateCard())
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(changePinCard(card))
      setSentRequest(true)
    }
    setOpenAuthorizationSheet(false)
  }

  const onSubmit = (event: React.FormEvent) => {
    dispatch(updateCard({ ...card!, confirmationPin: confirmationPin }))
    setOpenAuthorizationSheet(true)
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
                onClick={onCancelButton}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <Box className={styles.header}>
            <ProcessDescriptionHeader
              title={'Criar senha do Cartão'}
              subtitle={lastCardDigits(displayCards!.panLastDigits)}
              description={'Agora insira novamente a sua nova senha'}
              data-test-id="description"
            />
          </Box>
        }
        main={
          <Box onSubmit={onSubmit} className={styles.main}>
            <Validator
              label={'Confirmar senha'}
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
                palette="primary"
                onClick={onSubmit}
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={disableNextButton}
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
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
