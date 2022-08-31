import React, { useState } from 'react'
import { OtpInput } from 'components/OtpInput/OtpInput'
import { Box } from '@material-ui/core'
import { useStyles } from './LastDigitsInput.style'

interface PasswordValidationInputProps {
  value: string
  setValue: (value: string) => void
}

export const LastDigitsInput: React.FC<PasswordValidationInputProps> = ({
  value,
  setValue,
}: PasswordValidationInputProps) => {
  const style = useStyles()
  return (
    <Box className={style.passwordInputBody} data-test-id="password-input">
      <Box className={style.passwordInputContent}>
        <OtpInput
          className={style.OtpInput}
          value={value}
          onChange={setValue}
          isInputSecure={true}
          numInputs={4}
          data-test-id="four-digits"
        />
      </Box>
    </Box>
  )
}
