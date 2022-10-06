import React from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import { PageTitle } from 'components/PageTitle'
import { AccessAccountButton } from 'features/authentication/components/AccessAccountButton'
import { useStyles } from './ChangePasswordCompleted.style'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'
import '_assets/css/onboarding/finish-activation.scss'
import { Icon } from 'components/Icon'
import { PageContainer } from 'components'
import { GreatButton } from 'components/GreatButton'

export const ChangePasswordCompleted: React.FC = () => {
  const style = useStyles()
  const userName = useSelector((store: StoreState) => store.auth.user?.name)

  return (
    <PageContainer className={style.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={style.content}
      >
        <Grid>
          <Icon name="accountActivationCompleted"/>
        </Grid>

        <Grid item className={style.gridTitle} data-test-id="description-title" >
          <Typography variant="h5" className={style.title}>
            Muito Bem!
          </Typography>

          <Typography variant="h5" className={style.subtitle} data-test-id="description-subtitle" >
            Nova senha definida com sucesso
          </Typography>
        </Grid>

        <Grid item className={style.buttonWrapper}>
          <AccessAccountButton 
            palette='secondary'
            size="large"
          />
        </Grid>
      </Grid>
    </PageContainer>
  )
}
