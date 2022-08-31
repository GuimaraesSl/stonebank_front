import { CurrencyFormatter, DateFormatter } from '_translate'
import React from 'react'
import { useStyles } from 'features/taxpayment/components/DetailsDarjDescription/DetailsDarjDescription.style'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'
import { TransactionDetail } from 'components/TransactionDetail'

interface DetailsDarjDescriptionProps {
  contributorTaxId?: string
  referenceNumber?: string
  principalValue?: number
  fineValue?: number
  interestValue?: number
  monetaryValue?: number
  totalValue?: number
  rateValue?: number
  dueDate?: Date | null
  paymentDate?: Date | null
  tags?: string[]
  codeRevenue?: string
  stateRegistration?: string
  originDocument?: number
  rateValueType?: number
  description?: string
}
export const DetailsDarjDescription: React.FC<DetailsDarjDescriptionProps> = ({
  contributorTaxId,
  referenceNumber,
  principalValue,
  fineValue,
  interestValue,
  monetaryValue,
  totalValue,
  rateValue,
  dueDate,
  paymentDate,
  tags,
  codeRevenue,
  stateRegistration,
  originDocument,
  rateValueType,
  description,
}: DetailsDarjDescriptionProps) => {
  const styles = useStyles()

  return (
    <React.Fragment>
      <TransactionDetail
        className={styles.summaryContent}
        data-test-id="details-darj-description"
      >
        <TransactionDetailName>CPF/CNPJ do Contribuinte</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{maskTaxPayer(contributorTaxId!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Data de Apuração</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{referenceNumber}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Valor Principal</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(principalValue!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Valor Monetário</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {CurrencyFormatter.format(monetaryValue!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Multa</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(fineValue!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Juros</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(interestValue!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Taxas</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(rateValue!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Valor Total</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {CurrencyFormatter.format(totalValue!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Data de Vencimento</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {DateFormatter.format(dueDate!)} </strong>
        </TransactionDetailValue>
        <TransactionDetailName>Data de Pagamento</TransactionDetailName>
        <TransactionDetailValue>
          <strong> {DateFormatter.format(paymentDate!)} </strong>
        </TransactionDetailValue>
        <TransactionDetailName>Tags</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{tags?.join(', ')}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Código da receita</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{codeRevenue}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Registro Estadual</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{stateRegistration}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Documento de Origem</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{originDocument}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Tipo de Taxa</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{rateValueType}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Descrição</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{description}</strong>
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
