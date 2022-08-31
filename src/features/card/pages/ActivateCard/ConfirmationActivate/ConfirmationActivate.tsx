import React from 'react'
import { useStyles } from './ConfirmationActivate.style'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { AddBoxOutlined, KeyboardArrowRight } from '@material-ui/icons'
import { Button } from 'components/Button'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { CardRoutes } from 'features/card/constants/routes'
import { Typography, Box, Grid } from '@material-ui/core'
import { Icon } from 'components/Icon'

export const ConfirmationActivate: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()

  const onNextButtonClick = () => {
    history.push(CardRoutes.passwordCard)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        main={
          <Box data-test-id="confirmation-activate">
            <Box className={styles.cardImg}>
              <Icon name="activateCard" />
            </Box>
            <Box>
              <Typography className={styles.title}>Cartão Ativado</Typography>
            </Box>
            <Box className={styles.boxDescription}>
              <Box className={styles.description}>
                Agora precisamos criar uma <strong> senha </strong> para seu
                cartão
              </Box>
            </Box>
          </Box>
        }
        footer={
          <Box className={styles.buttonsWrapper}>
            <Box className={styles.footer}>
              <Button
                onClick={onNextButtonClick}
                endIcon={<KeyboardArrowRight color="secondary" />}
                data-test-id="next-button"
              >
                Próximo
              </Button>
            </Box>
          </Box>
        }
      />
    </PageContainer>
  )
}
