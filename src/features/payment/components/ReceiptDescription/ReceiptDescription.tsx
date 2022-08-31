import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'
import React from 'react'
import { CurrencyFormatter, ShortDateFormatter } from '_translate'
import { maskBarcode } from '_utils/masks/barCode'
import { useStyles } from './ReceiptDescription.style'

interface VoucherDescriptionProps {
  paymentValue: number
  receiverName: string
  bank: string
  paymentDate: Date
  barcode: string
}

export const ReceiptDescription: React.FC<VoucherDescriptionProps> = ({
  paymentValue,
  receiverName,
  bank,
  paymentDate,
  barcode,
}: VoucherDescriptionProps) => {
  const styles = useStyles()
  return (
    <React.Fragment data-test-id="voucher-content">
      <TransactionDetail className={styles.voucherContent}>
        <TransactionDetailName>Pagamento no valor de</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {CurrencyFormatter.format(paymentValue)} </strong>
        </TransactionDetailValue>
        <TransactionDetailName>Recebedor </TransactionDetailName>
        <TransactionDetailValue>
          <strong> {receiverName} </strong>
        </TransactionDetailValue>
        <TransactionDetailName> Data</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {ShortDateFormatter.format(paymentDate)} </strong>
        </TransactionDetailValue>
        <TransactionDetailName>Banco emissor</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {bank} </strong>
        </TransactionDetailValue>
        <TransactionDetailName> Código de barras</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {maskBarcode(barcode)} </strong>
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
