import React from 'react'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { cancelLabel } from 'constants/buttons/labels'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
// import TimIcon from "_assets/icons/TimIcon.svg";
import { AccountRoutes } from 'features/account/constants/routes'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './CancelPeriodicTopUp.style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { CurrencyFormatter, DateFormatter } from '_translate'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { generateTopUp, getTopUpPeriodic, updateTopUpData } from 'features/topUp/redux/actions'
import { TopUpRoutes } from 'features/topUp/constants/routes'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { SuccessTopUpState } from 'features/topUp/redux/state'
import { OperationType } from 'features/account/redux/models/operationType'

export const CancelPeriodicRepetition: React.FC = () => {
  const topUp = useSelector((state: StoreState) => state.topUp.topUp)
  const topUpState = useSelector((state: StoreState) => state.topUp)
  const topUpPeriodicList = useSelector(
    (state: StoreState) => state.topUp.topUpPeriodicList.topUpPeriodicList!,
  )

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  const { errorMessage, loading } = topUpState

 
  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) dispatch(generateTopUp())
    setOpenAuthorizationSheet(false)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <Box className={styles.headerContent}>
            <ProcessDescriptionHeader
              title="Recargas"
              subtitle="Celular pré-pago"
              description={'Cancelar recarga' + topUp?.phoneNumber}
            />
          </Box>
        }
        main={
          <React.Fragment>
            {
           (topUpState instanceof SuccessTopUpState) ?  topUpPeriodicList.map(
                (item: any) => {
                  return (
                    <>
                      <Box>Numero: {item.contractIdentifier}</Box>
                      <Box>a cada: {item.periodic} dias</Box>
                    </>
                  )
                }
              )   : "Não há recargas agendadas." 
            }
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                onClick={onConcludeButtonClick}
                size="medium"
                endIcon={<KeyboardArrowRight color="secondary" />}
                data-test-id="conclude-button"
              >
                Concluir
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        description="Está tudo certo? Agora é só inserir seu token para confirmar a recarga"
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
