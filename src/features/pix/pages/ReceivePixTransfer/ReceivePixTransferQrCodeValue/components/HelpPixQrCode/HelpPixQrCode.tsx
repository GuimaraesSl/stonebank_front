import React from 'react'
import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './HelpPixQrCode.style'

interface HelpPixQrCodeProps {
  open: boolean
  onClose: Function | ((HelpPixQRCodeValid: boolean) => void)
}

export const HelpPixQrCode: React.FC<HelpPixQrCodeProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles()

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
                  Ajuda
                </Typography>
                <Typography variant="body2" className={styles.subtitle}>
                  Os campos Identificador e Valor são opcionais para criação do
                  QRCode. Caso você não especifique o valor, o preenchimento do
                  campo será feito pelo pagador.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
