import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useStyles } from './DigitalWithdrawalStart.style'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants/routes'
import { Icon } from 'components/Icon'

export const DigitalWithdrawalStart: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const onNextButtonClick = () => {
    history.push(DigitalWithdrawalRoutes.selectValue)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        main={
          <React.Fragment>
            <Typography className={styles.title} align="center">
              Saque digital
            </Typography>
            <Box className={styles.descriptionWrapper}>
              <Typography className={styles.description}>
                Dinheiro na mão sem cartão! <br />
                Basta usar a opção QR Code em um caixa eletrônico
              </Typography>
            </Box>
            <Box className={styles.content}>
              <Box>
                <Icon
                  name={'frameDigitalWithdrawal'}
                  className={styles.frameDigitalWithdrawal}
                />
              </Box>
              <Typography className={styles.descriptionFooter}>
                Disponível na rede
              </Typography>
              <Box>
                <Icon name={'bankMachine'} className={styles.bankMachine} />
              </Box>
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                onClick={onNextButtonClick}
                endIcon={<KeyboardArrowRight color="secondary" />}
              >
                Próximo
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
