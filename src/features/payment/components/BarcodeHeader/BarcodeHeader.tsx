import { Box, Link, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './BarcodeHeader.style'
import { Close } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { Icon } from 'components/Icon'

export const BarcodeHeader: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()

  const onCancelButtonClick = () => {
    history.goBack()
  }

  return (
    <Box>
      <Box className={styles.informationAlign} data-test-id="barcode-header">
        <Typography className={styles.textHelp}>
          Alinhe o código com os limites do leitor na tela
        </Typography>
      </Box>
      <Box className={styles.informationReader}>
        <Typography className={styles.textReader}>
                  <Icon name={'cameraIconRotate'}  className={styles.cameraIcon} />
          Leitor de código de barras
        </Typography>
        <Link
          className={styles.buttonClose}
          onClick={onCancelButtonClick}
          underline="none"
          data-test-id="cancel-button"
        >
          <Close />
          Cancelar
        </Link>
      </Box>
    </Box>
  )
}
