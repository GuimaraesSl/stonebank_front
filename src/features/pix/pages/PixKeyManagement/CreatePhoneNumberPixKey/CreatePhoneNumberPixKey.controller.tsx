import React from 'react'
import { useHistory } from 'react-router-dom'
import { CreatePhoneNumberPixKeyView } from './CreatePhoneNumberPixKey.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { PixRoutes } from 'features/pix/constants/routes'
import {
  closeAlert,
  createPixKeyAction,
  resendPixKeyTokenAction,
  updateState,
} from 'features/pix/redux/actions'
import { maskPhone } from '_utils/masks/phone'
import { useMask } from 'hooks/useMask'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'

export const CreatePhoneNumberPixKey: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phone, setPhone] = useMask(maskPhone)

  const [onShowAlert, setShowAlert] = React.useState(false)
  const { loading, errorMessage, createPixKey, resendPixKeyToken } =
    useSelector((store: StoreState) => store.pix)
  const { account } = useSelector((store: StoreState) => store.account)

  const { user } = useSelector((store: StoreState) => store.auth)

  React.useEffect(() => {
    if (createPixKey !== undefined) {
      dispatch(
        resendPixKeyTokenAction({
          pixKeyValue: phone,
          pixKeyType: PixKeyType.PhoneNumber,
        }),
      )
    }
  }, [createPixKey])

  React.useEffect(() => {
    if (resendPixKeyToken) {
      history.push(PixRoutes.confirmPhoneNumberPixKeyToken, {
        pixKeyValue: phone,
      })
    }
  }, [resendPixKeyToken])

  React.useEffect(() => {
    if (user?.phoneNumber) setPhone(user!.phoneNumber)
    else setPhone('')
  }, [])

  const onPhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value)

  const onCancelButtonClick = () => {
    history.replace(PixRoutes.pixArea)
  }

  const onBackButtonClick = () => {
    dispatch(updateState())
    history.goBack()
  }

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onRedirectAlert = () => history.replace(PixRoutes.pixKeyList)

  const onConfirmButtonClick = () => {
    dispatch(createPixKeyAction(PixKeyType.PhoneNumber, phone))
  }

  return (
    <CreatePhoneNumberPixKeyView
      onAlertClose={onAlertClose}
      loading={loading}
      errorMessage={errorMessage}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      inputValue={phone}
      account={account!}
      onPhoneNumberChange={onPhoneNumberChange}
      onConfirmButtonClick={onConfirmButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  )
}
