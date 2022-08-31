import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import React from 'react'
import { useStyles } from './PasswordCard.style'
import { AppBar } from 'components/AppBar'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PasswordInput } from 'features/card/components/Inputs/PasswordInput'
import { useHistory } from 'react-router-dom'
import { CardRoutes } from 'features/card/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { Card } from 'features/card/redux/models/card'
import { updateCard } from 'features/card/redux/actions'

export const PasswordCard: React.FC = () => {
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const [pin, setPasswordInput] = React.useState('')
  const [displayCards, setDisplayCards] = React.useState(card)
  const [disableNextButton, setDisableNextButton] = React.useState(false)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(updateCard({ ...card!, pin: pin }))
    history.push(CardRoutes.confirmPasswordCard)
  }

  const lastCardDigits = (lastDigits: number) => {
    if (lastDigits === null) return `Cartão final`
    else return `Cartão final ${displayCards?.panLastDigits}`
  }

  React.useEffect(() => {
    setDisableNextButton(pin.length !== 4)
  }, [pin.length])

  const onCancelButton = () => {
    history.push(AccountRoutes.home)
    dispatch(updateCard())
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
                onClick={onCancelButton}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <Box className={styles.header}>
            <ProcessDescriptionHeader
              title={'Criar senha do Cartão'}
              subtitle={lastCardDigits(displayCards!.panLastDigits)}
              description={'Agora escolha uma senha numérica de 4 dígitos'}
            />
          </Box>
        }
        main={
          <Box onSubmit={onSubmit} className={styles.main}>
            <PasswordInput
              label={'Nova senha do cartão'}
              value={pin}
              onChange={setPasswordInput}
              data-test-id="password-button"
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                onClick={onSubmit}
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={disableNextButton}
                data-test-id="next-button"
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
