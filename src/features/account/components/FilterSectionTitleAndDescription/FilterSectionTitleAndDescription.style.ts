import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  wrapper: {
    marginBottom: 8,
  },
  title: {
    fontSize: '12px',
    color: colors.system.light.neutral,
  },
  description: {
    fontSize: '11px',
    lineHeight: '14px',
    color: colors.system.light.neutral,
  },
})
