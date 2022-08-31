import { CurrencyFormatter, DateFormatter } from '_translate'
import React from 'react'
import { useStyles } from 'components/LabelWithValueKeyPix/LabelWithValueKeyPix.style'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'
import { maskTaxId } from '_utils/masks/taxId'

interface LabelWithValueKeyPixProps {
  pixTransfer?: PixTransfer
}

export const LabelWithValueKeyPix: React.FC<LabelWithValueKeyPixProps> = ({
  pixTransfer,
}: LabelWithValueKeyPixProps) => {
  const styles = useStyles()
  return (
    <div className={styles.summaryContent}>
      <div>PIX no valor de</div>
      <strong>{CurrencyFormatter.format(pixTransfer?.value!)}</strong>
      <div>Para a conta de</div>
      <strong>{pixTransfer?.toName}</strong>
      <div>
        {pixTransfer?.toTaxId?.toString().length === 11 ? (
          <>
            <div>CPF</div>
            <strong>{maskTaxId(pixTransfer?.toTaxId!)}</strong>
          </>
        ) : (
          <>
            <div>CNPJ</div>
            <div>
              <strong>{maskTaxId(pixTransfer?.toTaxId!)}</strong>
            </div>
          </>
        )}
      </div>
      {pixTransfer?.pixKeyValue && (
        <>
          <div>Chave PIX</div>
          <strong>
            {(pixTransfer?.pixKeyType === PixKeyType.CNPJ && 'CNPJ') ||
              (pixTransfer?.pixKeyType === PixKeyType.CPF && 'CPF') ||
              (pixTransfer?.pixKeyType === PixKeyType.Email && 'E-mail') ||
              (pixTransfer?.pixKeyType === PixKeyType.PhoneNumber &&
                'Telefone') ||
              (pixTransfer?.pixKeyType === PixKeyType.RandomKeyCode &&
                'Randômica')}
            : {pixTransfer?.pixKeyValue}
          </strong>
        </>
      )}
      <div>no dia</div>
      <strong>{DateFormatter.format(pixTransfer?.paymentDate)}</strong>
      {pixTransfer?.description && <div>descrição da transferência</div>}
      <strong>{pixTransfer?.description}</strong>
    </div>
  )
}
