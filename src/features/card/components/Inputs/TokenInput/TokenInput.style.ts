import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  tokenBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  tokenContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
    color: colors.system.light.neutral,
  },
  otpInput: {
    fontSize: '30px',
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
    height: '55px',
    width: '42px',
  },
})
