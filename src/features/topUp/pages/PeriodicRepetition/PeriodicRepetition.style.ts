import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  main: {
    margin: -16,
    marginTop: -24,
  },
  description: {
    color: colors.system.light.neutral,

    fontWeight: 500,
    fontSize: 13,
    lineHeight: '16.9px',
    marginTop: 5,
  },
  contentPage: {
    '& header': {
      backgroundColor: colors.system.light.surface,
    },
    '& footer': {
      backgroundColor: colors.system.light.surface,
    },
  },
})
