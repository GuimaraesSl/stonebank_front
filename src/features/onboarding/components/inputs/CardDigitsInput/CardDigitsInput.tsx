import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './CardDigitsInput.style'
import { Box } from '@material-ui/core'
import { OtpInput } from 'components/OtpInput'

interface DigitsCardPropsProps {
  value: string
  onChange: React.Dispatch<React.SetStateAction<any>>
}

export const DigitsCardProps = ({ value, onChange }: DigitsCardPropsProps) => {
  const style = useStyles()

  return (
    <Box>
      <Typography
        className={style.cardLabelPanLastDigits}
        color="primary"
        variant="caption"
        gutterBottom
      >
        4 últimos dígitos do cartão
      </Typography>
      <Box>
        <OtpInput
          data-test-id="last-digits-input"
          className={style.panLastDigitsInput}
          value={value}
          onChange={onChange}
          isInputSecure={true}
          numInputs={4}
          isInputNum
        />
      </Box>
    </Box>
  )
}
