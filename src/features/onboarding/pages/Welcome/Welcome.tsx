import React from 'react'
import { useHistory } from 'react-router'
import { Grid, Box, Typography } from '@material-ui/core'
import { OnboardingSubTitle } from 'features/onboarding/components/texts/OnboardingSubtitle'
import { OnboardingTitle } from 'features/onboarding/components/texts/OnboardingTitle'
import { WelcomePageButton } from 'features/onboarding/components/buttons/WelcomePageButton'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { useToken } from 'hooks/useToken'
import { PageContainer } from 'components/PageContainer'
import { useOnboardingStyles } from './Welcome.style'
import { Icon } from 'components/Icon'

export const Welcome: React.FC = () => {
  const styles = useOnboardingStyles()
  const history = useHistory()
  const token = useToken()

  React.useEffect(() => {
    if (token) history.replace(AccountRoutes.home)
  }, [history, token])

  return (

    <PageContainer className={styles.container}>

      <Grid
        container
        direction="column"
        className={styles.content}
      >

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
        >

          <Grid 
            item
            className={styles.logo}
            data-test-id="logo"
            >
              <Icon name={'logo'} />
          </Grid>

        </Grid>
      
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
        >

          {/* WELCOME IMAGE concludedImage */}
          <Box
            className={styles.containerImg}
            data-test-id="welcomeImage"
          >
            <Icon name="welcomeImage"/>
          </Box>

          {/* ONBOARDING TITLE  */}
          <Grid item className={styles.title}>
            <OnboardingTitle />
          </Grid>

          {/* ONBOARDING SUBTITLE */}
          <Grid item className={styles.subtitle}>
            <OnboardingSubTitle />
          </Grid>

          {/* BOTÃO LOGIN */}
          <Grid
            item
            container
            direction="column"
            className={styles.buttonsSection}
          >

            <Grid item className={styles.onboardingButtonWrapper}>
              <WelcomePageButton
                palette="primary"
                size="large"
                route={AuthenticationRoutes.signIn}
              >
                Fazer Login
              </WelcomePageButton>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </PageContainer>
  )
}
