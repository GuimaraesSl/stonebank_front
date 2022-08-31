import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { PageTitle } from 'components/PageTitle'
import { AccessAccountButton } from 'features/authentication/components/AccessAccountButton'
import { useStyles } from './ChangePasswordCompleted.style'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'
import '_assets/css/onboarding/finish-activation.scss'
import { Icon } from 'components/Icon'

export const ChangePasswordCompleted: React.FC = () => {
  const style = useStyles()
  const userName = useSelector((store: StoreState) => store.auth.user?.name)

  return (
    <Container maxWidth="xs" className={style.container}>
      <Box className="finish-activation">
        <Box className="title">
          <PageTitle text="Pronto!" />
        </Box>
        <Box className={'boxContent'}>
          <Box>
            <Icon name="accountActivationCompleted" />
            <Box className="welcome-message" data-test-id="welcome-message">
              <Typography variant="caption" display="block" gutterBottom>
                Seja Bem vindo, <strong>{userName}!</strong>
              </Typography>
              <Typography variant="caption">
                <strong>A senha criada será utilizada</strong>
              </Typography>
              <Typography variant="caption">
                <strong>APENAS para acesso ao aplicativo.</strong>
              </Typography>
              <Box className={style.accessAccountAlignButton}>
                <AccessAccountButton />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
