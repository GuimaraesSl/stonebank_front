import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Button } from 'components/Button'
import { TransactionList } from 'features/schedulePayments/components/TransactionList'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { useStyles } from './ScheduleTransactionsList.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { SearchFilter } from 'features/schedulePayments/components/SearchFilter'
import { Divider } from 'components/Divider/Divider'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { SchedulePayments } from 'features/schedulePayments/constants/routes'
import { PopUpCancelScheduledPayment } from 'features/schedulePayments/components/PopUpCancelScheduledPayment'
import { AlertConcluded } from 'components/AlertConcluded'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { FindFuturePaymentsList } from 'features/schedulePayments/redux/models/futureTransactions'
import {
  getFutureTransactions,
  updateTransactions,
  selectPayment,
  closeAlert,
  getCancelPayments,
} from 'features/schedulePayments/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { EmptyList } from 'components/EmptyList'
import { Icon } from 'components/Icon'

export const ScheduleTransactionsList: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const { futureTransactions, futureTransaction, loading, errorMessage } =
    useSelector((state: StoreState) => state.futureTransactions)

  const [openCardPopup, setOpenCardPopup] = React.useState(false)
  const [onShowAlert, setShowAlert] = useState(false)
  const [displayPaymentsList, setdisplayPaymentsList] =
    React.useState(futureTransactions)
  const [displayFutureFilters, setDisplayFutureFilters] =
    React.useState(futureTransaction)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const [validatedToken, setValidatedToken] = React.useState(false)

  React.useEffect(() => {
    dispatch(getFutureTransactions())
  }, [])

  React.useEffect(() => {
    setDisplayFutureFilters(futureTransaction)
  }, [futureTransaction])

  React.useEffect(() => {
    setdisplayPaymentsList(futureTransactions)
  }, [futureTransactions])

  const onAlertClose = () => {
    setShowAlert(false)
    dispatch(closeAlert())
  }

  const onMoreFiltersButtonClick = () => {
    dispatch(updateTransactions(futureTransaction))
    history.push(SchedulePayments.SheduleTransactionsFilter)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransactions())
    history.replace(AccountRoutes.home)
  }

  const onCardPopupClose = (signal?: boolean) => {
    setOpenCardPopup(false)
    if (signal) {
      setOpenAuthorizationSheet(true)
    }
  }

  const onActiveButtonState = (futureTransactions: FindFuturePaymentsList) => {
    dispatch(
      selectPayment({
        DocumentNumber: displayFutureFilters?.DocumentNumber,
        operationType: displayFutureFilters?.operationType,
        futureTransactionType: displayFutureFilters?.futureTransactionType,
        initialDate: displayFutureFilters?.initialDate,
        finalDate: displayFutureFilters?.finalDate,
        ...futureTransactions,
      }),
    )
    setOpenCardPopup(true)
  }

  const convertDate = (date: Date | undefined) => {
    if (date) {
      const dateString = date || new Date()
      const day = dateString.getDate().toString().padStart(2, '0')
      const month = (dateString.getMonth() + 1).toString().padStart(2, '0')
      const year = dateString.getFullYear()

      return `${day}/${month}/${year}`
    }
    return undefined
  }

  const onAuthorizationSheetClose = (isTokenValid: boolean) => {
    if (isTokenValid) {
      setValidatedToken(true)
      dispatch(getCancelPayments())
      dispatch(getFutureTransactions())
      dispatch(closeAlert())
    }
    setOpenAuthorizationSheet(false)
  }

  React.useEffect(() => {
    if (validatedToken && futureTransaction?.success! === true) {
      setShowAlert(true)
      dispatch(getFutureTransactions())
    }
  }, [futureTransaction])

  const dateFilter = !(
    displayFutureFilters?.initialDate && displayFutureFilters?.finalDate
  )
    ? `Próximos 30 dias`
    : `de ${convertDate(displayFutureFilters?.initialDate)}
     à ${convertDate(displayFutureFilters?.finalDate)}`

  const isEmptyList = () => {
    return !displayPaymentsList?.length!
  }

  const onBackButtonClick = () => dispatch(updateTransactions())

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
          <React.Fragment>
            <ProcessDescriptionHeader title="Agendamentos" />
            <SearchFilter />
            <Box
              className={styles.filterContainer}
              data-test-id="schedule-transactions-list"
            >
              <Box className={styles.filterDates}>{dateFilter}</Box>
              <Box>
                <Divider spacing={1} className={styles.divider} />
              </Box>
              <Box className={styles.buttonFilter}>
                <ButtonWithFloatingIcon
                  icon={<Icon name={'buttonBg'} />}
                  onClick={onMoreFiltersButtonClick}
                  data-test-id="more-filters-button"
                >
                  Escolher data
                </ButtonWithFloatingIcon>
              </Box>
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <Box className={styles.containerTransaction}>
              {isEmptyList() ? (
                <EmptyList />
              ) : (
                displayPaymentsList?.map(list => (
                  <TransactionList
                    key={list.DocumentNumber}
                    value={list.principalValue}
                    typePayment={list.typeDescription}
                    name={list.name}
                    paymentDate={list.paymentDate}
                    status={list.status}
                    onClick={() => onActiveButtonState(list)}
                  />
                ))
              )}
            </Box>
            <Box>
              <PopUpCancelScheduledPayment
                open={openCardPopup}
                onClose={onCardPopupClose}
              />
              <AuthorizationSheet
                description="Para autenticar a operação"
                open={openAuthorizationSheet}
                onClose={onAuthorizationSheetClose}
              />

              <AlertConcluded
                open={onShowAlert}
                onClose={onAlertClose}
                onClick={onAlertClose}
                title={'Concluido'}
              />
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            onBackButtonClick={onBackButtonClick}
            data-test-id="back-button"
          />
        }
        footerPosition="fixed"
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity="error"
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
