import React, { useEffect, useState } from 'react'
import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './ShareCode.style'
import { useSelector } from 'react-redux'
import { Clipboard } from 'ts-clipboard'
import { StoreState } from 'redux/state'
import { Alert } from 'components/Alert'

interface ShareCodeProps {
  open: boolean
  onClose: Function | ((ShareCodeValid: boolean) => void)
}

export const ShareCode: React.FC<ShareCodeProps> = ({ open, onClose }) => {
  const styles = useStyles()

  const [alertMessage, setAlertMessage] = useState('')
  const { staticPixQrCode } = useSelector((state: StoreState) => state.pix)

  const shareData = () => {
    let data = staticPixQrCode?.hashCode!

    Clipboard.copy(data)
    setAlertMessage('Copiado para área de transferência')
  }

  const onCloseAlert = () => {
    setAlertMessage('')
  }

  const onCloseButtonClick = () => {
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
                  Código texto do QR Code copiado
                </Typography>
                <Typography variant="body2" className={styles.subtitle}>
                  <Box className={styles.qrCode}>
                    {staticPixQrCode?.hashCode!}
                  </Box>
                  <Button palette="secondary" onClick={shareData}>
                    Copiar
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
        {alertMessage && (
          <Alert
            title=""
            message={alertMessage}
            severity="info"
            onClose={onCloseAlert}
          />
        )}
      </Drawer>
    </React.Fragment>
  )
}
