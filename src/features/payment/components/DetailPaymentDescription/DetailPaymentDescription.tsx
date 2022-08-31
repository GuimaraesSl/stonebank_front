import { CurrencyFormatter } from '_translate'
import React, { ReactElement } from 'react'
import { useStyles } from './DetailPaymentDescription.style'
import { ShortDateFormatter } from '_translate'
import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'

interface DetailPaymentDescriptionProps {
  paymentValue: number
  receiverName?: string
  paymentDate?: Date
  description: string
  bankName: string
  tags?: React.ReactNode
}

export const DetailPaymentDescription: React.FC<
  DetailPaymentDescriptionProps
> = ({
  paymentValue,
  receiverName,
  paymentDate,
  description,
  bankName,
  tags,
}) => {
  const styles = useStyles()
  return (
    <React.Fragment>
      <TransactionDetail
        className={styles.detailPaymentContent}
        data-test-id="detail-payment-description"
      >
        <TransactionDetailName>Pagamento no valor de</TransactionDetailName>
        <TransactionDetailValue className={styles.paymentDetail}>
          {CurrencyFormatter.format(paymentValue)}
        </TransactionDetailValue>
        <TransactionDetailName> Recebedor </TransactionDetailName>
        <TransactionDetailValue className={styles.paymentDetail}>
          {receiverName}
        </TransactionDetailValue>
        <TransactionDetailName>no dia</TransactionDetailName>
        <TransactionDetailValue className={styles.capitalized}>
          {paymentDate && ShortDateFormatter.format(paymentDate)}
        </TransactionDetailValue>
        {description && (
          <>
            <TransactionDetailName>sua descrição foi </TransactionDetailName>
            <TransactionDetailValue className={styles.paymentDetail}>
              {description}
            </TransactionDetailValue>
          </>
        )}
        <TransactionDetailName> Banco Emissor </TransactionDetailName>
        <TransactionDetailValue className={styles.paymentDetail}>
          {bankName}
        </TransactionDetailValue>
        {tags && (
          <>
            <TransactionDetailName>Suas Tags</TransactionDetailName>
            <TransactionDetailValue className={styles.paymentDetail}>
              {tags}
            </TransactionDetailValue>
          </>
        )}
      </TransactionDetail>
    </React.Fragment>
  )
}
