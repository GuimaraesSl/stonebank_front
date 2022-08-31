import { Box, Typography } from '@material-ui/core'
import React from 'react'
import {
  AppBar,
  Button,
  ButtonWithFloatingIcon,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  SelectionCard,
  TextField,
} from 'components'
import { useStyles } from './PixTransferHome.styles'
import { AccountRoutes } from 'features/account/constants/routes'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'

interface PixTransferHomeProps {
  loading: boolean
  errorMessage?: string
  hashValue: string
  onChangeHashValue?: React.ChangeEventHandler
  onAlertClose: VoidFunction
  onPixKeyClick: VoidFunction
  onBankDataClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
  onHashSearchClick: VoidFunction
}

export const PixTransferHomeView: React.FC<PixTransferHomeProps> = ({
  loading,
  errorMessage,
  hashValue,
  onChangeHashValue,
  onAlertClose,
  onPixKeyClick,
  onBankDataClick,
  onCancelButtonClick,
  onBackButtonClick,
  onHashSearchClick,
}) => {
  const styles = useStyles()

  return (
    <PageContainer className={styles.page}>
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
            title="Transferência com Pix"
            subtitle="Como deseja realizar a transferência"
          />
        }
        main={
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            justifyContent="space-between"
          >
            <Box className={styles.copyPasteCodeSection} >
              <Typography>Pagar com pix Copia e cola</Typography>
              <Typography variant="body2">
                Recebeu um código para pagamento? Cole aqui.
              </Typography>
              <Box>
                <TextField
                  label=""
                  value={hashValue!}
                  onChange={onChangeHashValue}
                />
                {hashValue.length >= 100 && (
                  <Box className={styles.scheduleButtonContainer}>
                    <ButtonWithFloatingIcon
                      data-test-id="schedule-button"
                      onClick={onHashSearchClick}
                    >
                      Buscar
                    </ButtonWithFloatingIcon>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={styles.cards}>
              <SelectionCard
                variant="pix"
                title="Usar uma chave Pix"
                subtitle="Insira a chave fornecida pelo beneficiário, pode cpf, cnpf, email, celular ou chave aleatória"
                onClick={onPixKeyClick}
                endIcon={'pixTransferPhone'}
              />
              <SelectionCard
                variant="pix"
                title="Utilizando dados bancários"
                subtitle="Não sabe da chave? Faça um PIX com os mesmos dados de um transferência tradicional"
                endIcon={'moneyTransfer'}
                onClick={onBankDataClick}
              />
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooterButton backButton onClick={onBackButtonClick} />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
