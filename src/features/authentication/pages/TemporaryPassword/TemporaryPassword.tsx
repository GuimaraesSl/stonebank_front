import React from 'react'
import { useHistory } from 'react-router'
import { Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useOnboardingStyles } from './TemporaryPassword.style'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'

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
          <Icon name="key" className={styles.logo} />
        </Grid>

        <Grid item className={styles.gridTitle} data-test-id="description-title" >
          <Typography variant="h5" className={styles.title}>
            Você entrou <br />
            com uma <br />
            senha temporária
          </Typography>
          <Typography variant="h5" className={styles.subtitle} data-test-id="description-subtitle" >
            Agora você precisa criar <br />
            uma nova senha
          </Typography>
        </Grid>

        <Grid item className={styles.buttonWrapper}>
          <Button
            size="large"
            palette="secondary"
            onClick={createPass}
            data-test-id="create-password"
          >
            Criar senha
          </Button>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
