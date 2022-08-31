import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { CardRoutes } from 'features/card/constants/routes'
import { PasswordInput } from 'features/card/components/Inputs/PasswordInput'
import { useStyles } from './EnterCurrentPassword.style'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updateCard } from 'features/card/redux/actions'
import { Card } from 'features/card/redux/models/card'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { encryptPassword } from '_utils/cryptography'

export const EnterCurrentPassword: React.FC = () => {
  const [card, loading, errorMessage] = useSelector<
    StoreState,
    [Card | undefined, boolean, string | undefined]
  >(state => [state.card.card, state.card.loading, state.card.errorMessage])
  const history = useHistory()
  const style = useStyles()
  const dispatch = useDispatch()
  const [currentPin, setPasswordInput] = React.useState('')
  const [displayCards, setDisplayCards] = React.useState(card)
  const [disableNextButton, setDisableNextButton] = React.useState(false)

  const onCancelButtonClick = () => {
    history.go(-1)
  }

  React.useEffect(() => {
    setDisplayCards(card)
  }, [card])

  React.useEffect(() => {
    setDisableNextButton(currentPin.length !== 4)
  }, [currentPin.length])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(updateCard({ ...card!, currentPin: encryptPassword(currentPin) }))
    history.push(CardRoutes.enterNewPassword)
  }

  React.useEffect(() => {
    setPasswordInput(currentPin)
  }, [currentPin])

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
          <Box className={style.header}>
            <ProcessDescriptionHeader
              title="Alterar senha do Cartão"
              subtitle={`Cartão final ${displayCards?.panLastDigits}`}
              description="Para sua segurança, primeiro insira sua senha atual"
            />
          </Box>
        }
        main={
          <React.Fragment>
            <Grid container direction="column">
              <Grid item component="form">
                <Box component="form" onSubmit={onSubmit}>
                  <Box className={style.main}>
                    <PasswordInput
                      label="Senha atual"
                      onChange={setPasswordInput}
                      value={currentPin}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={disableNextButton}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
