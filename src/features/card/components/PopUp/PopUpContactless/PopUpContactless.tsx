import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyle } from './PopUpContactless.style'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { Drawer, Grid } from '@material-ui/core'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { PageContainer } from 'components/PageContainer'
import { Icon } from 'components/Icon'

interface PopUpBlockPropsState {
  loading: boolean
  message?: string
  success?: boolean
  validatedToken?: boolean
}

interface PopUpBlockProps {
  open: boolean
  onClose: Function | ((contactIsValid: boolean) => void)
}

export const PopUpContactless: React.FC<PopUpBlockProps> = ({
  open,
  onClose,
}) => {
  const [{ loading, success, validatedToken, message }, setState] =
    React.useState<PopUpBlockPropsState>({
      loading: false,
    })

  React.useEffect(() => {
    if (validatedToken) onClose(validatedToken)
  }, [validatedToken])

  const styles = useStyle()

  const onShowSucessMessageClose = () => {
    onClose(false)
  }

  const onConfirmButtonClick = async () => {
    setState({ loading: true })
    if (validatedToken === true) {
      setState({
        loading: false,
        success: true,
        validatedToken: true,
        message: 'Contactless ativo',
      })
    } else {
      setState({
        loading: false,
        success: true,
        validatedToken: false,
        message: 'Contactless desativado',
      })
    }

    onShowSucessMessageClose()
  }

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(validatedToken ?? false)}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onShowSucessMessageClose}
                startIcon={<Close color="primary" />}
                data-test-id="close-button"
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography className={styles.textBlock}>
                  Deseja realmente bloquear a função
                  <br /> Contactless desse cartão?
                </Typography>
                <Typography className={styles.subtextBlock}>
                  Ele não funcionará por aproximação até você reativar essa
                  função.
                </Typography>
              </Grid>
              <Grid item className={styles.buttonsRow}>
                <Grid container justify="center" spacing={4}>
                  <Grid item>
                    <ButtonWithFloatingIcon
                      icon={<Icon name="confirm" />}
                      onClick={onConfirmButtonClick}
                      data-test-id="confirm-button"
                    >
                      Confirmar
                    </ButtonWithFloatingIcon>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
      <Loader open={loading} />
      {message && (
        <Alert
          title={success ? 'Sucesso' : 'Erro'}
          message={message}
          severity={success ? 'success' : 'error'}
          onClose={validatedToken ? onShowSucessMessageClose : undefined}
        />
      )}
    </React.Fragment>
  )
}
