import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { Button } from 'components/Button'
import { TransactionList } from 'features/schedulePayments/components/TransactionList'
import { AccountRoutes } from 'features/account/constants/routes'
import { SearchField } from 'components/SearchField/SearchField'
import { AppBar } from 'components/AppBar'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { useStyles } from './FutureTransactions.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { Divider } from 'components/Divider'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { SchedulePayments } from 'features/schedulePayments/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import {
  closeAlert,
  getCancelPayments,
  getFutureTransactions,
  updateTransactions,
} from 'features/schedulePayments/redux/actions'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { selectPayment } from 'features/schedulePayments/redux/actions'
import { FindFuturePaymentsList } from 'features/schedulePayments/redux/models/futureTransactions'
import { PopUpCancelScheduledPayment } from 'features/schedulePayments/components/PopUpCancelScheduledPayment'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { AlertConcluded } from 'components/AlertConcluded'
import { EmptyList } from 'components/EmptyList'
import { Icon } from 'components/Icon'

export const FutureTransactions: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const { futureTransactions, futureTransaction, loading, errorMessage } =
    useSelector((state: StoreState) => state.futureTransactions)

  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const [displayFutureFilters, setDisplayFutureFilters] =
    useState(futureTransaction)

  const [searchFutureTransaction, setSearchFutureTransaction] =
    useState(futureTransactions)

  const [openCardPopup, setOpenCardPopup] = React.useState(false)

  const [onShowAlert, setShowAlert] = useState(false)

  const [validatedToken, setValidatedToken] = React.useState(false)

  useEffect(() => {
    dispatch(getFutureTransactions())
  }, [])

  React.useEffect(() => {
    setDisplayFutureFilters(futureTransaction)
  }, [futureTransaction])

  const onMoreFiltersButtonClick = () => {
    dispatch(updateTransactions(futureTransaction))
    history.push(SchedulePayments.SheduleTransactionsFilter)
  }

  const onTransactionClick = (futureTransaction: FindFuturePaymentsList) => {
    dispatch(
      selectPayment({
        DocumentNumber: displayFutureFilters?.DocumentNumber,
        operationType: displayFutureFilters?.operationType,
        futureTransactionType: displayFutureFilters?.futureTransactionType,
        initialDate: displayFutureFilters?.initialDate,
        finalDate: displayFutureFilters?.finalDate,
        ...futureTransaction,
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

  useEffect(() => {
    setSearchFutureTransaction(futureTransactions)
  }, [futureTransactions])

  const _search = (value: string) => {
    value = value.replace(/^\s+|\s+$/, '').toLowerCase()
    const result = futureTransactions?.filter(p =>
      p.name?.toLowerCase().includes(value.toLowerCase()),
    )
    setSearchFutureTransaction(result)
  }

  const onCardPopupClose = (signal?: boolean) => {
    setOpenCardPopup(false)
    if (signal) {
      setOpenAuthorizationSheet(true)
    }
  }

  const onAlertClose = () => {
    setShowAlert(false)
    dispatch(closeAlert())
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

  const onCancelButtonClick = () => {
    dispatch(updateTransactions())
    history.replace(AccountRoutes.home)
  }

  const isEmptyList = () => {
    return !futureTransactions?.length!
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
            <Box className={styles.container}>
              <ProcessDescriptionHeader title="Entradas futuras" />
            </Box>
            <SearchField
              onChange={e => _search(e?.target.value)}
              placeholder="Busque por nome da conta"
            />
            <Box
              className={styles.filterContainer}
              data-test-id="future-transactions"
            >
              <Box className={styles.filterDates}>{dateFilter}</Box>
              <Box>
                <Divider spacing={1} className={styles.divider} />
              </Box>
              <Box className={styles.buttonFilter}>
                <ButtonWithFloatingIcon
                  icon={<Icon name="buttonBg" />}
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
                searchFutureTransaction?.map(transactions => (
                  <TransactionList
                    key={transactions.DocumentNumber}
                    value={transactions.principalValue}
                    typePayment={transactions.typeDescription}
                    status={transactions.status}
                    name={transactions.name}
                    paymentDate={transactions.paymentDate}
                    dueDate={transactions.dueDate}
                    onClick={() => onTransactionClick(transactions)}
                    data-test-id="transaction-list"
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
                title={'Concluído'}
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
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
