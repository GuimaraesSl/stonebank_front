import React from 'react'
import { useStyles } from './InvalidDataForAssociateCard.style'
import { Typography, Box, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { useDispatch } from 'react-redux'
import { CardRoutes } from 'features/card/constants/routes'
import { Icon } from 'components/Icon'
import { Button } from 'components/Button'

export const InvalidDataForAssociateCard: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const onButtonClick = () => {
    history.replace(CardRoutes.cardManagement)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        main={
          <React.Fragment>
            <Box>
              <ProcessDescriptionHeader title="Ops..." />
            </Box>
            <Box className={styles.container}>
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
            <Button onClick={onButtonClick} palette="primary">
              Voltar para o início
            </Button>
          </Grid>
        }
      />
    </PageContainer>
  )
}
