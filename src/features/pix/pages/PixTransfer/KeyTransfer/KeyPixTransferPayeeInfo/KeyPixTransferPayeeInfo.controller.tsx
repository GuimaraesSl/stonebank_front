/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { KeyPixTransferPayeeInfoView } from './KeyPixTransferPayeeInfo.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { maskTaxId } from '_utils/masks/taxId'
import { updatePixTransfer, updateState } from 'features/pix/redux/actions'

export const KeyPixTransferPayeeInfo: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { pixKeyInfo, loading, errorMessage } = useSelector(
    (state: StoreState) => state.pix,
  )

  const onConfirmButtonClick = () => {
    dispatch(
      updatePixTransfer({
        toName: pixKeyInfo?.payeeName,
        toTaxId: pixKeyInfo?.payeeTaxNumber,
        toBank: pixKeyInfo?.payeeBank,
        toBankBranch: pixKeyInfo?.payeeBankBranch,
        toBankAccount: pixKeyInfo?.payeeBankAccount,
        toBankAccountDigit: pixKeyInfo?.payeeBankAccountDigit,
        pixKeyValue: pixKeyInfo?.pixKeyValue,
        pixKeyType: pixKeyInfo?.pixKeyType,
        accountType: pixKeyInfo?.payeeAccountType,
        searchProtocol: pixKeyInfo?.searchProtocol,
      }),
    )
    history.push(PixRoutes.keyPixTransferValue)
  }

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updateState())
    history.push(PixRoutes.pixArea)
  }, [])

  return (
    <KeyPixTransferPayeeInfoView
      onConfirmButtonClick={onConfirmButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      payeeName={pixKeyInfo?.payeeName ?? '---'}
      payeePixKeyValueText={
        !pixKeyInfo?.payeeTaxNumber
          ? '---'
          : `CPF: ${maskTaxId(pixKeyInfo?.payeeTaxNumber)}`
      }
      loading={loading}
      errorMessage={errorMessage}
    />
  )
}
