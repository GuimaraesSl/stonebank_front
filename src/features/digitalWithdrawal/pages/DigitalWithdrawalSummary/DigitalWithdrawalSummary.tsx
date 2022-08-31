import React, { useState } from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { ButtonReadQRCode } from '../../components/ButtonReadQRCode'
import { cancelLabel } from 'constants/buttons/labels'
import { Close } from '@material-ui/icons'
import { useStyles } from './DigitalWithdrawalSummary.style'
import { useHistory } from 'react-router'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box, Typography } from '@material-ui/core'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { CurrencyFormatter } from '_translate'
import { AccountRoutes } from 'features/account/constants/routes'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants'

export const DigitalWithdrawalSummary: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onReadQRCodeButtonClick = () => {
    history.push(DigitalWithdrawalRoutes.readQrCodeDigitalWithdrawal)
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
          <Box>
            <ProcessDescriptionHeader title="Saque Digital" />
            <Typography align="center" className={styles.subInformation}>
              Confira o valor solicitado e as <br />
              instruções para concluir o saque
            </Typography>
            <Typography align="center" className={styles.value}>
              {/* {CurrencyFormatter.format()} */}
              R$500,00
            </Typography>
          </Box>
        }
        main={
          <Box className={styles.content}>
            <Typography className={styles.rateValue}>
              + taxa de serviço de R$80,00 <br />
              total da operação = R$580,80
            </Typography>
            <Typography className={styles.bank}>
              Agora é no caixa eletrônico <br />
              do Banco24horas
            </Typography>
            <Typography className={styles.instructions}>Selecione</Typography>
            <Typography className={styles.instructionsSub}>
              SAQUE DIGITAL
            </Typography>
            <Typography className={styles.instructions}>
              em seguida em
            </Typography>
            <Typography className={styles.instructionsSub}>
              Código QR
            </Typography>
            <Typography className={styles.instructions}>
              ao aparecer o QR Code na tela do caixa <br />
              aperte o botão abaixo
            </Typography>

            <ButtonReadQRCode
              onClick={onReadQRCodeButtonClick}
              className={styles.btnReadQrCode}
            >
              Ler QR Code
            </ButtonReadQRCode>
          </Box>
        }
        footer={<ProcessPageFooter />}
      />
    </PageContainer>
  )
}
