import { Box } from '@material-ui/core'
import React from 'react'
import { useStyles } from './OptInput.style'
import { SingleOTPInputComponent } from './SingleOtp'

interface OtpInputProps {
  numInputs: number
  value?: string
  onChange?: Function
  isInputSecure?: boolean
  isInputNum?: boolean
  disabled?: boolean
  className?: string
}

export const OtpInput: React.FC<OtpInputProps> = ({
  numInputs,
  isInputNum,
  disabled,
  isInputSecure,
  onChange,
  className,
}) => {
  const [otpValues, setOTPValues] = React.useState(
    Array<string>(numInputs).fill(''),
  )

  const [activeInput, setActiveInput] = React.useState(0)
  const styles = useStyles()

  const handleOtpChange = (otp: string[]) => {
    const otpValue = otp.join('')
    onChange!(otpValue)
  }

  const getRightValue = (changedValue: string) => {
    if (!isInputNum || !changedValue) {
      return changedValue
    }
    return Number(changedValue) >= 0 ? changedValue : ''
  }

  const changeCodeAtFocus = (str: string) => {
    const updatedOTPValues = [...otpValues]
    updatedOTPValues[activeInput] = str[0] || ''
    setOTPValues(updatedOTPValues)
    handleOtpChange(updatedOTPValues)
  }

  const focusInput = (inputIndex: number) => {
    const selectedIndex = Math.max(Math.min(numInputs - 1, inputIndex), 0)
    setActiveInput(selectedIndex)
  }

  const focusPrevInput = () => {
    focusInput(activeInput - 1)
  }

  const focusNextInput = () => {
    focusInput(activeInput + 1)
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = getRightValue(event.currentTarget.value)
    !value ? event.preventDefault() : changeCodeAtFocus(value)

    focusNextInput()
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = event.key

    switch (pressedKey) {
      case 'Backspace':
      case 'Delete': {
        event.preventDefault()
        otpValues[activeInput] ? changeCodeAtFocus('') : focusPrevInput()
        break
      }
      default: {
        if (pressedKey.match(/^[^0-9]$/)) {
          event.preventDefault()
        }
        break
      }
    }
  }

  const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {}

  return (
    <Box className={styles.otpInput}>
      {Array(numInputs)
        .fill('')
        .map((_, index) => (
          <SingleOTPInputComponent
            type={isInputSecure ? 'password' : 'text'}
            value={otpValues && otpValues[index]}
            autoFocus={true}
            focus={activeInput === index}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onPaste={handleOnPaste}
            className={className}
            disabled={disabled}
            key={index}
            inputMode="numeric"
          ></SingleOTPInputComponent>
        ))}
    </Box>
  )
}
