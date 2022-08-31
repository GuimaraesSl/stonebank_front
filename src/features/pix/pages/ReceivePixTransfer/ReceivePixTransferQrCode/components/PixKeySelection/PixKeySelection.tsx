import React from 'react'
import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './PixKeySelection.style'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'
import { maskCpf } from '_utils/masks/taxPayer'
import { maskCnpj } from '_utils/masks/taxId'
import { maskPhone } from '_utils/masks/phone'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { SelectionCard } from 'components'
import { PixKeyStatus } from 'features/pix/redux/models/pixKeyStatus'
import { EmptyListMessage } from 'features/pix/pages/PixKeyManagement/PixKeyList/components/EmptyListMessage'
import { PixKey } from 'features/pix/redux/models/pixKey'

interface PixKeySelectionProps {
  open: boolean
  onClose: Function | ((PixKeySelectionValid: boolean) => void)
}

export const PixKeySelection: React.FC<PixKeySelectionProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles()

  const { pixKeyList } = useSelector((state: StoreState) => state.pix)

  const onCloseButtonClick = () => {
    onClose(false)
  }

  const applyMaskPixKey = (keyType: number, keyValue: string) =>
    keyType === PixKeyType.CPF
      ? maskCpf(keyValue)
      : keyType === PixKeyType.CNPJ
      ? maskCnpj(keyValue)
      : keyValue.substring(1, 3) + ' ' + maskPhone(keyValue.substring(3))

  const mapPixKeyTypeToIcon = (keyType: number) =>
    PixKeyType.CPF === keyType || PixKeyType.CNPJ === keyType
      ? 'pixTaxId'
      : PixKeyType.Email === keyType
      ? 'pixMail'
      : PixKeyType.PhoneNumber === keyType
      ? 'pixPhone'
      : 'pixKey'

  const dispatch = useDispatch()

  const isRegistered = (keyType?: number) => {
    const verifyIfKeyExist = pixKeyList?.some(pixKey => {
      if (keyType === 0 && pixKey.pixKeyType === 1) return true

      return pixKey.pixKeyType === keyType
    })
    return verifyIfKeyExist
  }
  const onKeyClick = (pix: PixKey) => {
    // dispatch(updatePix(pix))
    // dispatch(generateStaticPixQRCode())
    onClose(false)
  }

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(false)}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="inherit" />}
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h6" gutterBottom className={styles.title}>
                  Selecione o tipo de chave?
                </Typography>
                <Box className={styles.receiverSection}>
                  {pixKeyList?.length ? (
                    <>
                      {pixKeyList?.map((pixKey, key) => {
                        return pixKey.status === PixKeyStatus.Registered ? (
                          <SelectionCard
                            variant="pix"
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
                            onClick={() => onKeyClick(pixKey!)}
                          />
                        ) : (
                          ''
                        )
                      })}
                    </>
                  ) : (
                    <EmptyListMessage />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
