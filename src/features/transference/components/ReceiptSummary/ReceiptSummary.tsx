import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'
import React from 'react'
import { ConfigContext } from '_config'

import { useStyles } from './ReceiptSummary.style'

interface ReceiptSummaryProps {
  value: string
  account: string
  taxId: string
  data: string
  description: string
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({
  value,
  account,
  taxId,
  data,
  description,
}) => {
  const { company } = React.useContext(ConfigContext)
  const styles = useStyles()

  return (
    <React.Fragment data-test-id="receipt=summary">
      <TransactionDetail className={styles.voucherContent}>
        <TransactionDetailName className={styles.detailTransferContent}>
          Transferência no valor de
        </TransactionDetailName>
        <TransactionDetailValue className={styles.detailTransferContent}>
          <strong>R$ {value}</strong>
        </TransactionDetailValue>
        <TransactionDetailName className={styles.detailTransferContent}>
          para a conta {company.name} de
        </TransactionDetailName>
        <TransactionDetailValue className={styles.detailTransferContent}>
          <strong> {account} </strong>
        </TransactionDetailValue>
        <TransactionDetailName className={styles.detailTransferContent}>
          <div> com CPF </div>
        </TransactionDetailName>
        <TransactionDetailValue className={styles.detailTransferContent}>
          <strong> {taxId} </strong>
        </TransactionDetailValue>
        <TransactionDetailName className={styles.detailTransferContent}>
          <div> no dia </div>
        </TransactionDetailName>
        <TransactionDetailValue className={styles.detailTransferContent}>
          <strong> {data} </strong>
        </TransactionDetailValue>
        <TransactionDetailName className={styles.detailTransferContent}>
          <div> descrição da transferência </div>
        </TransactionDetailName>
        <TransactionDetailValue className={styles.detailTransferContent}>
          <strong> {description} </strong>
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
