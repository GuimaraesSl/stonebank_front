import React from 'react'
import {
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { Box, Typography } from '@material-ui/core'
import { SelectionCard } from 'components/SelectionCard'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { cancelLabel } from 'constants/buttons/labels'
import { Close } from '@material-ui/icons'
import { Icon } from 'components/Icon'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { useStyles } from './PixArea.style'
import { PixButtonConfig } from './components/PixButtonConfig'
import { Favored } from 'features/pix/redux/models/favored'
import { RecentFavoredCard } from 'components/RecentFavoredCard'
import { maskTaxId } from '_utils/masks/taxId'

interface PixAreaViewProps {
  onPixKeyListClick: VoidFunction
  onReceivePixQRCodeClick: VoidFunction
  // onHelpClick: VoidFunction
  // onMyLimitsPix: VoidFunction
  loading: boolean
  errorMessage: string | undefined
  favored?: Favored[]
  onQrCodeTransferClick: VoidFunction
  onTransferWithKeyClick: VoidFunction
  onCopyPasteTransferClick: VoidFunction
  onSelectFavored: (favored: Favored) => void
  onCloseAlert: VoidFunction
  onCancelButton: VoidFunction
  onBackToHome: VoidFunction
}

export const PixAreaView: React.FC<PixAreaViewProps> = ({
  onPixKeyListClick,
  onReceivePixQRCodeClick,
  // onHelpClick,
  // onMyLimitsPix,
  loading,
  errorMessage,
  favored,
  onQrCodeTransferClick,
  onTransferWithKeyClick,
  onCopyPasteTransferClick,
  onCloseAlert,
  onCancelButton,
  onSelectFavored,
  onBackToHome,
}) => {
  const style = useStyles()

  return (
    <PageContainer className={style.container}>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButton}
                data-test-id="close-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Minha área PIX"
            subtitle="Pagamento e recebimento instantâneo"
            description="Com o Pix você pode realizar ou receber pagamentos em instantes a qualquer dia e hora."
          />
        }
        main={
          <Box className={style.content}>
            <Box component="section" className={style.paymentMethodsSection}>
              <Box gridArea="1 / span 2" data-test-id="method-subtitle">
                <Typography variant="subtitle1" className={style.title}>
                  Pagar com pix
                </Typography>
              </Box>
              <Box className={style.qrCodeTransfer}>
                <Box className={style.card} onClick={onQrCodeTransferClick} data-test-id="QRcode-button">
                  <Box className={style.iconWrapper}>
                    <Icon name="pixQrCode" />
                  </Box>
                  <Typography className={style.textDescription}>
                    Transferir por QR Code
                  </Typography>
                </Box>
              </Box>
              <SelectionCard
                variant="pix"
                title="Transferir"
                subtitle="Usando chave ou dados bancários"
                startIcon={'pixTransfer'}
                className={style.pixPaymentMethodCard}
                onClick={onTransferWithKeyClick}
              />
              <SelectionCard
                variant="pix"
                title="PIX Copia e Cola"
                subtitle="Cole o código"
                startIcon={'pixCopyPaste'}
                className={style.pixPaymentMethodCard}
                onClick={onCopyPasteTransferClick}
              />
            </Box>
            <Box component="section">
              <Typography variant="subtitle1" className={style.title}>
                Cobrar e receber
              </Typography>
              <SelectionCard
                variant="pix"
                title="Cobrar e Receber"
                subtitle="Cobre com o PIX"
                startIcon={'pixCharge'}
                className={style.collectAndReceipt}
                onClick={onReceivePixQRCodeClick}
              />
            </Box>
            <Box component="section">
              <Typography variant="subtitle1" className={style.title} data-test-id="favored-subtitle">
                Recentes
              </Typography>
              <Box className={style.favoredList}>
                {favored?.map(favored => (
                  <RecentFavoredCard
                    name={favored.name!}
                    taxId={maskTaxId(favored.taxId!)}
                    bankName={favored.bankName!}
                    onClick={() => onSelectFavored(favored)}
                    data-test-id="favored-list"
                  />
                ))}
              </Box>
            </Box>
            <Box component="section" className={style.optionsList}>
              <PixButtonConfig
                title="Minhas chaves"
                subtitle="Gerencie suas chaves registradas no Fitbank"
                startIcon={'pixKeys'}
                onClick={onPixKeyListClick}
              />
              <PixButtonConfig
                title="Meus limites Pix"
                subtitle="Consulte e solicite alterações nos seus limites"
                startIcon={'pixLimits'}
                // onClick={onMyLimitsPix}
              />
              <PixButtonConfig
                title="Precisa de ajuda?"
                subtitle="Podemos te ajudar"
                startIcon={'pixHelp'}
                // onClick={onHelpClick}
              />
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            secondaryButton={
              <ProcessPageFooterButton
                backButton
                onClick={onBackToHome}
              ></ProcessPageFooterButton>
            }
          />
        }
        footerPosition="fixed"
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onCloseAlert}
        />
      )}
    </PageContainer>
  )
}
