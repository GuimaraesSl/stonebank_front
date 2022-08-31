import { CurrencyFormatter, DateFormatter } from '_translate'
import { useStyles } from 'features/taxPayment/components/DetailsFgtsDescription/DetailsFgtsDescription.style'
import React from 'react'
import { MaskBarCodeFgts } from '_utils/masks/barCode'

import { maskTaxPayer } from '_utils/masks/taxPayer'
import { TransactionDetail } from 'components/TransactionDetail'
import { TransactionDetailName } from 'components/TransactionDetailName'
import { TransactionDetailValue } from 'components/TransactionDetailValue'

interface DetailsFgtsDescriptionProps {
  type?: string
  name?: string
  taxPayer?: string | null
  paymentDate?: Date
  codeRevenue: string
  principalValue: number
  fgtsIdentifier: string
  socialConnectivityCode: number
  socialConnectivityDigit: number
  description: string
  barCode: string
}

export const DetailsFgtsDescription: React.FC<DetailsFgtsDescriptionProps> = ({
  taxPayer,
  paymentDate,
  codeRevenue,
  principalValue,
  fgtsIdentifier,
  socialConnectivityCode,
  socialConnectivityDigit,
  description,
  barCode,
}) => {
  const styles = useStyles()
  return (
    <React.Fragment>
      <TransactionDetail
        className={styles.summaryContent}
        data-test-id="details-fgts-description"
      >
        <TransactionDetailName>CPF/CNPJ do contribuinte</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{maskTaxPayer(taxPayer!)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Data de pagamento</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{DateFormatter.format(paymentDate)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Código da receita</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{codeRevenue}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Valor principal</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{CurrencyFormatter.format(principalValue)}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Identificador do FGTS</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{fgtsIdentifier}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Código de Conexão Social</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{socialConnectivityCode}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Dígito</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{socialConnectivityDigit}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Descrição</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{description}</strong>
        </TransactionDetailValue>
        <TransactionDetailName>Código de barras</TransactionDetailName>
        <TransactionDetailValue>
          <strong>{MaskBarCodeFgts(barCode)}</strong>
        </TransactionDetailValue>
      </TransactionDetail>
    </React.Fragment>
  )
}
