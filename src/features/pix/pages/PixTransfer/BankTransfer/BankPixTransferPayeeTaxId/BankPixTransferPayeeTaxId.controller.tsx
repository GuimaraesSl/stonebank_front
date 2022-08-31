import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { BankPixTransferPayeeTaxIdView } from './BankPixTransferPayeeTaxId.view'
import { useDispatch, useSelector } from 'react-redux'
import {
  findBankList,
  updatePixTransfer,
  updateState,
} from 'features/pix/redux/actions'
import { useMask } from 'hooks/useMask'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { StoreState } from 'redux/state'
import { maskTransference } from '_utils/masks/transferenceNumber'

export const BankPixTransferPayeeTaxId: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const pixState = useSelector((state: StoreState) => state.pix)
  const { bankList, pixTransfer, loading, errorMessage } = pixState

  const [toTaxId, setToTaxId] = useMask(maskTaxPayer)
  const [isValidValue, setIsValidValue] = React.useState(false)

  React.useEffect(() => {
    if (pixTransfer?.toTaxId && bankList)
      history.push(PixRoutes.bankPixTransferSelectBank)
  }, [pixTransfer?.toTaxId, bankList])

  React.useEffect(() => {
    setIsValidValue(toTaxId.length === 14 || toTaxId.length === 18)
  }, [toTaxId])

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setToTaxId(event.target.value)

  const onCancelButtonClick = () => {
    dispatch(updateState())
    history.push(PixRoutes.pixArea)
  }

  const onBackButtonClick = () => {
    dispatch(updatePixTransfer({ toName: undefined }))
    history.goBack()
  }

  const onConfirmButtonClick = () => {
    dispatch(
      updatePixTransfer({ ...pixTransfer, toTaxId: maskTransference(toTaxId) }),
    )
    dispatch(findBankList())
  }

  return (
    <BankPixTransferPayeeTaxIdView
      toTaxId={toTaxId}
      isValidValue={isValidValue}
      loading={loading}
      errorMessage={errorMessage}
      onConfirmButtonClick={onConfirmButtonClick}
      onBackButtonClick={onBackButtonClick}
      onTaxIdChange={onTaxIdChange}
      onCancelButtonClick={onCancelButtonClick}
    />
  )
}
