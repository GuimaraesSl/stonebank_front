import React from 'react'
import { PixRoutes } from 'features/pix/constants/routes'
import {
  confirmPixKeyHoldAction,
  resendPixKeyTokenAction,
  updateState,
} from 'features/pix/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { ConfirmPhoneNumberPixKeyView } from './ConfirmPhoneNumberPixKey.view'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'

export const ConfirmPhoneNumberPixKey: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation()
  const [token, setToken] = React.useState('')
  const [message, setMessage] = React.useState('')
  const pixState = useSelector((store: StoreState) => store.pix)

  const { errorMessage, loading, pixKey, confirmPixKeyHold } = pixState

  const { pixKeyValue } = state as any

  const subtitle = `Confirmar telefone ${pixKeyValue}`

  React.useEffect(() => {
    if (confirmPixKeyHold) {
      dispatch(updateState())
      history.replace(PixRoutes.pixArea)
    }
  }, [confirmPixKeyHold])

  const onCancelButtonClick = () => {
    dispatch(updateState())
    history.replace(PixRoutes.pixArea)
  }

  const onBackButtonClick = () => {
    dispatch(updateState())
    history.goBack()
  }

  const onConfirmButtonClick = () => {
    dispatch(
      confirmPixKeyHoldAction(pixKeyValue, PixKeyType.PhoneNumber, token),
    )
  }

  const onTokenChange = (e: string) => setToken(e)

  const onCloseAlert = () => {
    dispatch(updateState())
  }

  const onResendTokenButtonClick = async () => {
    dispatch(
      resendPixKeyTokenAction({
        pixKeyValue: pixKey?.pixKeyValue,
        pixKeyType: PixKeyType.PhoneNumber,
      }),
    )
    setMessage('Token Reenviado')
  }

  return (
    <ConfirmPhoneNumberPixKeyView
      subtitle={subtitle}
      token={token}
      onTokenChange={onTokenChange}
      message={message}
      errorMessage={errorMessage}
      loading={loading}
      onCloseAlert={onCloseAlert}
      onResendTokenButtonClick={onResendTokenButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
    />
  )
}
