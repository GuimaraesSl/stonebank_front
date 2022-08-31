import React, { useEffect, useMemo, useState } from 'react'
import { Close } from '@material-ui/icons'
import { useStyle } from './TransactionList.style'
import { Typography, Box, Card, ListItem, Button } from '@material-ui/core'
import { CurrencyFormatter } from '_translate'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Icon } from 'components/Icon'
interface DayTransactionsProps {
  typePayment?: string | number
  value?: number | bigint
  name?: string
  status?: number
  paymentDate?: Date
  dueDate?: Date
  onClick: () => void
}
export const TransactionList: React.FC<DayTransactionsProps> = ({
  typePayment,
  value,
  name,
  status,
  paymentDate,
  onClick,
}) => {
  const styles = useStyle()
  const transactionType = useSelector(
    (state: StoreState) =>
      state.futureTransactions.futureTransaction?.futureTransactionType,
  )

  const convertDate = (date: Date) => {
    if (date) {
      const dateString = date || new Date()
      const day = dateString.getDate().toString().padStart(2, '0')
      const month = (dateString.getMonth() + 1).toString().padStart(2, '0')
      const year = dateString.getFullYear()
      return `${day}/${month}/${year}`
    }
    return undefined
  }

  const paymentStatus = useMemo(() => {
    return {
      status:
        status === 0
          ? {
              statusName: 'criado',
              statusIcon: (
                <Icon name="paymentToExpire" className={styles.icon} />
              ),
            }
          : status === 1
          ? {
              statusName: 'pago',
              statusIcon: <Icon name="paid" className={styles.icon} />,
            }
          : status === 2
          ? {
              statusName: 'cancelado',
              statusIcon: (
                <Icon name="paymentCanceled" className={styles.icon} />
              ),
            }
          : status === 3
          ? {
              statusName: 'erro',
              statusIcon: <Icon name="paymentLate" className={styles.icon} />,
            }
          : {
              statusName: 'erro de saldo',
              statusIcon: <Icon name="paymentLate" className={styles.icon} />,
            },
    }
  }, [status])

  const transactionsStatus = paymentStatus.status

  const dateText =
    typePayment === 'Transferência por SMS'
      ? `criado dia: ${convertDate(new Date(paymentDate!))}`
      : `agendado para o dia: ${convertDate(new Date(paymentDate!))}`

  const futureTransactionText = !name
    ? ''
    : transactionType === 0
    ? `para ${name}`
    : ` de ${name}`

  return (
    <React.Fragment>
      <Card className={styles.transactionContainer}>
        <ListItem>
          <Box
            className={styles.sheduleTransactionCard}
            data-test-id="transaction-list"
          >
            <Box className={styles.textDescripition}>
              {typePayment}
              <Box className={styles.transactionsDate}>{dateText}</Box>
            </Box>
            <Box className={styles.transactionValue}>
              {CurrencyFormatter.format(value!)}
              <Box className={styles.buttonContainer}>
                {transactionType === 0 && status === 0 ? (
                  <Button
                    className={styles.cancelButton}
                    size="small"
                    onClick={onClick}
                    startIcon={<Close color="primary" />}
                    data-test-id="cancel-button"
                  >
                    Cancelar
                  </Button>
                ) : (
                  ''
                )}
              </Box>
            </Box>
            <Box>
              <Typography>
                <Box data-test-id="transactions" className={styles.textName}>
                  {futureTransactionText}
                </Box>
                <Box className={styles.transactionStatus}>
                  {transactionsStatus?.statusIcon}
                  &nbsp;{transactionsStatus?.statusName}
                </Box>
              </Typography>
            </Box>
          </Box>
        </ListItem>
      </Card>
    </React.Fragment>
  )
}
