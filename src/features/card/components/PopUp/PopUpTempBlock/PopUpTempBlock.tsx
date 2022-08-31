import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyle } from './PopUpTempBlock.style'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { Drawer, Grid } from '@material-ui/core'
import { Alert } from 'components/Alert'
import { PageContainer } from 'components/PageContainer'
import { Loader } from 'components/Loader'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'
import { OtpInput } from 'components/OtpInput/OtpInput'
import { Icon } from 'components/Icon'

interface PopUpBlockPropsState {
  loading: boolean
  message?: string
  success?: boolean
  switchisBlocked?: boolean
}

interface PopUpBlockProps {
  open: boolean
  panLastDigits?: number
  identifier?: string
  isBlocked?: boolean
  flagName: string
  onClose: (_?: string) => void
}

export const PopUpTempBlock: React.FC<PopUpBlockProps> = ({
  open,
  onClose,
  isBlocked,
  flagName,
  panLastDigits,
}) => {
  const [{ loading, success, message }, setState] =
    React.useState<PopUpBlockPropsState>({
      loading: false,
    })

  const [cards] = useSelector<StoreState, [Card | undefined]>(state => [
    state.card.card,
  ])
  const [inputValue, setInputValue] = React.useState('')
  const [displayCards, setDisplayCards] = React.useState(cards)
  const [disableConcludeButton, setDisableConcludeButton] = React.useState(true)

  const styles = useStyle()
  const dispatch = useDispatch()

  React.useEffect(() => {
    setDisplayCards(cards)
  }, [cards])

  React.useEffect(() => {
    if (inputValue.length < 4) setDisableConcludeButton(true)
    else setDisableConcludeButton(false)
  }, [inputValue.length])

  const onCloseButtonClick = () => {
    onClose()
  }

  const handlePassword = (value: string) => {
    setInputValue(value)
  }

  const onConfirmButtonClick = () => {
    onClose(inputValue)
  }

  const blockrUnBlockDescription = !displayCards?.isBlocked ? (
    <Grid item data-test-id="temporary-block">
      <Typography className={styles.textBlock}>
        Deseja realmente bloquear
        <br /> temporariamente seu cartão?
      </Typography>
      <Typography className={styles.subtextBlock}>
        Seu cartão de crédito pré-pago{': '}
        <strong>
          {flagName} final {panLastDigits}
        </strong>
        , não poderá ser usado até que você reative.
      </Typography>
      <Typography className={styles.text}>Digite sua senha</Typography>
    </Grid>
  ) : (
    <Grid item>
      <Typography className={styles.textBlock}>
        Deseja realmente desbloquear seu cartão?
      </Typography>
      <Typography className={styles.subtextBlock}>
        Seu cartão de crédito pré-pago{': '}
        <strong>
          {flagName} final {panLastDigits}
        </strong>
        , poderá ser usado normalmente.
      </Typography>
      <Typography className={styles.text}>Digite sua senha</Typography>
    </Grid>
  )

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        open={open}
        onClose={() => onClose()}
        data-test-id="drawer"
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="primary" />}
                data-test-id="close-button"
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Box>{blockrUnBlockDescription}</Box>
              </Grid>
              <Grid item>
                <Box>
                  <OtpInput
                    className={styles.OtpInput}
                    numInputs={4}
                    onChange={(valueInput: string) =>
                      handlePassword(valueInput)
                    }
                    value={inputValue}
                    isInputSecure
                    isInputNum
                    data-test-id="input-password"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box className={styles.confirm}>
                  <ButtonWithFloatingIcon
                    icon={<Icon name={'confirm'} />}
                    disabled={disableConcludeButton}
                    onClick={onConfirmButtonClick}
                    data-test-id="confirm-button"
                  >
                    Confirmar
                  </ButtonWithFloatingIcon>
                </Box>
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
        />
      )}
    </React.Fragment>
  )
}
