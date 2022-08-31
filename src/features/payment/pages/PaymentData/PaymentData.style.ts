import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  customChange: {
    marginTop: '-20px',
    display: 'flex',
    justifyContent: 'center',
  },
  marginHeader: {
    marginTop: '20px',
    marginBottom: '-15px',
  },
  customTexts: {
    textAlign: 'center',
    color: colors.system.light.neutral,
    marginLeft: '4%',
    marginTop: '8%',
    marginRight: '4%',
    lineHeight: '9px',
  },
  customInput: {
    marginTop: '25px',
    marginBottom: '8px',
    '& input': {
      color: colors.neutral.shade40,
    },
  },
  dueDateStyle: {
    fontSize: '12px',
    fontWeight: 500,
  },
  infoText: {
    marginTop: '20px',
    fontSize: '10px',
    fontWeight: 400,
  },
  buttonDate: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',

    '& .MuiInputBase-root': {
      display: 'none',
    },
  },
})
