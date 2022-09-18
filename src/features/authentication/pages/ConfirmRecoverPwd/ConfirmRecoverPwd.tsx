import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { Button } from 'components/Button'
import { StoreState } from 'redux/state'
import { useStyles } from './ConfirmRecoverPwd.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { useSelector } from 'react-redux'
import { RecoverType } from 'features/authentication/redux/models/recoverType'
import { Icon } from 'components/Icon'

export const ConfirmRecoverPwd: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const onHomeButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const resetPasswordForm = useSelector(
    (store: StoreState) => store.auth.resetPasswordForm,
  )

  return (
    <PageContainer>
      <ProcessPageLayout
        main={
          <React.Fragment>

            <Box
              display="flex"
              justifyContent="center"
              data-test-id="completed-recover-password"
            >
              <Icon className={styles.img} name="conclude" />
            </Box>

            <Typography
              variant="h3"
              className={styles.title}
              data-test-id="temp-password"
            >
              Senha temporária enviada
            </Typography>
            
          </React.Fragment>
        }
        footer={
          <Grid
            container
            spacing={4}
            className={styles.buttonAccess}
            data-test-id="access-button"
          >
            <Grid item>
              <Button size="large" onClick={onHomeButtonClick}>
                Acessar sua conta
              </Button>
            </Grid>
          </Grid>
        }
      />
    </PageContainer>
  )
}
