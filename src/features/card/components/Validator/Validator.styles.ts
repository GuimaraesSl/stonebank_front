import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  labelPassword: {
    marginLeft: '0px',
    color: colors.system.light.neutral,
    fontWeight: 500,
  },
  passwordInput: {
    fontSize: 30,
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
    height: '55px',
    width: '42px',
  },
  textInvalid: {
    marginLeft: '10px',
    lineHeight: 2,
    color: colors.system.light.error,
    textAlign: 'center',
    width: '80%',
  },
  inputInvalid: {
    fontSize: 17,
    lineHeight: 2,
    color: colors.system.light.error,
    '& ': {
      display: 'flex',
      justifyContent: 'center',
      marginRight: 4,
      marginLeft: 4,
      fontSize: 40,
      border: '2px solid red',
      borderRadius: 3,
      width: '41.95px',
      height: 51,
    },
  },
  centerOtpInput: {
    display: 'flex',
    justifyContent: 'center',
    filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));',
  },
})
