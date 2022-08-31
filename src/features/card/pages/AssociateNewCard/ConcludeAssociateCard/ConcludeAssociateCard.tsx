import React from 'react'
import { useStyles } from './ConcludeAssociateCard.style'
import { PageContainer } from 'components/PageContainer'
import { useHistory } from 'react-router-dom'
import { AddBoxOutlined, KeyboardArrowRight } from '@material-ui/icons'
import { Button } from 'components/Button'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { CardRoutes } from 'features/card/constants/routes'
import { Typography, Box, Grid } from '@material-ui/core'
import { Icon } from 'components/Icon'

export const ConcludeAssociateCard: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()

  const onNextButtonClick = () => {
    history.push(CardRoutes.activateCard)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        main={
          <Box>
            <Box className={styles.cardImg}>
              <Icon name="activateCard" />
            </Box>
            <Box>
              <Typography className={styles.title}>Cartão Associado</Typography>
            </Box>
            <Box className={styles.boxDescription}>
              <Box className={styles.description}>
                Agora precisamos <strong> ativar </strong> o seu cartão
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
