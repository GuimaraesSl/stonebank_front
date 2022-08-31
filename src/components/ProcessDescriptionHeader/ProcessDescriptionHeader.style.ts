import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  title: {
    fontWeight: 700,
    marginBottom: 24,
    lineHeight: '23px',
  },
  subtitle: {
    marginBottom: 4,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '16px',
  },
  description: {
    color: colors.system.light.neutral,
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '130%',
  },
})
