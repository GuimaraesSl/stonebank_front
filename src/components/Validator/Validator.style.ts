import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export const useStyles = makeStyles({
  description: {
    fontSize: 12,
    lineHeight: '15.6px',
    color: colors.system.light.neutral,
  },
  valid: {
    color: theme.palette.success.main,
  },
  invalid: {
    color: colors.system.light.error,
  },
})
