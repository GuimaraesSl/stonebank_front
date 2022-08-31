import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { useStyles } from './TokenInput.style'
import { OtpInput } from 'components/OtpInput/OtpInput'

interface TokenInputProps {
  value?: string
  onChange?: React.Dispatch<React.SetStateAction<any>>
}

export const TokenInput = ({ value, onChange }: TokenInputProps) => {
  const styles = useStyles()

  return (
    <Box className={styles.tokenBody}>
      <Box className={styles.tokenContent}>
        <Typography color="primary" variant="caption" gutterBottom>
          <strong>Token</strong>
        </Typography>
        <OtpInput
          className={styles.otpInput}
          value={value}
          onChange={onChange}
          isInputSecure
          isInputNum
          numInputs={6}
        />
      </Box>
    </Box>
  )
}
