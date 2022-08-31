import React from 'react'
import { TransactionReceipt } from 'features/account/redux/models/transactionReceipt'
import { useMask } from 'hooks/useMask'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { useStyle } from './ReceiptDescription.style'
import { DateFormatter } from '_translate'
import { ConfigContext } from '_config'

interface ReceiptDescriptionProps {
  receipt?: TransactionReceipt
}

export const ReceiptDescription: React.FC<ReceiptDescriptionProps> = ({
  receipt,
}) => {
  const { company } = React.useContext(ConfigContext)
  const style = useStyle()
  const [maskedTaxId, setMaskedTaxId] = useMask(maskTaxPayer)

  React.useEffect(() => {
    if (receipt?.taxId) setMaskedTaxId(receipt.taxId)
  }, [receipt?.taxId, setMaskedTaxId])

  return (
    <div className={style.voucherContent} data-test-id="receipt-description">
      <div> Transferência no valor de </div>
      <strong> R$ {receipt?.value ?? '---'} </strong>
      <div> para a conta {company.name} de </div>
      <strong> {receipt?.toName ?? '---'} </strong>
      <div> com CPF </div>
      <strong> {receipt?.taxId ? maskedTaxId : '---'} </strong>
      <div> no dia </div>
      <strong>
        {receipt?.date ? DateFormatter.format(receipt.date) : '---'}
      </strong>
      <div> descrição da transferência </div>
      <strong> {receipt?.description ?? '---'} </strong>
    </div>
  )
}
