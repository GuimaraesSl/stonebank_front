import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { Box, Grid, Typography } from '@material-ui/core'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { CardRoutes } from 'features/card/constants/routes'
import { LastDigitsInput } from 'features/card/components/Inputs/LastDigitsInput'
import { FailCardState, SuccessCardState } from 'features/card/redux/state'
import { updateCard, validateCard } from 'features/card/redux/actions'
import { useStyles } from './AssociateFourDigits.style'
import { Alert } from 'components/Alert'

export const AssociateFourDigits: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const styles = useStyles()

  const [panLastDigits, setPanLastDigits] = React.useState('')
  const [click, setClick] = React.useState(false)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const card = useSelector((store: StoreState) => store.card.card)
  const [loading, errorMessage] = useSelector<
    StoreState,
    [boolean, string | undefined]
  >(state => [state.card.loading, state.card.errorMessage])
  const cardState = useSelector((store: StoreState) => store.card)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(
      updateCard({
        ...card!,
        panLastDigits: Number(panLastDigits),
      }),
    )
    dispatch(validateCard(panLastDigits))
    setClick(true)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateCard())
  }

  React.useEffect(() => {
    panLastDigits.length !== 4
      ? setDisableNextButton(true)
      : setDisableNextButton(false)
  }, [panLastDigits.length])

  React.useEffect(() => {
    if (click && cardState instanceof SuccessCardState) {
      history.push(CardRoutes.associateNationalityCard)
    } else if (cardState instanceof FailCardState) {
      history.push(CardRoutes.invalidDataForCard)
    }
  }, [cardState, history])

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
          <Box>
            <ProcessDescriptionHeader
              title="Associar novo cartão"
              subtitle="Quase lá! Precisamos confirmar os dados do cartão"
              description="Insira os 4 últimos dígitos do número do seu cartão"
            />
          </Box>
        }
        main={
          <React.Fragment>
            <Grid
              direction="column"
              alignItems="center"
              data-test-id="four-digits"
            >
              <Grid item component="form">
                <Typography className={styles.labelStyle}>
                  <label>4 últimos dígitos do cartão</label>
                </Typography>
                <LastDigitsInput
                  value={panLastDigits}
                  setValue={setPanLastDigits}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={disableNextButton}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
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
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
