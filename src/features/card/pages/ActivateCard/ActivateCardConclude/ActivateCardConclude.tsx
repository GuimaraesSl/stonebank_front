import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { useStyle } from '_assets/makeStyles/container/container.style'
import '_assets/css/onboarding/finish-activation.scss'
import './ActivateCardConclude.style.ts'
import { useHistory } from 'react-router'
import { useStyles } from './ActivateCardConclude.style'
import { Button } from 'components/Button'
import { CardRoutes } from 'features/card/constants/routes'
import { Icon } from 'components/Icon'

interface ActivateCardConcludeProps {
  activeTwoButtons: boolean
}

export const ActivateCardConclude: React.FC<ActivateCardConcludeProps> = () => {
  const history = useHistory()
  const style = useStyle()
  const styles = useStyles()

  return (
    <Container maxWidth="xs" className={style.container}>
      <Box className="finish-activation">
        <Typography variant="h6" className={styles.title}>
          Pronto!
        </Typography>
        <Box className={styles.image}>
          <Icon name="accountActivationCompleted" className={styles.icon} />
        </Box>
        <Box className={styles.boxAccessAccountAlignButton}>
          <Box className={styles.accessAccountAlignButton}>
            <Button
              variant="outlined"
              palette="primary"
              onClick={() => history.replace(CardRoutes.cardManagement)}
              data-test-id="see-all-cards"
            >
              Ver meus cartões
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
