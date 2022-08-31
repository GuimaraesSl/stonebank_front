import React from 'react'
import { OtpInput } from 'components/OtpInput/OtpInput'
import { useStyles } from './PasswordField.style'

interface PasswordFieldProps {
  value: string
  onChange: (value: string) => void
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
}) => {
  const styles = useStyles()

  return (
    <OtpInput
      className={styles.otp}
      isInputSecure
      numInputs={6}
      value={value}
      onChange={onChange}
      data-test-id="password-field"
    />
  )
}
