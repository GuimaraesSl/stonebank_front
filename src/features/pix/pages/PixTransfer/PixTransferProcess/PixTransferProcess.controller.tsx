import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixTransferProcessView } from './PixTransferProcess.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateState } from 'features/pix/redux/actions'
import { PixRoutes } from 'features/pix/constants/routes'

export const PixTransferProcess: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((store: StoreState) => store.pix)

  const { pixTransfer } = pixState

  const onHomeButtonClick = () => {
    dispatch(updateState())
    history.replace(PixRoutes.pixArea)
  }

  return (
    <PixTransferProcessView
      onHomeButtonClick={onHomeButtonClick}
      pixTransfer={pixTransfer!}
    />
  )
}
