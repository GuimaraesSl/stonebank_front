import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  receiver: {
    fontWeight: 700,
    fontSize: '12px',
    color: colors.system.light.neutral,
  },
  value: {
    fontWeight: 700,
    fontSize: '14px',
    color: colors.system.light.neutral,
  },
  checkOut: {
    marginTop: '16px',
  },
})
