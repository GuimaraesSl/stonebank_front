import React from 'react'
import { TextField as MuiTextField, Typography } from '@material-ui/core'
import { useStyles } from './TransparentTextField.style'
import { CurrencyFormatter, parseCurrency } from '_translate'

interface TransparentTextFieldProps {
  label?: string
  value: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TransparentTextField: React.FC<TransparentTextFieldProps> = ({
  label,
  value,
  disabled,
  onChange,
}) => {
  const styles = useStyles({ value })

  return (
    <React.Fragment>
      <Typography className={styles.label}>{label}</Typography>
      <MuiTextField
        disabled={disabled}
        value={
          isNaN(parseCurrency(value)) ? CurrencyFormatter.format(0) : value
        }
        inputMode="numeric"
        className={styles.TransparentTextField}
        InputLabelProps={{
          shrink: false,
        }}
        fullWidth
        onChange={onChange}
        data-test-id="transparent-text-field"
      ></MuiTextField>
    </React.Fragment>
  )
}
