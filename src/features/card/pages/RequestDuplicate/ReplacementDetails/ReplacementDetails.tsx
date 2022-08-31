import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ReplacementData } from 'features/card/components/ReplacementData'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { Button } from 'components/Button'
import { useStyles } from './ReplacementDetails.style'
import { AppBar } from 'components/AppBar'
import { Box } from '@material-ui/core'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { PopUpConfirmPassword } from 'features/card/components/PopUp/PopUpConfirmPassword'
import { CardRoutes } from 'features/card/constants/routes'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'

export const ReplacementDetails: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const [openPasswordPopUp, setOpenPasswordPopUp] = React.useState(false)
  const [openFinishedPopUp, setOpenFinishedPopUp] = React.useState(false)
  const [card] = useSelector<StoreState, [Card | undefined]>(state => [
    state.card.card,
  ])
  const { user } = useSelector((store: StoreState) => store.auth)

  const onConcludeButtonClick = () => {
    setOpenPasswordPopUp(true)
  }
  const onPasswordCloseButtonClick = () => {
    setOpenPasswordPopUp(false)
  }
  const onPasswordConfirmButtonClick = () => {
    setOpenFinishedPopUp(true)
  }

  const onAlertClick = () => {
    history.push(CardRoutes.cardManagement)
  }

  const onCancelButtonClick = () => {
    history.replace(CardRoutes.cardManagement)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={OnboardingRoutes.welcome}
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
          <Box className={styles.header}>
            <ProcessDescriptionHeader
              title="Segunda via do cartão"
              subtitle="Revise sua solicitação"
              description="Verifique os dados da solicitação antes de concluir."
            />
          </Box>
        }
        main={
          <Box className="main">
            <ReplacementData
              address={`${user?.street ?? ''}, nª ${user?.number ?? ''} - ${user?.district ?? ''} ${user?.city ?? ''}-${user?.state ?? ''}`}
              card={`ELO - Final ${card?.panLastDigits}`}
              deadline="14 dias úteis"
              value={15}
            ></ReplacementData>
          </Box>
        }
        footer={
          <Box>
            <ProcessPageFooter
              primaryButton={
                <Button
                  palette="primary"
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onConcludeButtonClick}
                  data-test-id="conclude-button"
                >
                  {concludeLabel}
                </Button>
              }
            />

            <PopUpConfirmPassword
              open={openPasswordPopUp}
              onClose={onPasswordCloseButtonClick}
              onClickAlert={onAlertClick}
              alertTitle="Segunda via solicitada"
            />
          </Box>
        }
      />
    </PageContainer>
  )
}
