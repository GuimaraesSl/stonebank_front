import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { useHistory } from 'react-router-dom'
import { Close } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { useStyles } from './DigitalWithdrawalReceipt.style'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { cancelLabel, saveLabel, shareLabel } from 'constants/buttons/labels'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { CurrencyFormatter } from '_translate'
import { Icon } from 'components/Icon'

export const DigitalWithdrawalReceipt: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
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
        header={<ProcessDescriptionHeader title="Comprovante" />}
        main={
          <Box className={styles.detailContent}>
            <Typography> Saque </Typography>
            <Typography className={styles.detail}>
              {/* {CurrencyFormatter.format(value)} */}
              R$ 570,00
            </Typography>
            <Typography> Realizado em </Typography>
            <Typography className={styles.detail}>
              Rede Banco 24 horas
            </Typography>

            <Typography> Data </Typography>
            <Typography className={styles.detail}>
              {/* {DateFormatter.format(date)} */}
              27/01/2022
            </Typography>
            <Typography> Formato do saque </Typography>
            <Typography className={styles.detail}>QR Code</Typography>
            <Typography> Identificador de Operação </Typography>
            <Typography className={styles.detail}>
              84660000000 0 79890109011 7
            </Typography>

            <Box className={styles.descriptionBox}>
              <Typography>Autenticação</Typography>
              <Typography>Pago via: Open Source Bank</Typography>
              <Typography>Controle/Protocolo: 44B8-4B9324C-2398721</Typography>
              <Typography>
                Protocolo Interno : 44B8-4B9324C-2398721320AB
              </Typography>
            </Box>
          </Box>
        }
        footer={
          <Box className={styles.buttons}>
            <ButtonWithFloatingIcon
              icon={<Icon name="buttonBg" />}
              size="large"
            >
              {saveLabel}
            </ButtonWithFloatingIcon>
            <ButtonWithFloatingIcon
              icon={<Icon name="buttonBg" />}
              size="large"
            >
              {shareLabel}
            </ButtonWithFloatingIcon>
          </Box>
        }
      />
    </PageContainer>
  )
}
