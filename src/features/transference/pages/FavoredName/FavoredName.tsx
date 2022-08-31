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
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { updateTransferenceData } from 'features/transference/redux/actions'
import { Box } from '@material-ui/core'
import { TransferType } from 'features/transference/redux/models/enum'
import { useMask } from 'hooks/useMask'
import { lettersOnly } from '_utils/masks/generics'

export const FavoredName: React.FC = () => {
  const [toName, setToName] = useMask(lettersOnly)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(
      updateTransferenceData({
        transferType: TransferType.MoneyTransfer,
      }),
    )
  }, [])

  React.useEffect(() => {
    if (toName.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [toName.length])

  const onToNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToName(event.target.value)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(-3)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (disableNextButton) return

    dispatch(updateTransferenceData({ toName }))
    history.push(TransferenceRoutes.selectBank)
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
            title="Transferência"
            subtitle="Qual o nome de quem receberá sua transferência"
            description="Não encontramos em seus contatos o CPF informado, precisamos de mais informações."
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit} data-test-id="form-submit">
            <TextField
              label="Nome completo"
              value={toName}
              onChange={onToNameChange}
              data-test-id="change-name"
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
