import React from 'react'
import { Grid } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { useHistory } from 'react-router-dom'
import { TextField } from 'components/TextField'
import { SchedulingButton } from 'components/SchedulingButton'
import { ShortDateFormatter } from '_translate'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './ScheduleTransfer.style'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import {
  getExpectedTransferDate,
  updateTransferenceData,
} from 'features/transference/redux/actions'
import { StoreState } from 'redux/state'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { TransferType } from 'features/transference/redux/models/enum'
import { compareTransferDates } from 'features/transference/_utils'
import { ConfirmSchedulingDialog } from 'features/transference/components/ConfirmSchedulingDialog'

export const ScheduleTransfer: React.FC = () => {
  const [transferDate, setTransferDate] = React.useState<Date | null>(null)
  const [displayDate, setDisplayDate] = React.useState('')
  const [minDate, setMinDate] = React.useState(new Date())
  const [choseDate, setChoseDate] = React.useState(false)
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const { expectedTransferDate, transferType, toName, loading, errorMessage } =
    useSelector((state: StoreState) => ({
      expectedTransferDate:
        state.transference.transference?.expectedTransferDate,
      transferType: state.transference.transference?.transferType,
      toName: state.transference.transference?.toName,
      loading: state.transference.loading,
      errorMessage: state.transference.errorMessage,
    }))

  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  React.useEffect(() => {
    if (expectedTransferDate && !transferDate) {
      setMinDate(new Date())
      setTransferDate(expectedTransferDate)
    }
  }, [expectedTransferDate, transferDate])

  React.useEffect(() => {
    if (expectedTransferDate && transferDate !== expectedTransferDate)
      setTransferDate(expectedTransferDate)
  }, [expectedTransferDate])

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate())
  }, [transferDate])

  const _getDisplayDate = () => {
    const today = 'Hoje'

    if (!transferDate || compareTransferDates(transferDate, new Date()) === 0)
      return today
    else return ShortDateFormatter.format(transferDate)
  }

  const _transferDateIsValid = () => {
    return (
      transferDate &&
      expectedTransferDate &&
      compareTransferDates(transferDate, expectedTransferDate) === 0
    )
  }

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true)
  }

  const onDatePickerClose = () => {
    setOpenDatePicker(false)
  }

  const onDateChange = (date: Date | null) => {
    setTransferDate(date)
  }

  const onConfirmSchedulingDialogClose = (confirmedScheduling: boolean) => {
    if (confirmedScheduling) {
      dispatch(updateTransferenceData({ transferDate }))
      history.push(TransferenceRoutes.description)
      return
    }

    setChoseDate(false)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(transferType === TransferType.InternalTransfer ? -5 : -9)
  }

  const onNextButtonClick = async (event: React.FormEvent) => {
    event.preventDefault()
    setChoseDate(true)

    if (transferType === TransferType.MoneyTransfer)
      dispatch(getExpectedTransferDate(transferDate))

    dispatch(
      updateTransferenceData({ transferDate: transferDate ?? new Date() }),
    )

    history.push(TransferenceRoutes.description)
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
            subtitle="Quando deseja transferir?"
            description={`Escolhendo a data de hoje, ${toName} receberá o valor em breve.`}
          />
        }
        main={
          <Grid container direction="column">
            <Grid item>
              <TextField
                label="Quando?"
                value={displayDate}
                data-test-id="display-date"
              />
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                className={styles.scheduleButton}
              >
                <Grid item>
                  <SchedulingButton
                    open={openDatePicker}
                    value={transferDate}
                    minDate={minDate}
                    onClick={onSchedulingButtonClick}
                    onDateSelection={onDateChange}
                    onClose={onDatePickerClose}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
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
      {choseDate && !_transferDateIsValid() && !loading && (
        <ConfirmSchedulingDialog
          open={choseDate}
          onClose={onConfirmSchedulingDialogClose}
        />
      )}
    </PageContainer>
  )
}
