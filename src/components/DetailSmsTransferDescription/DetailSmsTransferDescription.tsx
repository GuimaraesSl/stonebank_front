import React from 'react'
import { CurrencyFormatter, DateFormatter } from '_translate'
import { useStyles } from './DetailSmsTransferDescription.style'
import { Box, Typography } from '@material-ui/core'
import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'

interface DetailSmsTransferDescriptionProps {
  value: number
  number: string
  date: Date
  name?: string
}

export const DetailSmsTransferDescription: React.FC<
  DetailSmsTransferDescriptionProps
> = ({ value, number, date, name }) => {
  const styles = useStyles()
  return (
    <React.Fragment data-test-id="detail-sms-transfer-description">
      <TransactionDetail className={styles.detailSmsTransferContent}>
        <TransactionDetailName>Transferência no valor de</TransactionDetailName>
        <TransactionDetailValue className={styles.transferDetail}>
          {CurrencyFormatter.format(value)}
        </TransactionDetailValue>
        <TransactionDetailName>para a pessoa</TransactionDetailName>
        <TransactionDetailValue className={styles.transferDetail}>
          {name}
        </TransactionDetailValue>
        <TransactionDetailName> via SMS para o número </TransactionDetailName>
        <TransactionDetailValue className={styles.transferDetail}>
          {number}
        </TransactionDetailValue>
        <TransactionDetailName> no dia </TransactionDetailName>
        <TransactionDetailValue className={styles.transferDetail}>
          {DateFormatter.format(date)}
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
