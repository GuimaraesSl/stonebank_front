import { CurrencyFormatter, DateFormatter } from '_translate'
import React from 'react'
import { useStyles } from 'features/taxPayment/components/DetailsGareDescription/DetailsGareDescription.style'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'

interface DetailsGareDescriptionProps {
  type?: string
  name?: string
  taxPayer?: string | null
  paymentDate?: Date
  codeRevenue: number
  principalValue: number
  referenceNumber?: string
  fineValue: number
  interestValue: number
  dueDate?: Date
  quoteNumberNotification: number
  totalValue: number
  description: string
}

export const DetailsGareDescription: React.FC<DetailsGareDescriptionProps> = ({
  type,
  name,
  taxPayer,
  paymentDate,
  codeRevenue,
  principalValue,
  referenceNumber,
  fineValue,
  interestValue,
  dueDate,
  quoteNumberNotification,
  totalValue,
  description,
}) => {
  const styles = useStyles()

  return (
    <React.Fragment>
      <TransactionDetail
        className={styles.summaryContent}
        data-test-id="details-gare-description"
      >
        <TransactionDetailName>Tipo GARE</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{type}</strong>
        </TransactionDetailValue>
        <TransactionDetailValue>
          <strong>{name}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>CPF/CNPJ do contribuinte</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{maskTaxPayer(taxPayer!)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Data de apuração</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{referenceNumber}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Código da receita</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{codeRevenue}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>
          Número de notificação da cotação
        </TransactionDetailName>
        <TransactionDetailValue>
          <strong>{quoteNumberNotification}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Valor principal</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(principalValue)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Multa</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(fineValue)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Juros</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(interestValue)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Valor total</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(totalValue)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Data de Vencimento</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{DateFormatter.format(dueDate)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Data de Pagamento</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{DateFormatter.format(paymentDate)}</strong>
        </TransactionDetailValue>

        <TransactionDetailName>Descrição</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{description}</strong>
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
