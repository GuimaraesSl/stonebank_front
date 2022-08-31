import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  otp: {
    fontSize: '30px',
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
    height: '55px',
    width: '42px',
  },
})
