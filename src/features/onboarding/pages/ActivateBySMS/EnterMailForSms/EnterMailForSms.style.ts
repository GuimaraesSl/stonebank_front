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
    color: colors.error.shade0,
    fontSize: '14',
    fontFamily: 'Roboto',
  },
  mailInput: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
    '& .MuiInput-underline:before, & .MuiInput-underline:hover:before, & .MuiInput-underline:after':
      {
        borderBottom: 'none',
      },
  },
})
