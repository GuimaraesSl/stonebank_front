import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  value: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.system.light.neutral,
  },
  box: {
    '& .MuiTypography-root': {
      textAlign: 'center',
      color: colors.system.light.neutral,
    },
  },
  valueSection: {
    marginTop: 24,
  },
  errorMessage: {
    display: 'flex',
    width: '100%',
    color: colors.source.error,
  },
})
