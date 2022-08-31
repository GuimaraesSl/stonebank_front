import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { useStyles } from 'components/DateInput/DateInput.style'

interface DateInputProps {
  value?: string | MaterialUiPickersDate
  maxValue?: string | MaterialUiPickersDate
  minValue?: string | MaterialUiPickersDate
  onChange: (date: MaterialUiPickersDate) => void
  label?: string
}
export const DateInput: React.FC<DateInputProps> = ({
  value,
  maxValue,
  minValue,
  onChange,
  label,
}) => {
  const styles = useStyles({ showDate: false })

  return (
    <KeyboardDatePicker
      data-test-id="date-input"
      className={styles.wrapper}
      label={label}
      helperText={''}
      format="dd/MM/yyyy"
      value={value}
      maxDate={maxValue}
      minDate={minValue}
      onChange={onChange}
      onKeyDown={e => e.preventDefault()}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  )
}
