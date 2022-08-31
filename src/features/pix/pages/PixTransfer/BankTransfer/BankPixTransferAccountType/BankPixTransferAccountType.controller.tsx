import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { BankPixTransferAccountTypeView } from './BankPixTransferAccountType.view'
import { useDispatch, useSelector } from 'react-redux'
import { updatePixTransfer, updateState } from 'features/pix/redux/actions'
import { AccountType } from 'features/pix/redux/models/accountType'
import { StoreState } from 'redux/state'

export const BankPixTransferAccountType: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { pixTransfer } = useSelector((state: StoreState) => state.pix)

  const onCheckingAccountClick = () => {
    dispatch(
      updatePixTransfer({ ...pixTransfer, accountType: AccountType.normal }),
    )
    history.push(PixRoutes.bankDataPixTransferBranch)
  }

  const onSavingsAccountClick = () => {
    dispatch(
      updatePixTransfer({ ...pixTransfer, accountType: AccountType.savings }),
    )
    history.push(PixRoutes.bankDataPixTransferBranch)
  }

  const onCancelButtonClick = () => {
    dispatch(updateState())
    history.push(PixRoutes.pixArea)
  }

  return (
    <BankPixTransferAccountTypeView
      payeeName={pixTransfer?.toName}
      onCheckingAccountClick={onCheckingAccountClick}
      onSavingsAccountClick={onSavingsAccountClick}
      onCancelButtonClick={onCancelButtonClick}
    />
  )
}
