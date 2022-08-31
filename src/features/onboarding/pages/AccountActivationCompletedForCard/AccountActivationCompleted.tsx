import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { AccessAccountButton } from 'features/onboarding/components/buttons/AccessAccountButton'
import { createAccount } from 'features/onboarding/redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from 'redux/state'
import { useStyles } from './AccountActivationCompleted.style'
import { PageContainer } from 'components/PageContainer'
import { Icon } from 'components/Icon'

interface AccountActivationCompletedProps {
  activeTwoButtons: boolean
}

export const AccountActivationCompletedForCard: React.FC<
  AccountActivationCompletedProps
> = ({ activeTwoButtons }: AccountActivationCompletedProps) => {
  const state = useSelector((s: StoreState) => s.onboarding)
  const dispatch = useDispatch()
  const style = useStyles()

  React.useEffect(() => {
    if (state.onboardingForm) dispatch(createAccount())
  }, [state.onboardingForm])

  return (
    <PageContainer className={style.container}>
      <Grid container direction="column" alignItems="center">
        <Box data-test-id="account-activation">
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
            <AccessAccountButton />
          </Box>
        </Box>
      </Grid>
    </PageContainer>
  )
}
