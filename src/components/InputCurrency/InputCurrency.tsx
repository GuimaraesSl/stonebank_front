import React from 'react'
import { TextField } from 'components/TextField'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './InputCurrency.style'

interface InputCurrencyProps {
  label: string
  placeholder?: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  hasDisabled?: boolean
}

export const InputCurrency = ({
  label,
  placeholder,
  onChange,
  value,
  hasDisabled,
}: InputCurrencyProps) => {
  const styles = useStyles()

  return (
    <Box>
      <Typography className={styles.labelId}> {label}</Typography>
      <TextField
        data-test-id="input-currency"
        label={''}
        placeholder={placeholder}
        disabled={hasDisabled}
        value={value}
        onChange={onChange}
        variant="outlined"
      />
    </Box>
  )
}
