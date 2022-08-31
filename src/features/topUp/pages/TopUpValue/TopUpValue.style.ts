import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  description: {
    color: colors.system.light.neutral,
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '16.9px',
    marginTop: 34,
  },
  listOptions: {
    margin: -16,
    marginTop: -24,
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
