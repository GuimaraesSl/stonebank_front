import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Box, Typography } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { Button } from 'components/Button'
import { nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { CardPhone } from 'features/topUp/components/CardPhone'
import { InputNumber } from 'features/topUp/components/InputNumber'
import { useStyles } from './TopUp.style'
import { TopUpRoutes } from 'features/topUp/constants/routes'
import {
  closeAlert,
  getTopUpPeriodic,
  getTopUpProductListByPhoneNumber,
  updateTopUpData,
} from 'features/topUp/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { maskPhone } from '_utils/masks/phone'
import { SuccessTopUpState } from 'features/topUp/redux/state'
import { Alert } from 'components/Alert'
import { Icon } from 'components/Icon'
import { Loader } from 'components/Loader'
export const TopUp: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const userState = useSelector((store: StoreState) => store.auth)
  const { user } = userState
  const topUpState = useSelector((state: StoreState) => state.topUp)
  const { loading, errorMessage } = topUpState
  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    dispatch(getTopUpPeriodic())
  }, [])

  React.useEffect(() => {
    if (submitted && topUpState instanceof SuccessTopUpState) {
      dispatch(
        updateTopUpData({
          phoneNumber: maskPhone(user?.phoneNumber!),
        }),
      )
      history.push(TopUpRoutes.checkDataTopUp)
    }
  }, [submitted, history, topUpState])

  const onCardPhoneClick = () => {
    dispatch(getTopUpProductListByPhoneNumber(maskPhone(user?.phoneNumber!)))
    if (topUpState instanceof SuccessTopUpState) {
      setSubmitted(true)
    }
  }

  const onClickPeriodic = () => {
    if (topUpState instanceof SuccessTopUpState)
      history.push(TopUpRoutes.cancelPeriodicTopUp)
  }
  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onNextButtonClick = () => {
    history.push(TopUpRoutes.topUpNumber)
    dispatch(
      updateTopUpData({
        phoneNumber: phoneNumber,
      }),
    )
  }

  const onBack = () => {
    history.push(AccountRoutes.home)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <Box className={styles.ContainerHeader}>
            <ProcessDescriptionHeader
              title="Recargas"
              subtitle="Celular pré-pago"
            />
          </Box>
        }
        main={
          <Box className={styles.Main}>
            <Box className={styles.ContainerCard}>
              <CardPhone
                title={'Meu celular'}
                description={'Cadastrado no seu perfil'}
                phoneNumber={maskPhone(user?.phoneNumber! ?? '')}
                data-test-id="phone-number"
                icon={
                  <Icon
                    name={'phone'}
                    className={styles.CardPhoneIconDimension}
                  />
                }
                type="standard"
                onClick={onCardPhoneClick}
              />
            </Box>
            <Box className={styles.AnotherPhoneNumber}>
              <Typography className={styles.AnotherPhone}>
                Quer recarregar outro celular?
              </Typography>
              <InputNumber
                description={'Celular com DDD'}
                setValuePhone={setPhoneNumber}
              ></InputNumber>
              {/* <Box className={styles.FloatingIcons}>
                <ButtonWithFloatingIcon
                  icon={FavoriteIcon}
                  onClick={}
                  data-test-id="favorite-button"
                >
                  Favoritos
                </ButtonWithFloatingIcon>
                <ButtonWithFloatingIcon
                  icon={ContactIcon}
                  onClick={}
                  data-test-id="contact-button"
                >
                  Contatos
                </ButtonWithFloatingIcon>
               
               */}
              <Box className={styles.periodicTopUpButton}>
                <ButtonWithFloatingIcon
                  data-test-id="periodic-TopUp"
                  onClick={onClickPeriodic}
                >
                  Buscar
                </ButtonWithFloatingIcon>
              </Box>
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={phoneNumber.length !== 16}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBack}
              >
                Voltar
              </Button>
            }
          />
        }
      ></ProcessPageLayout>

      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </PageContainer>
  )
}
