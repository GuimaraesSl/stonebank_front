import React from 'react'
import { useHistory } from 'react-router'
import { Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useOnboardingStyles } from './TemporaryPassword.style'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { GreatButton } from 'components/GreatButton'

export const TemporaryPassword: React.FC = () => {
  const styles = useOnboardingStyles()
  const history = useHistory()

  const createPass = () => {
    history.push(AuthenticationRoutes.changePasswordFirstAccess)
  }

  return (
    <PageContainer className={styles.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={styles.content}
      >
        <Grid>
          <Icon name="forgotPassword" className={styles.logo} />
        </Grid>

        <Grid item className={styles.gridTitle} data-test-id="description-title" >
          <Typography variant="h5" className={styles.title}>
            Você entrou com uma <br />
            senha temporária
          </Typography>
          <Typography variant="h5" className={styles.subtitle} data-test-id="description-subtitle" >
            Agora você precisa criar uma nova<br />
            senha
          </Typography>
        </Grid>

        <Grid item className={styles.buttonWrapper}>
          <GreatButton
            size="large"
            palette="secondary"
            route={AuthenticationRoutes.changePasswordFirstAccess}
            id="create-password"
          >
            Nova senha
          </GreatButton>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
