import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './Validator.styles'
import { OtpInput } from 'components/OtpInput/OtpInput'

interface ValidatorProps {
  description?: string
  strictValidation?: boolean
  value: string
  label: string
  setValue: (value: string) => void
}

export const Validator: React.FC<ValidatorProps> = ({
  description,
  strictValidation,
  value,
  label,
  setValue,
}) => {
  const styles = useStyles()

  const _getClassName = () => {
    let className = `${styles.passwordInput} `

    if (value.length < 4) {
      className += styles.passwordInput
      strictValidation = true
    }
    strictValidation
      ? (className += styles.passwordInput)
      : (className += styles.inputInvalid)
    return className
  }

  return (
    <Box>
      <Typography
        className={styles.labelPassword}
        color="primary"
        variant="caption"
        gutterBottom
        data-test-id="label-password"
      >
        <strong>{label} </strong>
      </Typography>
      <Grid container className={styles.centerOtpInput}>
        <Typography className={styles.textInvalid}>
          {
            <OtpInput
              className={_getClassName()}
              value={value}
              onChange={setValue}
              isInputSecure
              numInputs={4}
              isInputNum
              data-test-id="validator"
            />
          }
          {strictValidation
            ? (description = '')
            : (description = 'As senhas não conferem')}
        </Typography>
      </Grid>
    </Box>
  )
}
