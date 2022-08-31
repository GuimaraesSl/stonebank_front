import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Typography, Box } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { DateInput } from 'components/DateInput'
import { Divider } from 'components/Divider'
import { FilterSectionTitleAndDescription } from 'features/account/components/FilterSectionTitleAndDescription'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon/ButtonWithFloatingIcon'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel } from 'constants/buttons/labels'
import { useStyles } from './SheduleTransactionsFilter.style'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransactions } from 'features/schedulePayments/redux/actions'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { Icon } from 'components/Icon'

const defaultStartDate = new Date()
defaultStartDate.setDate(defaultStartDate.getDate() + 30)

export const SheduleTransactionsFilter: React.FC = () => {
  const { futureTransaction, loading, errorMessage } = useSelector(
    (state: StoreState) => state.futureTransactions,
  )

  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()

  const [disableNextButton, setDisableNextButton] = React.useState(false)

  const [startDate, setStartDate] = React.useState<
    MaterialUiPickersDate | undefined
  >(futureTransaction?.initialDate! ?? new Date())

  const [endDate, setEndDate] = React.useState<
    MaterialUiPickersDate | undefined
  >(futureTransaction?.finalDate! ?? defaultStartDate)

  const onCancelButtonClick = () => {
    dispatch(updateTransactions())
    history.go(-1)
  }

  const onApplyButtonClick = () => {
    dispatch(
      updateTransactions({
        ...futureTransaction,
        initialDate: startDate as Date,
        finalDate: endDate as Date,
      }),
    )
    history.goBack()
  }

  const onResetDateChange = () => {
    const date = new Date()
    const endDate = new Date()
    endDate.setDate(date.getDate() + 30)

    setStartDate(date)
    setEndDate(endDate)
  }

  const onStartDateChange = (date: MaterialUiPickersDate) => {
    if (date === undefined) date = new Date()

    setStartDate(date)
  }

  const onEndDateChange = (date: MaterialUiPickersDate) => {
    if (date === undefined) date = new Date()

    setEndDate(date)
  }

  React.useEffect(() => {
    setDisableNextButton(startDate!.getTime() <= endDate!.getTime())
  }, [startDate, endDate])

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
            title="Filtrar Agendamentos"
            description="Selecione as características das transações que deseja visualizar."
          />
        }
        main={
          <React.Fragment>
            <FilterSectionTitleAndDescription
              title="Por Data"
              description="Escolha o período que deseja visualizar"
            />
            <Grid
              container
              spacing={1}
              wrap="nowrap"
              className={styles.datesSection}
              data-test-id="schedule-transctions-filter"
            >
              <Grid item>
                <Grid container wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Typography variant="body2">de&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                    <DateInput
                      value={startDate}
                      onChange={onStartDateChange}
                      data-test-id="start-date"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Typography variant="body2">até&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                    <DateInput
                      value={endDate}
                      onChange={onEndDateChange}
                      data-test-id="end-date"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              {!disableNextButton && (
                <Grid
                  container
                  justifyContent="center"
                  className={styles.errorMessage}
                  data-test-id="error-message"
                >
                  <Grid>
                    <Icon name={'alert'} className={styles.img} />
                  </Grid>
                  <Grid>As datas estão inválidas</Grid>
                </Grid>
              )}
            </Box>
            <Box className={styles.clearButton}>
              <ButtonWithFloatingIcon
                icon={<Icon name={'buttonBg'} />}
                onClick={() => {
                  onResetDateChange()
                }}
                size="small"
                data-test-id="clean"
              >
                Limpar
              </ButtonWithFloatingIcon>
            </Box>
            <Divider spacing={2} />
          </React.Fragment>
        }
        footer={
          <Box>
            <Divider spacing={2} />
            <Box className={styles.applyButton}>
              <ButtonWithFloatingIcon
                icon={<Icon name={'filter'} />}
                size="large"
                disabled={!disableNextButton}
                onClick={onApplyButtonClick}
                data-test-id="apply-button"
              >
                Aplicar Filtros
              </ButtonWithFloatingIcon>
            </Box>
          </Box>
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert message={errorMessage} title="Erro" severity="error" />
      )}
    </PageContainer>
  )
}
