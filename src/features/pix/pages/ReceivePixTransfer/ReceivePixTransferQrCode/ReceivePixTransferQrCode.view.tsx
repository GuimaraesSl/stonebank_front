import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { Box, Grid, Typography } from '@material-ui/core'
import { ButtonWithFloatingIcon, SelectionCard } from 'components'
import { useStyles } from './ReceivePixTransferQrCode.style'
// import { PixKeySelection } from '../components/PixKeySelection'
// import { SelectPixKey } from 'features/pix/redux/models/selectPixKey'
// import { PixKey } from 'features/pix/redux/models/PixKey'
import { maskCnpj, maskCpf } from '_utils/masks/taxPayer'
import { maskPhone } from '_utils/masks/phone'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'
// import { ReactComponent as PixKey } from '_assets/icons/pix-key.svg'
// import { EmptyListMessage } from '../../Keys/components/EmptyListMessage'
import { PixQrCode } from 'features/pix/redux/models/pixQrCode'
import { PixKey } from 'features/pix/redux/models/pixKey'
import { PixKeySelection } from './components/PixKeySelection'
import { SharePixQrCode } from '../ReceivePixTransferQrCode/components/SharePixQrCode'
// import { PixKeysDetails } from 'features/pix/redux/models/response/pixKeysDetailsResponse'

interface ReceivePixTransferQrCodeViewProps {
  onBackButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  staticPixQrCode?: PixQrCode
  onSetValue: VoidFunction
  onSharePixQrCodeClick: VoidFunction
  onSharePixQrCode: boolean
  onSharePixQrCodeClose: Function | ((onPixKeySelectionValid: boolean) => void)
  onPixKeySelectionClick: VoidFunction
  onPixKeySelection: boolean
  onPixKeySelectionClose: Function | ((onPixKeySelectionValid: boolean) => void)
  // onKeyClick: (pix: SelectPixKey) => void
  pixKeyList?: PixKey[]
  pixKey?: PixKey
}

export const ReceivePixTransferQrCodeView: React.FC<
  ReceivePixTransferQrCodeViewProps
> = ({
  onBackButtonClick,
  onCancelButtonClick,
  staticPixQrCode,
  onSetValue,
  onSharePixQrCodeClick,
  onSharePixQrCode,
  onSharePixQrCodeClose,
  onPixKeySelectionClick,
  onPixKeySelection,
  onPixKeySelectionClose,
  pixKeyList,
  pixKey,
}) => {
  const styles = useStyles()

  const applyMaskPixKey = (keyType: number, keyValue: string) =>
    keyType === PixKeyType.CPF
      ? maskCpf(keyValue)
      : keyType === PixKeyType.CNPJ
      ? maskCnpj(keyValue)
      : maskPhone(keyValue)

  const mapPixKeyTypeToIcon = (keyType: number) =>
    PixKeyType.CPF === keyType || PixKeyType.CNPJ === keyType
      ? 'pixTaxId'
      : PixKeyType.Email === keyType
      ? 'pixMail'
      : PixKeyType.PhoneNumber === keyType
      ? 'pixPhone'
      : 'pixKey'

  const isRegistered = (keyType?: number) => {
    const verifyIfKeyExist = pixKeyList?.some(pixKey => {
      if (keyType === 0 && pixKey.pixKeyType === 1) return true

      return pixKey.pixKeyType === keyType
    })
    return verifyIfKeyExist
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
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <React.Fragment>
            <ProcessDescriptionHeader title="Receber pagamento via PIX" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.subheader}
            ></Grid>
          </React.Fragment>
        }
        main={
          <Grid container direction="column">
            <Grid className={styles.muiGrid_item} data-test-id="receive-QRcode">
              <Grid item className={styles.qrCodeWrapper}>
                <img
                  className={styles.qrCode}
                  src={`data:image/png;base64,${staticPixQrCode?.qrCode}`}
                  alt="qr code"
                />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className={styles.subtitle} align="center">
                Mostre esse QR Code para o pagador <br></br> ou
              </Typography>
            </Grid>
            <Box display="Flex" justifyContent="center">
              <Button onClick={onSharePixQrCodeClick} data-test-id="share-button">Compartilhe</Button>
            </Box>
            <Grid item>
              <Typography className={styles.subtitle} align="center">
                Ao ler o QR Code o pagador verá os dados do pagamento
              </Typography>
            </Grid>
            <Box display="Flex" justifyContent="center">
              <ButtonWithFloatingIcon
                className={styles.button}
                onClick={onSetValue}
              >
                Definir valor
              </ButtonWithFloatingIcon>
            </Box>
            <Typography className={styles.text} data-test-id="select-key">Selecione a chave</Typography>
            <Box
              display="grid"
              gridRowGap={1}
              margin="0 -16px"
              className={styles.keyTypesList}
            >
              {!pixKey ? (
                pixKeyList?.slice(0, 1).map((pixKey, key) => {
                  return (
                    <SelectionCard
                      title={PixKeyType[pixKey.pixKeyType!]}
                      key={key}
                      subtitle={
                        pixKey.pixKeyType! === PixKeyType.CPF ||
                        pixKey.pixKeyType! === PixKeyType.CNPJ ||
                        pixKey.pixKeyType! === PixKeyType.PhoneNumber
                          ? applyMaskPixKey(
                              pixKey.pixKeyType!,
                              pixKey.pixKeyValue!,
                            )
                          : pixKey.pixKeyValue
                      }
                      startIcon={mapPixKeyTypeToIcon(pixKey.pixKeyType!)}
                      onClick={onPixKeySelectionClick}
                    />
                  )
                })
              ) : (
                <SelectionCard
                  title={PixKeyType[pixKey?.pixKeyType!]}
                  subtitle={
                    pixKey?.pixKeyType! === PixKeyType.CPF ||
                    pixKey?.pixKeyType! === PixKeyType.CNPJ ||
                    pixKey?.pixKeyType! === PixKeyType.PhoneNumber
                      ? applyMaskPixKey(
                          pixKey?.pixKeyType!,
                          pixKey?.pixKeyValue!,
                        )
                      : pixKey?.pixKeyValue
                  }
                  startIcon={mapPixKeyTypeToIcon(pixKey?.pixKeyType!)}
                  onClick={onPixKeySelectionClick}
                />
              )}
            </Box>
          </Grid>
        }
        footer={
          <Grid className={styles.footer}>
            <ProcessPageFooter onBackButtonClick={onBackButtonClick} />
          </Grid>
        }
      />
      <PixKeySelection
        open={onPixKeySelection}
        onClose={onPixKeySelectionClose}
      />
      <SharePixQrCode open={onSharePixQrCode} onClose={onSharePixQrCodeClose} />
    </PageContainer>
  )
}
