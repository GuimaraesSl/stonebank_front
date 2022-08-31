/* eslint-disable no-control-regex */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { maskPhone } from '_utils/masks/phone'
import { KeyPixTransferView } from './KeyPixTransfer.view'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix/constants/routes'
import { StoreState } from 'redux/state'
import { useDispatch, useSelector } from 'react-redux'
import { KeyType } from 'features/pix/redux/models/keyType'
import { findPixKeyInfo, updateState } from 'features/pix/redux/actions'

export const KeyPixTransfer: React.FC = () => {
  const [pixKeyValue, setPixKeyValue] = React.useState('')
  const [selectedKeyType, setSelectedKeyType] = React.useState(KeyType.phone)
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((state: StoreState) => state.pix)
  const { pixKeyInfo, loading, errorMessage } = pixState

  const [sentRequest, setSentRequest] = React.useState(false)

  React.useEffect(() => {
    dispatch(updateState())
  }, [])

  React.useEffect(() => {
    if (pixKeyInfo && sentRequest)
      history.push(PixRoutes.keyPixTransferPayeeInfo)
  }, [pixKeyInfo])

  const keyIsValid = React.useMemo(() => {
    switch (selectedKeyType) {
      case KeyType.phone:
        return pixKeyValue.length === 16

      case KeyType.taxId:
        return pixKeyValue.length === 14 || pixKeyValue.length === 18

      case KeyType.email:
        const regex = new RegExp(
          /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        )
        return pixKeyValue.length > 0 && regex.test(pixKeyValue)

      case KeyType.random:
        return pixKeyValue.length >= 32
    }
  }, [selectedKeyType, pixKeyValue])

  const validateKey = React.useCallback(() => {
    return keyIsValid
  }, [selectedKeyType, pixKeyValue])

  const onKeyTypeChange = React.useCallback(
    (key: KeyType) => {
      setSelectedKeyType(key)
      setPixKeyValue('')
    },
    [selectedKeyType],
  )

  const onKeyValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      switch (selectedKeyType) {
        case KeyType.phone:
          return setPixKeyValue(maskPhone(value))

        case KeyType.taxId:
          return setPixKeyValue(maskTaxPayer(value))

        case KeyType.email:
          return setPixKeyValue(value)

        case KeyType.random:
          return setPixKeyValue(value.substring(0, 36))
      }
    },
    [selectedKeyType],
  )

  // const onSubmit = React.useCallback(
  //   (e: React.FormEvent) => {
  //     e.preventDefault()
  //     if (!validateKey) return

  //     dispatch(
  //       updatePixTransfer({
  //         pixKey: keyValue,
  //         pixKeyType: selectedKeyType,
  //       }),
  //     )
  //     dispatch(getPixKeyDetails(keyValue, selectedKeyType.value!))
  //     setValidKey(true)
  //     if (pixState instanceof SuccessPixState)
  //       history.push(PixRoutes.keyTransferPayeeInfo)
  //   },
  //   [validateKey],
  // )

  const onCancelButtonClick = () => {
    dispatch(updateState())
    history.replace(PixRoutes.pixArea)
  }

  const onConfirmButtonClick = () => {
    dispatch(findPixKeyInfo(pixKeyValue, selectedKeyType.value!))
    setSentRequest(true)
  }

  const onAlertClose = React.useCallback(() => {
    dispatch(updateState())
  }, [])

  return (
    <KeyPixTransferView
      selectedKeyType={selectedKeyType}
      onKeyTypeChange={onKeyTypeChange}
      pixKeyValue={pixKeyValue}
      loading={loading}
      onKeyValueChange={onKeyValueChange}
      keyIsValid={keyIsValid}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
      // onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      onConfirmButtonClick={onConfirmButtonClick}
    />
  )
}
