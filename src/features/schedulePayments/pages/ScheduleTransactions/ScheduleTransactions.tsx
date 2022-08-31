import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './ScheduleTransactions.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SelectionCard } from 'components/SelectionCard'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { SchedulePayments } from 'features/schedulePayments/constants/routes'
import { Divider } from 'components/Divider'
import { useDispatch } from 'react-redux'
import { updateTransactions } from 'features/schedulePayments/redux/actions'
import { FutureTransactionType } from 'features/schedulePayments/redux/models/futureTransactions'

export const ScheduleTransactions: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const onOutTransactionsClick = () => {
    dispatch(
      updateTransactions({
        futureTransactionType: FutureTransactionType.Pay,
      }),
    )
    history.push(SchedulePayments.ScheduleTransactionsList)
  }
  const onEntryTransactionsClick = () => {
    dispatch(
      updateTransactions({
        futureTransactionType: FutureTransactionType.Receive,
      }),
    )
    history.push(SchedulePayments.FutureTransactions)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransactions())
    history.replace(AccountRoutes.home)
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
          <ProcessDescriptionHeader
            title="Agendamentos"
            subtitle="Transações futuras"
            description="Confira e gerencie as transações agendadas já autorizadas e acompanhe seus recebimentos futuros."
          />
        }
        main={
          <React.Fragment>
            <Box className={styles.selectionCards}>
              <Divider spacing={0} />
              <SelectionCard
                title="Entradas"
                subsubtitle="Acompanhe o status de suas cobranças"
                endIcon={'moneyEntry'}
                onClick={onEntryTransactionsClick}
                data-test-id="entry-transactions-button"
              />
              <Divider spacing={0} className={styles.divider} />
              <SelectionCard
                title="Saídas"
                subsubtitle="Pagamentos e transferências agendadas já autorizadas"
                endIcon={'iconMoneyOut'}
                onClick={onOutTransactionsClick}
                data-test-id="out-transactions-button"
              />
            </Box>
          </React.Fragment>
        }
        footer={<ProcessPageFooter onBackButtonClick={onBackButtonClick} />}
      />
    </PageContainer>
  )
}
