import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  spacingEmail: {
    marginTop: '55px',
    fontWeight: 500,
    fontSize: '11.5px',
    lineHeight: '130%',
    color: colors.system.light.neutral,
  },
  label: {
    fontWeight: 500,
    fontFamily: 'Roboto',
  },
  inputError: {
    color: colors.system.light.error,
    fontSize: '14',
    fontFamily: 'Roboto',
  },
})
