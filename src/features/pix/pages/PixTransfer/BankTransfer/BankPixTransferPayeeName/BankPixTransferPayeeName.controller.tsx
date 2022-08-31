/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { BankPixTransferPayeeNameView } from './BankPixTransferPayeeName.view'
import { useDispatch } from 'react-redux'
import { updatePixTransfer, updateState } from 'features/pix/redux/actions'
import { lettersOnly } from '_utils/masks/generics'
import { useMask } from 'hooks/useMask'

export const BankPixTransferPayeeName: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [toName, setToName] = useMask(lettersOnly)
  const [isValidValue, setIsValidValue] = React.useState(false)

  React.useEffect(() => {
    setIsValidValue(toName.length === 0)
  }, [toName])

  const onToNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setToName(event.target.value)

  const onCancelButtonClick = () => {
    dispatch(updateState())
    history.push(PixRoutes.pixArea)
  }

  const onConfirmButtonClick = () => {
    dispatch(
      updatePixTransfer({
        toName: toName,
      }),
    )
    history.push(PixRoutes.bankPixTransferPayeeTaxId)
  }

  return (
    <BankPixTransferPayeeNameView
      toName={toName}
      isValidValue={isValidValue}
      onConfirmButtonClick={onConfirmButtonClick}
      onToNameChange={onToNameChange}
      onCancelButtonClick={onCancelButtonClick}
    />
  )
}
