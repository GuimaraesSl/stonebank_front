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
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { useMask } from 'hooks/useMask'
import { lettersOnly } from '_utils/masks/generics'
import { updateCard } from 'features/card/redux/actions'
import { StoreState } from 'redux/state'
import { CardRoutes } from 'features/card/constants/routes'

export const AssociateMotherNameCard: React.FC = () => {
  const [motherName, setMotherName] = useMask(lettersOnly)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const card = useSelector((store: StoreState) => store.card.card)

  React.useEffect(() => {
    if (motherName.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [motherName.length])

  const onToNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMotherName(event.target.value)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      updateCard({
        ...card!,
        motherName: motherName,
      }),
    )
    if (disableNextButton) return
    history.push(CardRoutes.associateBirthDateCard)
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
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Associar novo cartão"
            subtitle="Quase lá! Precisamos confirmar alguns dados pessoais"
            description="Qual o nome da sua mãe?"
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Nome da mãe"
              placeholder="Digite aqui"
              value={motherName}
              onChange={onToNameChange}
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
