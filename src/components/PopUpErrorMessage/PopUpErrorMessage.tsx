import React from 'react'
import { useStyle } from './PopUpErrorMessage.style'
import { Drawer, Box, Typography } from '@material-ui/core'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { Icon } from 'components/Icon'

interface AlertProps {
  open: boolean
  onClose?: (args: boolean) => void
  onClick?: React.MouseEventHandler<HTMLElement>
  title?: string | undefined
}

export const PopUpErrorMessage: React.FC<AlertProps> = ({
  open,
  onClose = () => {},
  onClick,
  title,
}) => {
  const styles = useStyle()

  const onCloseButtonClick = () => {
    onClose(true)
  }

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(true)}
        onClick={onClick}
      >
        <PageContainer>
          <Box className={styles.alertContainer} data-test-id="popUp-error" >
            <Icon name="popUpError" className={styles.imgAlert} />
            <Box className={styles.textContainer}>
              <Typography className={styles.textError}>
                Calma, algo não está certo...
              </Typography>
              <Typography className={styles.textAlert}>
                {title || 'Foi encontrado um erro. Tente novamente!'}
              </Typography>
            </Box>
            <Box className={styles.buttonRow} data-test-id="understood-button" >
              <Button size="large" onClick={onCloseButtonClick} fullWidth>
                Entendi
              </Button>
            </Box>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
