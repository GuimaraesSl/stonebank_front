import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export const useStyles = makeStyles({
  input: {
    marginTop: theme.spacing(),
  },
  description: {
    color: colors.system.light.neutral,
    fontWeight: 300,
    fontSize: 12,
    lineHeight: '15.6px',
  },
})
