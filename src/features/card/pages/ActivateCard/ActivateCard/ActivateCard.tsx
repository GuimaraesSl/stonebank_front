import React from 'react'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { AppBar } from 'components/AppBar'
import { Close } from '@material-ui/icons'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel } from 'constants/buttons/labels'
import { nextLabel } from 'constants/buttons/labels'
import { CardRoutes } from 'features/card/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './ActivateCard.style'
import { Box } from '@material-ui/core'
import { CardData } from 'features/card/components/CardData'
import { AccountRoutes } from 'features/account/constants/routes'
import { activateCard, updateCard } from 'features/card/redux/actions'
import { StoreState } from 'redux/state'
import { SuccessCardState } from 'features/card/redux/state'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { Icon } from 'components/Icon'

export const ActivateCard: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const styles = useStyles()
  const [sentRequest, setSentRequest] = React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const cardState = useSelector((state: StoreState) => state.card)

  const { card, loading, errorMessage } = cardState

  React.useEffect(() => {
    dispatch(updateCard(cardState.card))
  }, [])

  React.useEffect(() => {
    if (sentRequest && cardState instanceof SuccessCardState)
      history.push(CardRoutes.confirmationActivate)
  }, [cardState])

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(activateCard())
      setSentRequest(true)
    }
    setOpenAuthorizationSheet(false)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const imageFlagCard = (flag: string) => {
    switch (flag) {
      case 'ELO':
        return <Icon name="eloImage" />

      case 'VISA':
        return <Icon name="visaImage" />

      case 'MasterCard':
        return <Icon name="visaImage" />
    }
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
          <Box
            className={styles.boxHeader}
            data-test-id="activate-card-description"
          >
            <ProcessDescriptionHeader
              title="Ativar Novo Cartão"
              subtitle="Confira os dados do seu novo cartão"
            />
          </Box>
        }
        main={
          <Box className="boxMain" data-test-id="box-card-user">
            <Box className={styles.boxCardUser}>
              <CardData
                fullName={card!.fullName}
                panLastDigits={card!.panLastDigits}
                flagCard={imageFlagCard('ELO')}
              />
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
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
