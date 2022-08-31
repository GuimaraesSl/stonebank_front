import React from 'react'
import { ConfigContext } from '_config'

interface ReceiptSummaryProps {
  value: string
  account: string
  cpf: string
  data: string
  description: string
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({
  value,
  account,
  cpf,
  data,
  description,
}) => {
  const { company } = React.useContext(ConfigContext)

  return (
    <div className="voucher-content" data-test-id="voucher-content">
      <div> Transferência no valor de </div>
      <strong> R$ {value} </strong>
      <div> para a conta {company.name} de </div>
      <strong> {account} </strong>
      <div> com CPF </div>
      <strong> {cpf} </strong>
      <div> no dia </div>
      <strong> {data} </strong>
      <div> descrição da transferência </div>
      <strong> {description} </strong>
    </div>
  )
}
