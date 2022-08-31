import React from 'react'
import { useStyles } from './ReadQrCodeButton.style'
import { Button } from 'components/Button'
import { Box } from '@material-ui/core'
import { Icon } from 'components/Icon'

export const ReadQrCodeButton: React.FC = () => {
  const styles = useStyles()
  return (
    <Box className={styles.qrCodeButtonStyle}>
      <Button
        data-test-id="read-qr-code-button"
        startIcon={
          <Icon name={'qrCodeIconButton'} className={styles.qrcodeimg} />
        }
        palette="secondary"
        onClick={() => {}}
      >
        <span className="labelButtonQrCode">Ler QR Code</span>
      </Button>
    </Box>
  )
}
