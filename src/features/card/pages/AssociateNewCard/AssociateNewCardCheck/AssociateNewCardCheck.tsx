import React from 'react'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { AppBar } from 'components/AppBar'
import { Close } from '@material-ui/icons'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { CardRoutes } from 'features/card/constants/routes'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './AssociateNewCardCheck.style'
import { Box } from '@material-ui/core'
import { CardData } from 'features/card/components/CardData'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { bindUnnamedCard } from 'features/card/redux/actions'
import { closeAlert, updateCard } from 'features/card/redux/actions'
import { SuccessCardState } from 'features/card/redux/state'
import { Alert } from 'components/Alert'
import { Icon } from 'components/Icon'

export const AssociateNewCardCheckData: React.FC = () => {
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }
  const card = useSelector((store: StoreState) => store.card)

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(bindUnnamedCard())
    }
    setOpenAuthorizationSheet(false)
  }
  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const { loading, errorMessage } = card

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  React.useEffect(() => {
    if (card instanceof SuccessCardState) {
      history.push(CardRoutes.concludeAssociateCard)
      dispatch(updateCard())
    }
  }, [card, history, dispatch])

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
          <Box className={styles.boxHeader}>
            <ProcessDescriptionHeader
              title="Associar novo cartão"
              subtitle="Confira os dados do seu novo cartão"
            />
          </Box>
        }
        main={
          <Box className="boxMain">
            <Box className={styles.boxCardUser}>
              <CardData
                fullName={card?.card?.fullName}
                panLastDigits={card?.card?.panLastDigits}
                flagCard={<Icon name="eloImage" />}
              />
            </Box>
            {/* <Box className={styles.boxValidity}>
              <Typography className={styles.validity}>Validade:</Typography>
              <Typography className={styles.data}>11/26</Typography>
            </Box> */}
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onConcludeButtonClick}
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
        <Alert
          title="Error"
          message={errorMessage}
          severity="error"
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
