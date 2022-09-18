import React from 'react'
import { useHistory } from 'react-router'
import { Grid, Box } from '@material-ui/core'
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
              <Icon name="welcomeImage" className={styles.img} />
            </Box>

          {/* ONBOARDING TITLE */}

          <Grid item className={styles.title}>
            <OnboardingTitle />
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
                borderWidth={2}
                route={AuthenticationRoutes.signIn}
              >
                Entrar na minha conta
              </WelcomePageButton>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </PageContainer>
  )
}
