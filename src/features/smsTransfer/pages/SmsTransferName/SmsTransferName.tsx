import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { TextField } from 'components/TextField'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateSmsTransferData } from 'features/smsTransfer/redux/actions'
import { Box } from '@material-ui/core'
import { useMask } from 'hooks/useMask'
import { lettersOnly } from '_utils/masks/generics'
import { StoreState } from 'redux/state'

export const SmsTransferName: React.FC = () => {
  const [toName, setToName] = useMask(lettersOnly)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (toName.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [toName.length])

  const onToNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToName(event.target.value)
  }

  const onCancelButtonClick = () => {
    dispatch(updateSmsTransferData())
    history.go(-3)
  }

  const smsTransfer = useSelector(
    (store: StoreState) => store.smsTransfer.smsTransfer,
  )
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (disableNextButton) return

    dispatch(updateSmsTransferData({ ...smsTransfer, toName }))
    history.push(SmsTransferRoutes.smsTransferValue)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência pelo celular"
            subtitle="Qual o nome de quem receberá sua transferência?"
            description="Esse nome lhe ajudará a identificar a operação em seu extrato. Não se preocupe, se não sabe do nome completo do seu beneficiário, ele poderá ajustar quando for resgartar o valor."
          />
        }
        main={
          <Box
            component="form"
            onSubmit={onSubmit}
            data-test-id="submit-button"
          >
            <TextField
              label="Nome completo"
              value={toName}
              onChange={onToNameChange}
              data-test-id="name"
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                disabled={disableNextButton}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                data-test-id="submit-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
