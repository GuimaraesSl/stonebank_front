import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { UserRoutes } from 'features/user/constants/routes'
import { closeLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { Box, Grid, Typography } from '@material-ui/core'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './ChangeConclude.styles'
import { Icon } from 'components/Icon'

export const ChangeConclude: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const onCloseButtonClick = () => {
    history.replace(UserRoutes.home)
  }

  return (
    <PageContainer className={styles.container}>
      <AppBar
        homeRoute={AccountRoutes.home}
        action={
          <Button
            palette="secondary"
            size="small"
            startIcon={<Close color="primary" />}
            onClick={onCloseButtonClick}
            data-test-id="close-button"
          >
            {closeLabel}
          </Button>
        }
      />

      <Box component="main" data-test-id="change-conclude">
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Icon name="conclude" className={styles.image} />
          </Grid>
          <Grid item>
            <Typography align="center" variant="h5">
              Concluído
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
