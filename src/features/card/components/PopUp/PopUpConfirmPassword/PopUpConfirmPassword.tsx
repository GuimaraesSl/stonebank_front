import React, { useState } from 'react'
import { OtpInput } from 'components/OtpInput/OtpInput'
import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './PopUpConfirmPassword.style'
import { AlertConcluded } from 'components/AlertConcluded'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'
import { useLocation } from 'react-router-dom'
import { CardRoutes } from 'features/card/constants/routes'
import { inactivateAndReissueCard } from 'features/card/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { InactivateCardAndReissueState } from 'features/card/redux/state'
import { Icon } from 'components/Icon'

interface PopUpProps {
  open: boolean
  onClose?: (args?: boolean) => void
  onClickAlert?: React.MouseEventHandler<HTMLElement>
  alertTitle: string
}

export const PopUpConfirmPassword: React.FC<PopUpProps> = ({
  open,
  onClose = () => {},
  onClickAlert,
  alertTitle,
}) => {
  const [password, setPassword] = React.useState<string>()
  const styles = useStyles()
  const dispatch = useDispatch()
  const cardState = useSelector((state: StoreState) => state.card)
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])
  const [isDisable, setIsDisable] = React.useState<boolean>(true)

  const location = useLocation()

  const handlePassword = (value: string) => {
    setPassword(value)
  }
  const closePopUp = () => {
    onClose()
  }
  const [onShowAlert, setShowAlert] = useState(false)
  const controllerAlert = () => {
    if (location.pathname === CardRoutes.reissueDetails)
      dispatch(
        inactivateAndReissueCard(
          card?.identifierCard!,
          password!,
          card?.reasonCode!,
        ),
      )
  }

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onEnableButton = () => {
    password?.length === 4 ? setIsDisable(false) : setIsDisable(true)
  }

  React.useEffect(() => {
    onEnableButton()
  }, [password])

  React.useEffect(() => {
    if (cardState instanceof InactivateCardAndReissueState) {
      setShowAlert(true)
    }
  }, [cardState])

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(true)}
        data-test-id="drawer"
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                data-test-id="close-pop-up"
                size="small"
                palette="secondary"
                onClick={closePopUp}
                startIcon={<Close color="primary" />}
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography className={styles.text}>
                  Digite a senha do seu cartão
                </Typography>
              </Grid>
              <Grid item>
                <OtpInput
                  numInputs={4}
                  onChange={(value: string) => handlePassword(value)}
                  value={password}
                  className={styles.OtpInput}
                  isInputSecure={true}
                  data-test-id="input-password"
                  isInputNum
                />
              </Grid>
              <Grid item>
                <Box className={styles.confirm}>
                  <ButtonWithFloatingIcon
                    icon={<Icon name={'confirm'} />}
                    onClick={controllerAlert}
                    disabled={isDisable}
                    data-test-id="controller-alert"
                  >
                    Confirmar
                  </ButtonWithFloatingIcon>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Loader open={loading} />
          {errorMessage && (
            <Alert title="Erro" message={errorMessage} severity="error" />
          )}
          <AlertConcluded
            open={onShowAlert}
            onClose={onCloseAlert}
            onClick={onClickAlert}
            title={alertTitle}
          />
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
