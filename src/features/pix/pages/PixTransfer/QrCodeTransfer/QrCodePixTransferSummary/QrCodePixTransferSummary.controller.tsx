import { PixRoutes } from 'features/pix/constants/routes'
import {
  createPixTransferAction,
  updatePixTransfer,
  updateState,
} from 'features/pix/redux/actions'
import { AccountType } from 'features/pix/redux/models/accountType'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { QrCodePixTransferSummaryView } from './QrCodePixTransferSummary.view'

export const QrCodePixTransferSummary: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [pixDate, setPixDate] = React.useState<Date>(new Date())
  const [value, setValue] = React.useState(Number)
  const [validatedToken, setValidatedToken] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const pixState = useSelector((store: StoreState) => store.pix)

  const {
    pixQrCodeInfo,
    pixTransfer,
    createPixTransfer,
    loading,
    errorMessage,
  } = pixState

  React.useEffect(() => {
    if (validatedToken && createPixTransfer)
      history.replace(PixRoutes.pixTransferProcess)
  }, [createPixTransfer])

  React.useEffect(() => {
    setPixDate(pixQrCodeInfo?.paymentDate ?? new Date())
    setValue(parseFloat(pixQrCodeInfo?.originalValue!))
  }, [pixQrCodeInfo])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updateState())
    history.push(PixRoutes.pixTransferHome)
  }, [pixState])

  const onConfirmButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const convertAccountType = (accountType?: string) => {
    switch (accountType) {
      case '0':
        return AccountType.normal
      case '1':
        return AccountType.savings
    }
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      setValidatedToken(true)
      dispatch(createPixTransferAction())
    }
    setOpenAuthorizationSheet(false)
  }

  return (
    <QrCodePixTransferSummaryView
      pixTransfer={pixTransfer}
      openAuthorizationSheet={openAuthorizationSheet}
      errorMessage={errorMessage}
      loading={loading}
      onCancelButtonClick={onCancelButtonClick}
      onAuthorizationClose={onAuthorizationClose}
      onConfirmButtonClick={onConfirmButtonClick}
    />
  )
}
