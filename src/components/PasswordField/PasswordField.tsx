import React, { useState } from 'react'
import { TextField } from 'components/TextField'
import { IconButton, InputAdornment } from '@material-ui/core'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons'

interface PasswordFieldProps {
  value: string
  variant?: 'outlined' | 'filled'
  multiline?: boolean
  label?: string
  placeholder?: string
  rows?: string
  error?: boolean
  helperText?: string
  startAdornment?: React.ReactNode
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  multiline,
  label,
  placeholder,
  error,
  rows,
  helperText,
  value,
  variant,
  disabled,
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const clickShowPassword = () => setShowPassword(!showPassword)

  return (
    <TextField
      data-test-id="password-field"
      multiline={multiline}
      rows={rows}
      type={showPassword ? undefined : 'password'}
      error={error}
      placeholder={placeholder}
      disabled={disabled}
      label={label ?? 'Senha'}
      value={value}
      helperText={helperText}
      variant={variant}
      {...rest}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={clickShowPassword}
            edge="end"
            data-test-id="show-password-button"
          >
            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
          </IconButton>
        </InputAdornment>
      }
      onChange={onChange}
    />
  )
}
