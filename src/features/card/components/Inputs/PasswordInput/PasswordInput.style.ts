import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  passwordBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  passwordContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
  },
  labelPassword: {
    marginLeft: '0px',
    color: colors.system.light.neutral,
    fontWeight: 500,
  },
  passwordMargin: {
    display: 'flex',
    justifyContent: 'center',
    filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));',
  },
  OtpInput: {
    margin: '0 5px',
    fontSize: '30px',
    height: '55px',
    width: '42px',
    border: `0.8px solid ${colors.neutral.shade30}`,
    color: colors.system.light.neutral,
  },
  inputValid: {
    border: '2px solid green',
    boxShadow: '0 0 5px green',
  },
  inputInvalid: {
    border: '2px solid red',
    marginRight: 4,
    marginLeft: 4,
    fontSize: 40,
    boxSizing: 'border-box',
    borderRadius: 3,
    width: '41.95px',
    height: 51,
    boxShadow: '0 0 5px red',
  },
})
