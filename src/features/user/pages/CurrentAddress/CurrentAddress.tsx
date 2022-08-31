import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { UserRoutes } from 'features/user/constants/routes'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Grid, Typography } from '@material-ui/core'
import { AccountRoutes } from 'features/account/constants/routes'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { useStyles } from './CurrentAddress.style'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'
import { Icon } from 'components/Icon'

export const CurrentAddress: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const { user } = useSelector((store: StoreState) => store.auth)

  const onCancelButtonClick = () => {
    history.goBack()
  }

  const onEditButtonClick = () => {
    history.push(UserRoutes.changeAddress)
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
          <ProcessDescriptionHeader
            title="Endereço"
            subtitle=""
            description="Confirme seu endereço de correspondência"
          />
        }
        main={
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            spacing={3}
          >
            <Grid item>
              <Icon name={'locationIcon'} className={styles.icon} />
            </Grid>
            <Grid item className={styles.addressLines}>
              <Typography>{user?.street ?? ''}</Typography>
              <Typography>
                Nº {user?.number}&nbsp;&nbsp;{user?.complement}
                &nbsp;&nbsp;
                {user?.district}
              </Typography>
              <Typography>CEP: {user?.zipCode ?? ''}</Typography>
              <Typography>
                {user?.city} {user?.state}
              </Typography>
            </Grid>
            <Grid item>
              <ButtonWithFloatingIcon
                onClick={onEditButtonClick}
                        data-test-id="edit-button"
                        icon={<Icon name="buttonBg" />}
              >
                Editar
              </ButtonWithFloatingIcon>
            </Grid>
          </Grid>
        }
        footer={<ProcessPageFooter />}
      />
    </PageContainer>
  )
}
