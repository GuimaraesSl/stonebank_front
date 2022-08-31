import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { CardData } from 'features/card/components/CardData'
import { useStyles } from './CardOption.style'
import { ListButtonSwitch } from 'features/card/components/ListButton/ListButtonSwitch'
import { PopUpTempBlock } from 'features/card/components/PopUp/PopUpTempBlock'
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { CardRoutes } from 'features/card/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { SwitchIOS } from 'components/SwitchIOS'
import { StoreState } from 'redux/state'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { block, closeAlert, unblock } from 'features/card/redux/actions'
import { Icon } from 'components/Icon'

export const CardOption: React.FC = () => {
  const { card, loading, errorMessage } = useSelector(
    (state: StoreState) => state.card,
  )

  const [openCardPopup, setOpenCardPopup] = React.useState(Boolean)
  const [displayCard, setDisplayCard] = React.useState(card)
  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  React.useEffect(() => {
    setDisplayCard(card)
  }, [card])

  const imageFlagCard = (flag: string) => {
    switch (flag) {
      case 'ELO':
        return <Icon name="eloImage" />

      case 'VISA':
        return <Icon name="visaImage" />

      case 'MasterCard':
        return <Icon name="visaImage" />
    }
  }

  const onChangePasswordClick = () =>
    history.push(CardRoutes.enterCurrentPassword)

  const onCancelCard = () => history.push(CardRoutes.cancel)

  const onCardPopupClose = (password?: string) => {
    setOpenCardPopup(false)
    if (!password) return

    card!.isBlocked
      ? dispatch(unblock(card!.identifierCard, password))
      : dispatch(block(card!.identifierCard, password))
  }

  const onActiveButtonState = () => {
    setOpenCardPopup(true)
  }

  React.useEffect(() => {
    dispatch(closeAlert())
  }, [errorMessage])

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <Box>
            <CardData
              fullName={displayCard?.fullName}
              panLastDigits={displayCard?.panLastDigits}
              flagCard={imageFlagCard('ELO')}
            />
            <Typography className={styles.idCard} data-test-id="id-card">
              IDCARD: {displayCard?.identifierCard}
            </Typography>
          </Box>
        }
        main={
          <React.Fragment>
            <Box
              className={styles.descriptionBoxText}
              data-test-id="card-option-description"
            >
              <Typography className={styles.description}>
                Seu cartão é aceito somente em estabelecimentos físicos na
                função <strong>CRÉDITO</strong>. Até o limite do saldo
                disponível em sua conta.
              </Typography>
            </Box>
            <Box className={styles.listButtons}>
              <ListButtonSwitch
                title="Bloqueio temporário"
                onClick={onActiveButtonState}
                right={<SwitchIOS checked={displayCard?.isBlocked ?? false} />}
                data-test-id="activate-button-state"
              />
              <ListButtonSwitch
                title="Alterar Senha"
                onClick={onChangePasswordClick}
                data-test-id="change-password"
              />
              <ListButtonSwitch
                title="Cancelar e 2ª Via"
                onClick={onCancelCard}
                data-test-id="cancel-card"
              />
            </Box>
          </React.Fragment>
        }
        footer={
          <Box>
            <PopUpTempBlock
              open={openCardPopup}
              onClose={onCardPopupClose}
              panLastDigits={displayCard?.panLastDigits}
              identifier={displayCard?.identifierCard}
              isBlocked={displayCard?.isBlocked}
              flagName="ELO"
            />
            <ProcessPageFooter />
          </Box>
        }
      />
      {/* <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity="error"
          onClose={onAlertClose}
        />
      )} */}
    </PageContainer>
  )
}
