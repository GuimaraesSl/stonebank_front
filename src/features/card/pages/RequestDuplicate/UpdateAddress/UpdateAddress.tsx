import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { useHistory } from 'react-router-dom'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { useStyles } from './UpdateAddress.style'
import { CardRoutes } from 'features/card/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { UserRoutes } from 'features/user/constants/routes'
import { Icon } from 'components/Icon'

export const UpdateAddress: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const onCancelButtonClick = () => {
    history.push(CardRoutes.cardOption)
  }
  const onNextButtonClick = () => {
    history.push(UserRoutes.currentAddress)
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
          <Box className={styles.card}>
            <ProcessDescriptionHeader
              title="Segunda via do cartão"
              subtitle="Endereço"
              description=""
            />
          </Box>
        }
        main={
          <Box className="content" data-test-id="update-address">
            <Box className="align-top">
              <Grid item>
                <Box className={styles.contentimg}>
                  <Icon name="addressImg" className={styles.img} />
                </Box>
              </Grid>
              <Box className={styles.contentTexts}>
                <Typography className={styles.txtaddress}>
                  {' '}
                  Atualize seu endereço
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box className={styles.textmid}>
                <Typography variant="caption" className={styles.box}>
                  Você precisa atualizar seu endereço antes de solicitar a
                  segunda via do seu cartão!
                </Typography>
              </Box>
              <Box className={styles.textmid}>
                <Typography variant="caption" className={styles.box}>
                  Após a atualização, inicie a solicitação novamente.
                </Typography>
              </Box>
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
    </PageContainer>
  )
}
