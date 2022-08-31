import React from 'react'
import { TextField as MuiTextField } from '@material-ui/core'
import { useStyles } from './TextField.style'

interface TextFieldProps {
  type?: 'number' | 'email' | 'password' | 'date'
  variant?: 'outlined' | 'filled'
  multiline?: boolean
  error?: boolean
  rows?: string
  helperText?: string
  placeholder?: string
  label: string
  value: string
  select?: boolean
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  minValue?: number | Date
  maxValue?: number
  disabled?: boolean
  required?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField: React.FC<TextFieldProps> = ({
  type,
  variant,
  multiline,
  error,
  rows,
  helperText,
  placeholder,
  label,
  value,
  select,
  inputMode,
  startAdornment,
  endAdornment,
  minValue,
  maxValue,
  disabled,
  required,
  children,
  onChange,
  ...rest
}) => {
  const styles = useStyles({ variant: variant ?? 'outlined' })

  return (
    <MuiTextField
      data-test-id="text-field"
      multiline={multiline}
      rows={rows}
      type={type}
      error={error}
      color="primary"
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      value={value}
      select={select}
      helperText={helperText}
      inputMode={inputMode}
      className={error ? styles.textFieldError : styles.textField}
      InputProps={{
        startAdornment,
        endAdornment,
        disableUnderline: error,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: type === 'number' ? 0.1 : undefined,
        min: minValue,
        max: maxValue,
        inputMode,
      }}
      fullWidth
      required={required}
      onChange={onChange}
      {...rest}
    >
      {children}
    </MuiTextField>
  )
}
