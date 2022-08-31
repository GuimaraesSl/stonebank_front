import { PixRoutes } from 'features/pix/constants/routes'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import {
  closeAlert,
  findPixQrCodeInfo,
  updatePixTransfer,
} from 'features/pix/redux/actions'
import { QrCodePixTransferScannerView } from './QrCodePixTransferScanner.view'
import { AccountType } from 'features/pix/redux/models/accountType'

export const QrCodePixTransferScanner: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [sentRequest, setSentRequest] = React.useState(false)

  const { pixTransfer, pixQrCodeInfo, errorMessage, loading } = useSelector(
    (state: StoreState) => state.pix,
  )

  React.useEffect(() => {
    if (sentRequest && pixTransfer)
      pixTransfer?.value
        ? history.push(PixRoutes.qrCodePixTransferSummary)
        : history.push(PixRoutes.qrCodePixTransferValue)
  }, [pixTransfer])

  React.useEffect(() => {
    if (sentRequest && pixQrCodeInfo)
      dispatch(
        updatePixTransfer({
          toName: pixQrCodeInfo?.receiverName,
          toTaxId: pixQrCodeInfo?.receiverTaxNumber,
          toBank: pixQrCodeInfo?.receiverBank,
          toBankBranch: pixQrCodeInfo?.receiverBankBranch,
          toBankAccount: pixQrCodeInfo?.receiverBankAccount,
          toBankAccountDigit: pixQrCodeInfo?.receiverBankAccountDigit,
          value: parseFloat(pixQrCodeInfo?.originalValue!),
          paymentDate: pixQrCodeInfo?.paymentDate ?? new Date(),
          description: pixQrCodeInfo?.description,
          accountType: convertAccountType(pixQrCodeInfo?.receiverAccountType),
          searchProtocol: pixQrCodeInfo?.searchProtocol,
        }),
      )
  }, [pixQrCodeInfo])

  const convertAccountType = (accountType?: string) => {
    switch (accountType) {
      case '0':
        return AccountType.normal
      case '1':
        return AccountType.savings
    }
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onScanFail = (e: any) => {}

  const onScanComplete = (hash: string | null) => {
    if (hash) {
      dispatch(findPixQrCodeInfo(hash))
      setSentRequest(true)
    }
  }

  const onCancelButtonClick = () => {
    history.push(PixRoutes.pixArea)
  }

  const onBackButtonClick = () => {
    history.push(PixRoutes.pixArea)
  }

  return (
    <QrCodePixTransferScannerView
      loading={loading}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
      onScanFail={onScanFail}
      onScanComplete={onScanComplete}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  )
}
