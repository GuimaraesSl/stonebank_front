import React from 'react'
import { StoreState } from 'redux/state'
import { useHistory } from 'react-router-dom'
import { ReturnPixDescriptionView } from './ReturnPixDescription.view'

import { PixRoutes } from '../../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { SuccessPixState } from 'features/pix/redux/state'

export const ReturnPixDescription: React.FC = () => {
  const [description, setDescription] = React.useState('')
  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const pixState = useSelector((state: StoreState) => state.pix)

  const loading = useSelector((state: StoreState) => state.pix.loading)

  const dispatch = useDispatch()
  const history = useHistory()

  const onNextButtonClick = React.useCallback(() => {
    // history.push(PixRoutes.keyTransferMessage)
  }, [])

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value)

  const onEditTagsButtonClick = () => {
    setOpenTagEditPopUp(true)
  }

  const onEditTagsClose = () => {
    setOpenTagEditPopUp(false)
  }

  const onCancelButtonClick = () => {
    // dispatch(updatePixData())
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      // dispatch(generateRefundPixIn())
    }
    setOpenAuthorizationSheet(false)
  }

  const onConcludeButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState) {
      // history.push(PixRoutes.returnSummary)
    }
  }, [pixState, history])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setOpenAuthorizationSheet(true)
    // dispatch(
    //   updatePixData({
    //     customerMessage: description,
    //     tags: pixTags,
    //   }),
    // )
  }

  return (
    <ReturnPixDescriptionView
      onNextButtonClick={onNextButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDescriptionChange={onDescriptionChange}
      onEditTagsButtonClick={onEditTagsButtonClick}
      onEditTagsClose={onEditTagsClose}
      onSubmit={onSubmit}
      description={description}
      openTagEditPopUp={openTagEditPopUp}
      loading={loading}
      pixState={pixState}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
    />
  )
}
