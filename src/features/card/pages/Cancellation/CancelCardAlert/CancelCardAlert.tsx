import React, { useState } from 'react'
import { useStyles } from './CancelCardAlert.style'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { CardRoutes } from 'features/card/constants/routes'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Alert as AlertPopUp } from 'components/Alert'
import { Typography, Box } from '@material-ui/core'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'
import { Loader } from 'components/Loader'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { cancelCard, updateCard } from 'features/card/redux/actions'
import { SuccessCardState } from 'features/card/redux/state'
import { AlertConcluded } from 'components/AlertConcluded'
import { Icon } from 'components/Icon'

export const CancelCardAlert: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const [sentRequest, setSentRequest] = React.useState(false)
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])

  const cardState = useSelector((state: StoreState) => state.card)

  const [onShowPopUp, setShowPopUp] = useState(false)

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(cancelCard(card?.identifierCard!))
      setSentRequest(true)
    }
    setOpenAuthorizationSheet(false)
  }

  React.useEffect(() => {
    dispatch(updateCard(cardState.card))
  }, [dispatch])

  const onCancelButtonClick = () => {
    history.replace(CardRoutes.cardOption)
  }
  const controlerPopUp = () => {
    setOpenAuthorizationSheet(true)
  }
  const onClosePopUp = () => {
    setShowPopUp(false)
  }
  const alertRedirect = () => {
    history.push(CardRoutes.cardManagement)
  }

  React.useEffect(() => {
    if (sentRequest && cardState instanceof SuccessCardState) {
      setShowPopUp(true)
    }
  }, [cardState])

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
          <React.Fragment>
            <Box className={styles.desc}>
              <ProcessDescriptionHeader title="Cancelar cartão" />
            </Box>
            <Box className={styles.imageReference}>
              <Box className={styles.image}>
                <Icon name="alertWarningImg" />
              </Box>
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Typography className={styles.attention}>ATENÇÃO!</Typography>
            <Box
              className={styles.textDataContent}
              data-test-id="cancel-card-alert"
            >
              <p className={styles.textData}>
                O cartão <strong>ELO - Final {card?.panLastDigits}</strong>
                <span className={styles.textSpanData}>
                  será <strong>cancelado</strong> definitivamente
                </span>
              </p>
            </Box>
            <Box className={styles.textAttempt} data-test-id="sub-alert">
              <Typography className={styles.subAlert}>
                Essa ação não poderá ser desfeita,{' '}
                <strong>certifique-se que deseja continuar.</strong>
              </Typography>
            </Box>
          </React.Fragment>
        }
        footer={
          <React.Fragment>
            <ProcessPageFooter
              primaryButton={
                <Button
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={controlerPopUp}
                  data-test-id="next-button"
                >
                  {nextLabel}
                </Button>
              }
            />
            <AuthorizationSheet
              open={openAuthorizationSheet}
              onClose={onAuthorizationClose}
            />
            <Loader open={loading} />
            {errorMessage && (
              <AlertPopUp
                title="Error"
                message={errorMessage}
                severity="error"
              />
            )}
            <AlertConcluded
              open={onShowPopUp}
              title="Cartão cancelado"
              onClose={onClosePopUp}
              onClick={alertRedirect}
            />
          </React.Fragment>
        }
      />
    </PageContainer>
  )
}
