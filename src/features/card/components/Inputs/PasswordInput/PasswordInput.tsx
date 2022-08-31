import { Typography, Box, Grid } from '@material-ui/core'
import { OtpInput } from 'components/OtpInput/OtpInput'
import { useStyles } from './PasswordInput.style'

interface PasswordProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export const PasswordInput: React.FC<PasswordProps> = ({
  label,
  value,
  onChange,
}) => {
  const style = useStyles()

  return (
    <Box className={style.passwordBody} data-test-id="pwd-input">
      <Box className={style.passwordContent}>
        <Typography
          className={style.labelPassword}
          color="primary"
          variant="caption"
          gutterBottom
        >
          <strong>{label} </strong>
        </Typography>
        <Grid item alignContent="center" className={style.passwordMargin}>
          <OtpInput
            value={value}
            isInputNum
            onChange={onChange}
            className={style.OtpInput}
            isInputSecure
            numInputs={4}
            data-test-id="password-input"
          />
        </Grid>
      </Box>
    </Box>
  )
}
