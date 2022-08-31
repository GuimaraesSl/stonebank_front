import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { AccessAccountButton } from 'features/onboarding/components/buttons/AccessAccountButton'
import { StoreState } from 'redux/state'
import { useStyles } from './AccountActivationCompleted.style'
import { PageContainer } from 'components/PageContainer'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { Icon } from 'components/Icon'

interface AccountActivationCompletedProps {
  activeTwoButtons: boolean
}

export const AccountActivationCompleted: React.FC<
  AccountActivationCompletedProps
> = ({ activeTwoButtons }) => {
  const style = useStyles()
  const history = useHistory()

  const state = useSelector((s: StoreState) => s.onboarding)

  React.useEffect(() => {
    return () => {
      if (history.action === 'POP') history.push(OnboardingRoutes.welcome)
    }
  }, [history])

  return (
    <PageContainer
      className={style.container}
      data-test-id="account-activation"
    >
      <Grid container direction="column" alignItems="center">
        <Box>
          <Typography variant="h6" className="title">
            Concluído
          </Typography>
          <Box className={style.img}>
            <Icon name="accountActivationCompleted" />
          </Box>
          <Box className={style.welcomeAlignText}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              data-test-id="onboarding-name"
            >
              Seja Bem vindo,&nbsp;
              <strong>{state.onboardingForm?.name?.split(' ')[0]}!</strong>
            </Typography>
            <Typography
              variant="caption"
              align="center"
              display="block"
              gutterBottom
            >
              Cadastro completo com sucesso!
            </Typography>
            <Typography
              variant="caption"
              align="center"
              display="block"
              gutterBottom
            >
              Sua conta será ativada em instantes!
            </Typography>
            <Box className={style.accessAccount}>
              <AccessAccountButton />
            </Box>
          </Box>
        </Box>
      </Grid>
    </PageContainer>
  )
}
