import React from 'react'
import { useStyles } from './InvalidDataForCard.style'
import { Typography, Box, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Button } from '@material-ui/core'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { updateValidateCardForm } from 'features/onboarding/redux/actions'
import { useDispatch } from 'react-redux'
import { Icon } from 'components/Icon'

export const InvalidDataForCard: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const onButtonClick = () => {
    dispatch(updateValidateCardForm())
    history.replace(OnboardingRoutes.activateAccount)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        main={
          <React.Fragment>
            <Box>
              <ProcessDescriptionHeader title="Ops..." />
            </Box>
            <Box className={styles.container} data-test-id="alert-message">
              <Box className={styles.alert}>
                <Icon name="alertWarningImg" />
              </Box>
              <Box className={styles.errorMensage}>
                <Typography>
                  <strong> Algo não está certo.</strong>
                </Typography>
              </Box>
              <Box className={styles.inconsistent}>
                <Typography>
                  <strong> Os dados estão inconsistentes.</strong>
                </Typography>
                <Box className={styles.textDescription}>
                  <Typography className={styles.description}>
                    Revise os dados e tente novamente.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        }
        footer={
          <Grid container direction="column" alignItems="center">
            <Button
              onClick={onButtonClick}
              className={styles.button}
              variant="outlined"
              color="primary"
              data-test-id="home-button"
            >
              Voltar para o início
            </Button>
          </Grid>
        }
      />
    </PageContainer>
  )
}
