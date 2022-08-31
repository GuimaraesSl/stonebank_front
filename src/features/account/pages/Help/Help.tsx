import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { cancelLabel } from 'constants/buttons/labels'
import { Box, Grid, Typography } from '@material-ui/core'
import { useStyles } from './Help.style'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ConfigContext } from '_config'
import { ActionList } from 'components/ActionList'
import { ListItemHelp } from 'features/account/components/ListItemHelp'
import { Icon } from 'components/Icon'

export const Help: React.FC = () => {
  const { company } = React.useContext(ConfigContext)
  const history = useHistory()
  const styles = useStyles()

  const onCancelButtonClick = () => {
    history.goBack()
  }

  const zenDeskRedirect = () => {
    window.open(company.linkHelp)
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
          <Box className={styles.header}>
            <ProcessDescriptionHeader
              title="Ajuda"
              subtitle="Ficou alguma dúvida?"
              description="Entre em contato com a gente que em breve lhe retornaremos"
            />
          </Box>
        }
        main={
          <Grid container direction="column" justifyContent="center">
            <Box className={styles.doubtButtonContainer}>
              {company.helpLink && (
                <Button
                  onClick={() => {
                    zenDeskRedirect()
                  }}
                  palette="secondary"
                  data-test-id="help-button"
                >
                  <Box className="internButtonBox">
                    <Box className="balloonAndLabelBox">
                      <Icon name="doubleBalloon" />
                      <Box className="doubtLabelBox">
                        <Typography className="titleLabel">
                          {' '}
                          Envie sua dúvida{' '}
                        </Typography>
                      </Box>
                    </Box>
                    <Icon name="externArrowLink" />
                  </Box>
                </Button>
              )}
            </Box>
            <ActionList className={styles.actionList}>
              {company.address && (
                <ListItemHelp
                  title={'Endereço'}
                  details={company.address}
                  icon={<Icon name="address" />}
                />
              )}
              {company.phone && (
                <ListItemHelp
                  title={'Telefone'}
                  details={company.phone}
                  icon={<Icon name="phoneHelp" />}
                />
              )}
              {company.email && (
                <ListItemHelp
                  title={'E-mail'}
                  details={company.email}
                  icon={<Icon name="mail" />}
                />
              )}
              {company.website && (
                <ListItemHelp
                  title={'Canal no YouTube ou site'}
                  details={company.website}
                  icon={<Icon name="website" />}
                />
              )}
            </ActionList>
          </Grid>
        }
        footer={<ProcessPageFooter />}
        footerPosition="fixed"
      />
    </PageContainer>
  )
}
